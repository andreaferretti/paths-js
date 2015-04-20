define [
  './linear'
  './ops'
], (Linear, O) ->
  epsilon = 1e-5

  box = (datum, accessor) ->
    points = (accessor item for item in datum)
    sorted = points.sort ([a, b], [c, d]) -> a - c
    ycoords = sorted.map (p) -> p[1]
    l = sorted.length
    xmin = sorted[0][0]
    xmax = sorted[l - 1][0]
    ymin = O.min ycoords
    ymax = O.max ycoords
    if xmin == xmax then xmax += epsilon
    if ymin == ymax then ymax += epsilon

    points: sorted
    xmin: xmin
    xmax: xmax
    ymin: ymin
    ymax: ymax

  ({data, xaccessor, yaccessor, width, height, closed}) ->
    xaccessor ?= ([x, y]) -> x
    yaccessor ?= ([x, y]) -> y
    f = (i) -> [xaccessor(i), yaccessor(i)]
    arranged = (box(datum, f) for datum in data)

    xmin = O.min(arranged.map (d) -> d.xmin)
    xmax = O.max(arranged.map (d) -> d.xmax)
    ymin = O.min(arranged.map (d) -> d.ymin)
    ymax = O.max(arranged.map (d) -> d.ymax)
    if closed
      ymin = Math.min(ymin, 0)
      ymax = Math.max(ymax, 0)
    base = if closed then 0 else ymin
    xscale = Linear [xmin, xmax], [0, width]
    yscale = Linear [ymin, ymax], [height, 0]
    scale = ([x, y]) -> [xscale(x), yscale(y)]

    arranged: arranged
    scale: scale
    xscale: xscale
    yscale: yscale
    base: base