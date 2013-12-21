(function() {
  define(['./polygon', './linear'], function(Polygon, Linear) {
    var box, max, min;
    min = function(xs) {
      return xs.reduce(function(a, b) {
        return Math.min(a, b);
      });
    };
    max = function(xs) {
      return xs.reduce(function(a, b) {
        return Math.max(a, b);
      });
    };
    box = function(datum, accessor) {
      var item, l, points, sorted, ycoords;
      points = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = datum.length; _i < _len; _i++) {
          item = datum[_i];
          _results.push(accessor(item));
        }
        return _results;
      })();
      sorted = points.sort(function(_arg, _arg1) {
        var a, b, c, d;
        a = _arg[0], b = _arg[1];
        c = _arg1[0], d = _arg1[1];
        return a - c;
      });
      ycoords = sorted.map(function(p) {
        return p[1];
      });
      l = sorted.length;
      return {
        points: sorted,
        xmin: sorted[0][0],
        xmax: sorted[l - 1][0],
        ymin: min(ycoords),
        ymax: max(ycoords)
      };
    };
    return function(_arg) {
      var arranged, base, closed, colors, data, datum, f, height, i, polygons, scale, width, xaccessor, xmax, xmin, xscale, yaccessor, ymax, ymin, yscale;
      data = _arg.data, xaccessor = _arg.xaccessor, yaccessor = _arg.yaccessor, width = _arg.width, height = _arg.height, colors = _arg.colors, closed = _arg.closed;
      if (xaccessor == null) {
        xaccessor = function(_arg1) {
          var x, y;
          x = _arg1[0], y = _arg1[1];
          return x;
        };
      }
      if (yaccessor == null) {
        yaccessor = function(_arg1) {
          var x, y;
          x = _arg1[0], y = _arg1[1];
          return y;
        };
      }
      f = function(i) {
        return [xaccessor(i), -yaccessor(i)];
      };
      arranged = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          datum = data[_i];
          _results.push(box(datum, f));
        }
        return _results;
      })();
      xmin = min(arranged.map(function(d) {
        return d.xmin;
      }));
      xmax = min(arranged.map(function(d) {
        return d.xmax;
      }));
      ymin = min(arranged.map(function(d) {
        return d.ymin;
      }));
      ymax = min(arranged.map(function(d) {
        return d.ymax;
      }));
      if (closed) {
        ymin = Math.min(ymin, 0);
        ymax = Math.max(ymax, 0);
      }
      base = closed ? 0 : ymax;
      xscale = Linear([xmin, xmax], [0, width]);
      yscale = Linear([ymin, ymax], [0, height]);
      scale = function(_arg1) {
        var x, y;
        x = _arg1[0], y = _arg1[1];
        return [xscale(x), yscale(y)];
      };
      i = -1;
      polygons = arranged.map(function(_arg1) {
        var points, scaled_points, scaled_points_closed, xmax, xmin;
        points = _arg1.points, xmin = _arg1.xmin, xmax = _arg1.xmax;
        scaled_points = points.map(scale);
        points.push([xmax, base]);
        points.push([xmin, base]);
        scaled_points_closed = points.map(scale);
        i += 1;
        return {
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
        polygons: polygons,
        xscale: xscale,
        yscale: yscale
      };
    };
  });

}).call(this);
