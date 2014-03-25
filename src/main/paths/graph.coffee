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

  ({ data, nodeaccessor, linkaccessor, width, height, attraction, repulsion }) ->
    nodeaccessor ?= (n) -> n
    linkaccessor ?= (l) -> l
    attraction ?= 0.01
    repulsion ?= 1000
    { nodes, links } = data
    nodes_positions = {}
    for node in nodes
      id = nodeaccessor(node)
      nodes_positions[id] = random_position(width, height)
    i = -1

    bound = inside(width, height)
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
      attractions = attractive_forces(links_, nodes_positions, attraction)
      repulsions = bh.forces(tree, repulsion)
      for id, position of nodes_positions
        f1 = attractions[id] or [0, 0]
        f2 = repulsions[id] or [0, 0]
        f = O.plus(f1, f2)
        nodes_positions[id] = bound(O.plus(position, f))
      recompute()

    graph = { tick: tick }

    recompute = ->
      graph.curves = links.map (link) ->
        i += 1
        { start, end, weight } = linkaccessor(link)
        p = nodes_positions[start]
        q = nodes_positions[end]

        link: Polygon(points: [p, q], closed: false)
        item: link
        index: i

      graph.nodes = nodes.map (node) ->
        id = nodeaccessor(node)

        point: nodes_positions[id]
        item: node

    recompute()
    graph