define [
  './polygon'
  './linear'
], (Polygon, Linear)->

  min = (xs) -> xs.reduce (a, b) -> Math.min(a, b)
  max = (xs) -> xs.reduce (a, b) -> Math.max(a, b)

  ({data, xaccessor, yaccessor, width, height, closed}) ->
    xaccessor ?= ([x, y]) -> x
    yaccessor ?= ([x, y]) -> y
    f = (i) -> [xaccessor(i), -yaccessor(i)]
    points = (f item for item in data)
    sorted = points.sort ([a, b], [c, d]) -> a - c
    l = sorted.length
    xmin = sorted[0][0]
    xmax = sorted[l - 1][0]
    xscale = Linear [xmin, xmax], [0, width]
    ycoords = sorted.map (p) -> p[1]
    ymin = min ycoords
    ymax = max ycoords
    if closed
      ymin = Math.min(ymin, 0)
      ymax = Math.max(ymax, 0)
    yscale = Linear [ymin, ymax], [0, height]
    scale = ([x, y]) -> [xscale(x), yscale(y)]
    scaled_points = sorted.map scale
    if closed
      scaled_points.push(scale [xmax, 0])
      scaled_points.push(scale [xmin, 0])
    
    path: Polygon
      points: scaled_points
      closed: closed
    xscale: xscale
    yscale: yscale
