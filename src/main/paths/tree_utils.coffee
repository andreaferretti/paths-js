define [], ->
  max_by = (items, f) ->
    items ?= []
    items.reduce ((m , i) -> Math.max(m, f(i))), 0

  tree_height = (root) ->
    1 + max_by(root.children, tree_height)

  build_tree = (data, children, level = 0) ->
    result =
      item: data
      level: level
    cs = children(data)
    if cs and cs.length
      result.children = cs.map (c) ->
        build_tree(c, children, level + 1)
    result

  set_height = (root, level, max_heights) ->
    max_heights ?= []
    level ?= 0
    if max_heights[level]?
      root.height = max_heights[level] + 1
      max_heights[level] += 1
    else
      max_heights[level] = 0
      root.height = 0
    for child in (root.children or [])
      set_height(child, level + 1, max_heights)
    max_heights

  # f is a function of (parent, child)
  collect = (root, f) ->
    result = []
    for child in (root.children or [])
      result.push f(root, child)
      result = result.concat collect(child, f)
    result

  tree_height: tree_height
  build_tree: build_tree
  set_height: set_height
  collect: collect