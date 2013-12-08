(function() {
  define(['./polygon', './linear'], function(Polygon, Linear) {
    var max, min;
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
    return function(_arg) {
      var closed, data, f, height, item, l, points, polygon, scale, scaled_points, sorted, width, xaccessor, xmax, xmin, xscale, yaccessor, ycoords, ymax, ymin, yscale;
      data = _arg.data, xaccessor = _arg.xaccessor, yaccessor = _arg.yaccessor, width = _arg.width, height = _arg.height, closed = _arg.closed;
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
      points = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          item = data[_i];
          _results.push(f(item));
        }
        return _results;
      })();
      sorted = points.sort(function(_arg1, _arg2) {
        var a, b, c, d;
        a = _arg1[0], b = _arg1[1];
        c = _arg2[0], d = _arg2[1];
        return a - c;
      });
      l = sorted.length;
      xmin = sorted[0][0];
      xmax = sorted[l - 1][0];
      xscale = Linear([xmin, xmax], [0, width]);
      ycoords = sorted.map(function(p) {
        return p[1];
      });
      ymin = min(ycoords);
      ymax = max(ycoords);
      if (closed) {
        ymin = Math.min(ymin, 0);
        ymax = Math.max(ymax, 0);
      }
      yscale = Linear([ymin, ymax], [0, height]);
      scale = function(_arg1) {
        var x, y;
        x = _arg1[0], y = _arg1[1];
        return [xscale(x), yscale(y)];
      };
      scaled_points = sorted.map(scale);
      if (closed) {
        scaled_points.push(scale([xmax, 0]));
        scaled_points.push(scale([xmin, 0]));
      }
      polygon = Polygon({
        points: scaled_points,
        closed: closed
      });
      return {
        path: polygon.path,
        xscale: xscale,
        yscale: yscale
      };
    };
  });

}).call(this);
