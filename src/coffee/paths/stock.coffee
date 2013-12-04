define [
  './path'
  './linear'
], (Path, Linear)->

  min = (xs) -> xs.reduce (a, b) -> Math.min(a, b)
  max = (xs) -> xs.reduce (a, b) -> Math.max(a, b)

  ({data, xaccessor, yaccessor, width, height, close}) ->
    xaccessor ?= ([x, y]) -> x
    yaccessor ?= ([x, y]) -> y
    f = (i) -> [xaccessor(i), -yaccessor(i)]
    points = (f item for item in data)
    sorted = points.sort ([a, b], [c, d]) -> a - c
    console.log points,sorted
    l = sorted.length
    xmin = sorted[0][0]
    xmax = sorted[l - 1][0]
    xscale = Linear [xmin, xmax], [0, width]
    ycoords = sorted.map (p) -> p[1]
    ymin = min ycoords
    ymax = max ycoords
    if close
      ymin = Math.min(ymin, 0)
      ymax = Math.max(ymax, 0)
    yscale = Linear [ymin, ymax], [0, height]
    head = sorted[0]
    tail = sorted[1..l]
    scale = ([x, y]) -> [xscale(x), yscale(y)]
    path = tail.reduce ((pt, p) ->
      pt.lineto(scale(p)...)), Path().moveto(scale(head))
    if close
      path = path
        .lineto(scale [xmax, 0])
        .lineto(scale [xmin, 0])
        .closepath()
    
    path: path
    xscale: xscale
    yscale: yscale
