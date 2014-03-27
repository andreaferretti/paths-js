define [
  './connector'
  './linear'
  './tree_utils'
], (Connector, Linear, u)->
  ({ data, width, height, children, tension }) ->
    children ?= (x) -> x.children
    tree = u.build_tree(data, children)
    levels = u.tree_height(tree)
    max_heights = u.set_height(tree)
    hspace = width / (levels - 1)
    hscale = Linear([0, levels - 1], [0, width])
    vscales = [0..levels - 1].map (level) ->
      available_height = Math.sqrt(level / (levels - 1)) * height
      top = (height - available_height) / 2
      bottom = top + available_height
      max_height = if level > 0
        max_heights[level] + max_heights[level-1]
      else max_heights[level]
      if max_height == 0
        (x) -> height / 2
      else
        Linear([0, max_height], [top, bottom])

    position = (node) ->
      level = node.level
      vscale = vscales[level]
      [hscale(level), vscale(node.height_)]

    i = -1
    connectors = u.collect tree, (parent, child) ->
      i += 1
      child.height_ = child.height + parent.height
      connector: Connector
        start: position(parent)
        end: position(child)
        tension: tension
      index: i
      item:
        start: parent.item
        end: child.item
    child_nodes = u.collect tree, (parent, child) ->
      point: position(child)
      item: child.item
    root_node =
      point: position(tree)
      item: tree.item

    curves: connectors
    nodes: [root_node].concat(child_nodes)