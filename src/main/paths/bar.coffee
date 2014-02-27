define [
  './ops'
  './linear'
  './rectangle'
], (O, Linear, Rectangle)->
  ({data, accessor, width, height, gutter, compute}) ->
    accessor ?= (x) -> x
    gutter ?= 0
    groups = []
    min = 0
    max = 0
    for d, i in data
      for el, j in d
        val = accessor(el)
        if val < min then min = val
        if val > max then max = val
        groups[j] ?= []
        groups[j][i] = val

    n = groups.length
    group_width = (width - gutter * (n - 1)) / n
    curves = []
    scale = Linear [min, max], [height, 0]

    for g, i in groups
      w = group_width / g.length
      shift = (group_width + gutter) * i
      for el, j in g
        left = shift + w * j
        right = left + w
        bottom = scale(0)
        top = scale(el)
        line = Rectangle(left: left, right: right, bottom: bottom, top: top)
        curves.push O.enhance compute,
          item: data[j][i]
          line: line
          index: j

    curves: curves
    scale: scale