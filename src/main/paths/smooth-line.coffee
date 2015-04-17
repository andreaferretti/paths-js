define [
  './bezier'
  './ops'
  './line-chart-comp'
], (Bezier, O, comp)->

  (options) ->
    { arranged, scale, xscale, yscale, base } = comp(options)
    i = -1

    lines = arranged.map ({ points, xmin, xmax }) ->
      scaled_points = points.map scale
      i += 1
      line = Bezier(points: scaled_points)
      area = {
        path: line.path
          .lineto(scale([xmax, base])...)
          .lineto(scale([xmin, base])...)
          .closepath(),
        centroid: O.average([
            line.centroid,
            scale([xmin, base]),
            scale([xmax, base])
          ])
      }

      O.enhance options.compute,
        item: options.data[i]
        line: line
        area: area
        index: i

    curves: lines
    xscale: xscale
    yscale: yscale