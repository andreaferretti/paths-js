define [
  './path'
  './ops'
], (Path, O) ->

  reflect = (p, q) ->
    O.minus(O.times(2, p), q)

  ({points, tension}) ->
    tension ?= 0.3
    diffs = []
    l = points.length
    for i in [1..l - 1]
      diffs.push O.times(tension, O.minus(points[i], points[i - 1]))
    control_points = [O.plus(points[0], reflect(diffs[0], diffs[1]))]
    for i in [1..l - 2]
      control_points.push O.minus(points[i], O.average([diffs[i], diffs[i - 1]]))
    control_points.push O.minus(points[l - 1], reflect(diffs[l - 2], diffs[l - 3]))
    c0 = control_points[0]
    c1 = control_points[1]
    p0 = points[0]
    p1 = points[1]
    path = Path()
      .moveto(p0...)
      .curveto(c0[0], c0[1], c1[0], c1[1], p1[0], p1[1])

    path: [2..l - 1].reduce ((pt, i) ->
        c = control_points[i]
        p = points[i]
        pt.smoothcurveto(c[0], c[1], p[0], p[1])
      ), path
    centroid: O.average(points)