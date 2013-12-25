define [
  './polygon'
  './linear'
  './ops'
], (Polygon, Linear, O)->

  box = (datum, accessor) ->
    points = (accessor item for item in datum)
    sorted = points.sort ([a, b], [c, d]) -> a - c
    ycoords = sorted.map (p) -> p[1]
    l = sorted.length

    points: sorted
    xmin: sorted[0][0]
    xmax: sorted[l - 1][0]
    ymin: O.min ycoords
    ymax: O.max ycoords

  ({data, xaccessor, yaccessor, width, height, colors, closed}) ->
    xaccessor ?= ([x, y]) -> x
    yaccessor ?= ([x, y]) -> y
    f = (i) -> [xaccessor(i), -yaccessor(i)]
    arranged = (box(datum, f) for datum in data)

    xmin = O.min(arranged.map (d) -> d.xmin)
    xmax = O.max(arranged.map (d) -> d.xmax)
    ymin = O.min(arranged.map (d) -> d.ymin)
    ymax = O.max(arranged.map (d) -> d.ymax)
    if closed
      ymin = Math.min(ymin, 0)
      ymax = Math.max(ymax, 0)
    base = if closed then 0 else ymax
    xscale = Linear [xmin, xmax], [0, width]
    yscale = Linear [ymin, ymax], [0, height]
    scale = ([x, y]) -> [xscale(x), yscale(y)]
    i = -1

    polygons = arranged.map ({ points, xmin, xmax }) ->
      scaled_points = points.map scale
      points.push [xmax, base]
      points.push [xmin, base]
      scaled_points_closed = points.map scale
      i += 1

      line: Polygon
        points: scaled_points
        closed: false
      area: Polygon
        points: scaled_points_closed
        closed: true
      color: colors(i)

    polygons: polygons
    xscale: xscale
    yscale: yscale
