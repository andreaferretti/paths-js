define [
  './ops'
  './linear'
  './rectangle'
], (O, Linear, Rectangle)->
  ({data, accessor, width, height, gutter, compute, min, max}) ->
    accessor ?= (x) -> x
    gutter ?= 0
    min ?= 0
    max ?= 0
    last = 0
    data_ = []

    for d in data
      { value, absolute } = accessor(d)
      [ low, high ] = if absolute then [0, value || last] else [last, last + value]

      m = Math.min(low, high)
      M = Math.max(low, high)
      min = Math.min(min, m)
      max = Math.max(max, M)
      last = high

      data_.push
        item: d
        low: low
        high: high
        value: if value? then value else high

    n = data_.length
    bar_width = (width - gutter * (n - 1)) / n
    curves = []
    scale = Linear [min, max], [height, 0]

    for d, i in data_
      left = i * (bar_width + gutter)
      right = left + bar_width
      bottom = scale(d.low)
      top = scale(d.high)
      line = Rectangle(left: left, right: right, bottom: bottom, top: top)
      curves.push O.enhance compute,
        item: d.item
        line: line
        value: d.value
        index: i

    curves: curves
    scale: scale