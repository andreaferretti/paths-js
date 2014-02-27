define [
  './polygon'
  './line-chart-comp'
  './ops'
], (Polygon, comp, O)->

  (options) ->
    { arranged, scale, xscale, yscale, base } = comp(options)
    i = -1

    polygons = arranged.map ({ points, xmin, xmax }) ->
      scaled_points = points.map scale
      points.push [xmax, base]
      points.push [xmin, base]
      scaled_points_closed = points.map scale
      i += 1

      O.enhance options.compute,
        item: options.data[i]
        line: Polygon
          points: scaled_points
          closed: false
        area: Polygon
          points: scaled_points_closed
          closed: true
        index: i

    curves: polygons
    xscale: xscale
    yscale: yscale
