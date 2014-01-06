(function() {
  define(['./bezier', './ops', './line-chart-comp'], function(Bezier, O, comp) {
    return function(options) {
      var arranged, base, colors, i, lines, scale, xscale, yscale, _ref;
      _ref = comp(options), arranged = _ref.arranged, scale = _ref.scale, xscale = _ref.xscale, yscale = _ref.yscale, colors = _ref.colors, base = _ref.base;
      i = -1;
      lines = arranged.map(function(_arg) {
        var area, line, points, scaled_points, xmax, xmin;
        points = _arg.points, xmin = _arg.xmin, xmax = _arg.xmax;
        scaled_points = points.map(scale);
        i += 1;
        line = Bezier({
          points: scaled_points
        });
        area = {
          path: line.path.lineto(scale([xmax, base])).lineto(scale([xmin, base])).closepath(),
          centroid: O.average([line.centroid, scale([xmin, base]), scale([xmax, base])])
        };
        return {
          item: options.data[i],
          line: line,
          area: area,
          color: colors(i)
        };
      });
      return {
        lines: lines,
        xscale: xscale,
        yscale: yscale
      };
    };
  });

}).call(this);
