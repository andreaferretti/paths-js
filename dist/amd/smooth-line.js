(function() {
  define(['./bezier', './ops', './line-chart-comp'], function(Bezier, O, comp) {
    return function(options) {
      var arranged, base, i, lines, ref, scale, xscale, yscale;
      ref = comp(options), arranged = ref.arranged, scale = ref.scale, xscale = ref.xscale, yscale = ref.yscale, base = ref.base;
      i = -1;
      lines = arranged.map(function(arg) {
        var area, line, points, ref1, ref2, scaled_points, xmax, xmin;
        points = arg.points, xmin = arg.xmin, xmax = arg.xmax;
        scaled_points = points.map(scale);
        i += 1;
        line = Bezier({
          points: scaled_points
        });
        area = {
          path: (ref1 = (ref2 = line.path).lineto.apply(ref2, scale([xmax, base]))).lineto.apply(ref1, scale([xmin, base])).closepath(),
          centroid: O.average([line.centroid, scale([xmin, base]), scale([xmax, base])])
        };
        return O.enhance(options.compute, {
          item: options.data[i],
          line: line,
          area: area,
          index: i
        });
      });
      return {
        curves: lines,
        xscale: xscale,
        yscale: yscale
      };
    };
  });

}).call(this);
