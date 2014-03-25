define [
  './ops'
], (O) ->
  average = (body1, body2) ->
    mass = body1.mass + body2.mass
    point = O.times(1 / mass, O.plus(
      O.times(body1.mass, body1.point),
      O.times(body2.mass, body2.point)
    ))
    [point, mass]

  locate = ([x, y], quadrants) ->
    for q in quadrants
      { top, bottom, left, right } = q.box
      if (left <= x <= right) and (bottom <= y <= top)
        return q

  make_quadrant = ({ top, bottom, left, right }, [a, b]) ->
    halfway_v = (left + right) / 2
    halfway_h = (top + bottom) / 2

    box:
      top: if b then halfway_h else top
      bottom: if b then bottom else halfway_h
      left: if a then halfway_v else left
      right: if a then right else halfway_v

  subdivide = ({ box }) -> [
    make_quadrant(box, [0, 0])
    make_quadrant(box, [1, 0])
    make_quadrant(box, [0, 1])
    make_quadrant(box, [1, 1])
  ]

  add_body = (root, body) ->
    if root.body
      old_body = root.body
      delete root.body
      root.children = subdivide(root)
      add_body(root, old_body)
      add_body(root, body)
    else
      if root.children
        child = locate(body.point, root.children)
        [root.point, root.mass] =
          if root.point then average(root, body) else [body.point, body.mass]
        add_body(child, body)
      else
        root.body = body

  make_tree = (bodies, root) ->
    if bodies.length == 0 then root
    else
      body = bodies.shift()
      add_body(root, body)
      make_tree(bodies, root)

  make_bodies = (positions) ->
    bodies = []
    for id, position of positions
      bodies.push(id: id, point: position, mass: 1)
    bodies

  make_root = (width, height) ->
    box:
      top: height
      bottom: 0
      left: 0
      right: width

  walk_leaves = (tree, f) ->
    if tree.body then f(tree)
    else if tree.children
      for child in tree.children
        walk_leaves child, f

  length = ([a, b]) ->
    Math.sqrt(a * a + b * b)

  body_force_on = (b1, b2, repulsion) ->
    segment = O.minus(b1.point, b2.point)
    d = length(segment)
    O.times(repulsion * b1.mass * b2.mass / (d * d * d), segment)

  box_width = ({ top, bottom, left, right }) ->
    length([top - bottom, right - left])

  sum = (vectors) ->
    vectors.reduce ((v, w) -> O.plus(v, w)), [0, 0]

  force_on = (leaf, tree, repulsion) ->
    threshold = 0.5
    if tree == leaf then [0, 0]
    else if tree.body then body_force_on(leaf.body, tree.body, repulsion)
    else if tree.point
      s = box_width(tree.box)
      d = length(O.minus(leaf.body.point, tree.point))
      if s / d < threshold then body_force_on(leaf.body, tree, repulsion)
      else if tree.children then sum(tree.children.map (c) -> force_on(leaf, c, repulsion))
    else [0, 0]

  repulsive_forces = (tree, repulsion) ->
    forces = {}
    walk_leaves tree, (leaf) ->
      forces[leaf.body.id] = force_on(leaf, tree, repulsion)
    forces

  tree: make_tree
  bodies: make_bodies
  root: make_root
  forces: repulsive_forces