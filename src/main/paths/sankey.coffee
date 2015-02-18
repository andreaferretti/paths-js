define [
  './rectangle'
  './curved-rectangle'
  './ops'
], (Rectangle, CurvedRectangle, O)->
  ({data, nodeaccessor, linkaccessor, width, height, gutter, rect_width, compute}) ->
    nodeaccessor ?= (x) -> x
    linkaccessor ?= (x) -> x
    gutter ?= 10
    rect_width ?= 10

    links_ = data.links.map(linkaccessor)
    nodes_ = data.nodes.map((level) ->
      level.map(nodeaccessor)
    )

    #compute the spacing between groups of rectangles; takes care of rects width
    spacing_groups = (width - rect_width)/(data.nodes.length - 1)

    name_values = {}

    #initialize the informations about nodes
    nodes_.reduce((a,b) -> a.concat b).forEach((name) ->
      name_values[name] = {
        value: 0
        currently_used_in: 0
        currently_used_out: 0
      }
    )

    for name of name_values
      vals_in = links_.filter((x) -> x.end == name).map((x) -> x["weight"]).reduce(((x,y) -> x + y), 0)
      vals_out = links_.filter((x) -> x.start == name).map((x) -> x["weight"]).reduce(((x,y) -> x + y), 0)
      name_values[name]["value"] = Math.max(vals_in,vals_out)

    #find a suitable scale: it should take care of the maximum height of stacked rectangles and gutters between them
    #I did as follows: take the initial height and, for each group of rectangles
    # compute how much space you have available, that is height - gutters; there are
    # length_of_group - 1 gutters. Consider the ratios space_for_each_group/height_of_stacked_rectangles
    # and take the minimum. Use this as scale factor.

    #compute height of staked rectangles in a group
    height_of_groups = nodes_.map((group) ->
      group.map((name) ->
        name_values[name]["value"]).reduce((x,y) -> x + y)
    )

    #compute the available height for each group (height - gutters)
    space_for_each_group = nodes_.map((group) ->
      height - (group.length - 1)*gutter
    )

    #compute minimum ratio
    scale = height_of_groups.map((height_of_group, idx) ->
      space_for_each_group[idx]/height_of_group
    ).reduce((x,y) -> Math.min(x,y))

    for name, val of name_values
      name_values[name]["scaled_value"] = scale*val["value"]

    #fill rectangles information: each rectangle is stack on the previous one, with a gutter
    # the group of rectangles is centered in their own column
    rects = []
    node_idx = -1

    nodes_.forEach((group, idg) ->
      h_group = group.reduce(((x,y) -> x + name_values[y]["scaled_value"]), 0) + (group.length - 1)*gutter
      vertical_spacing = (height - h_group)/2
      first_top = vertical_spacing
      #fake previous bottom
      previous_bottom = first_top - gutter
      group.forEach((name, idn) ->
        top = previous_bottom + gutter
        bottom = top + name_values[name]["scaled_value"]
        previous_bottom = bottom
        att = name_values[name]["rectangle_coords"] = {
          top: top
          bottom: bottom
          left: rect_width/2 + idg*spacing_groups - rect_width/2
          right: rect_width/2 + idg*spacing_groups + rect_width/2
        }
        node_idx += 1
        rects.push O.enhance compute,
          curve: Rectangle(att)
          item: data.nodes[idg][idn]
          index: node_idx
          group: idg
      )
    )

    curved_rects = links_.map((link, i) ->
      source = link["start"]
      target = link["end"]
      rect_source = name_values[source]["rectangle_coords"]
      rect_target = name_values[target]["rectangle_coords"]
      scaled_weight = link["weight"]*scale
      a = rect_source["top"] + name_values[source]["currently_used_out"]
      b = rect_target["top"] + name_values[target]["currently_used_in"]
      curved_rect = {
        topleft: [rect_source["right"],a]
        topright: [rect_target["left"],b]
        bottomleft: [rect_source["right"],a+scaled_weight]
        bottomright: [rect_target["left"],b+scaled_weight]
      }
      name_values[source]["currently_used_out"] = name_values[source]["currently_used_out"] + scaled_weight
      name_values[target]["currently_used_in"] = name_values[target]["currently_used_in"] + scaled_weight

      O.enhance compute,
        curve: CurvedRectangle(curved_rect)
        item: data.links[i]
        index: i
    )

    curvedRectangles: curved_rects
    rectangles: rects