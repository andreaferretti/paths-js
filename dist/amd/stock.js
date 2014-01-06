(function() {
  define(['./polygon', './line-chart-comp'], function(Polygon, comp) {
    return function(options) {
      var arranged, base, colors, i, polygons, scale, xscale, yscale, _ref;
      _ref = comp(options), arranged = _ref.arranged, scale = _ref.scale, xscale = _ref.xscale, yscale = _ref.yscale, colors = _ref.colors, base = _ref.base;
      i = -1;
      polygons = arranged.map(function(_arg) {
        var points, scaled_points, scaled_points_closed, xmax, xmin;
        points = _arg.points, xmin = _arg.xmin, xmax = _arg.xmax;
        scaled_points = points.map(scale);
        points.push([xmax, base]);
        points.push([xmin, base]);
        scaled_points_closed = points.map(scale);
        i += 1;
        return {
          item: options.data[i],
          line: Polygon({
            points: scaled_points,
            closed: false
          }),
          area: Polygon({
            points: scaled_points_closed,
            closed: true
          }),
          color: colors(i)
        };
      });
      return {
        curves: polygons,
        xscale: xscale,
        yscale: yscale
      };
    };
  });

}).call(this);
