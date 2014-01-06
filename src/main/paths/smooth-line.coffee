define [
  './bezier'
  './line-chart-comp'
], (Bezier, comp)->

  (options) ->
    { arranged, scale, xscale, yscale, colors, base } = comp(options)
    i = -1

    lines = arranged.map ({ points, xmin, xmax }) ->
      scaled_points = points.map scale
      i += 1
      line = Bezier(points: scaled_points)
      area = line
        .lineto(scale([xmax, base]))
        .lineto(scale([xmin, base]))
        .closepath()

      item: options.data[i]
      line: line
      area: area
      color: colors(i)

    lines: lines
    xscale: xscale
    yscale: yscale