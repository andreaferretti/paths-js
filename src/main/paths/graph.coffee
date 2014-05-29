define [
  './polygon'
  './ops'
  './barnes_hut'
], (Polygon, O, bh) ->
  random_position = (w, h) ->
    [ Math.random() * w, Math.random() * h ]

  cap = (bound, x) ->
    Math.min(Math.max(x, 0), bound)

  inside = (w, h) -> ([x, y]) ->
    [cap(w, x), cap(h, y)]

  map_objects = (obj, f) ->
    result = []
    for k, v of obj
      result.push f(k, v)
    result

  attractive_forces = (links, positions, attraction) ->
    forces = {}
    for id, { start, end, weight } of links
      pos1 = positions[start]
      pos2 = positions[end]
      force = O.times(attraction  * weight, O.minus(pos1, pos2))
      forces[start] ?= [0, 0]
      forces[end] ?= [0, 0]
      forces[start] = O.minus(forces[start], force)
      forces[end] = O.plus(forces[end], force)
    forces

  ({ data, nodeaccessor, linkaccessor, width, height, attraction, repulsion, threshold }) ->
    nodeaccessor ?= (n) -> n
    linkaccessor ?= (l) -> l
    attraction ?= 1
    repulsion ?= 1
    threshold ?= 0.5
    bound = inside(width, height)

    { nodes, links, constraints } = data
    constraints ?= {}
    nodes_positions = {}
    nodes_ = {}
    for node in nodes
      id = nodeaccessor(node)
      nodes_positions[id] = constraints[id] or random_position(width, height)
      nodes_[id] = node

    links_ = {}
    for link in links
      { start, end, weight } = linkaccessor(link)
      links_["#{ start }|#{ end }"] =
        weight: weight
        start: start
        end: end
        link: link

    tick = ->
      bodies = bh.bodies(nodes_positions)
      root = bh.root(width, height)
      tree = bh.tree(bodies, root)
      attractions = attractive_forces(links_, nodes_positions, attraction / 1000)
      repulsions = bh.forces(tree, repulsion * 1000, threshold)
      for id, position of nodes_positions
        if constraints[id]
          nodes_positions[id] = constraints[id]
        else
          f1 = attractions[id] or [0, 0]
          f2 = repulsions[id] or [0, 0]
          f = O.plus(f1, f2)
          nodes_positions[id] = bound(O.plus(position, f))
      recompute()

    constrain = (id, position) ->
      constraints[id] = position

    unconstrain = (id) ->
      delete constraints[id]

    graph =
      tick: tick
      constrain: constrain
      unconstrain: unconstrain

    recompute = ->
      i = -1
      graph.curves = map_objects links_, (id, { start, end, link }) ->
        i += 1
        p = nodes_positions[start]
        q = nodes_positions[end]

        link: Polygon(points: [p, q], closed: false)
        item: link
        index: i

      graph.nodes = map_objects nodes_, (id, node) ->
        point: nodes_positions[id]
        item: node

      graph

    recompute()