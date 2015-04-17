(function() {
  define(['./linear', './ops'], function(Linear, O) {
    var box;
    box = function(datum, accessor) {
      var item, l, points, sorted, ycoords;
      points = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = datum.length; j < len; j++) {
          item = datum[j];
          results.push(accessor(item));
        }
        return results;
      })();
      sorted = points.sort(function(arg, arg1) {
        var a, b, c, d;
        a = arg[0], b = arg[1];
        c = arg1[0], d = arg1[1];
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
        ymin: O.min(ycoords),
        ymax: O.max(ycoords)
      };
    };
    return function(arg) {
      var arranged, base, closed, data, datum, f, height, scale, width, xaccessor, xmax, xmin, xscale, yaccessor, ymax, ymin, yscale;
      data = arg.data, xaccessor = arg.xaccessor, yaccessor = arg.yaccessor, width = arg.width, height = arg.height, closed = arg.closed;
      if (xaccessor == null) {
        xaccessor = function(arg1) {
          var x, y;
          x = arg1[0], y = arg1[1];
          return x;
        };
      }
      if (yaccessor == null) {
        yaccessor = function(arg1) {
          var x, y;
          x = arg1[0], y = arg1[1];
          return y;
        };
      }
      f = function(i) {
        return [xaccessor(i), yaccessor(i)];
      };
      arranged = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = data.length; j < len; j++) {
          datum = data[j];
          results.push(box(datum, f));
        }
        return results;
      })();
      xmin = O.min(arranged.map(function(d) {
        return d.xmin;
      }));
      xmax = O.max(arranged.map(function(d) {
        return d.xmax;
      }));
      ymin = O.min(arranged.map(function(d) {
        return d.ymin;
      }));
      ymax = O.max(arranged.map(function(d) {
        return d.ymax;
      }));
      if (closed) {
        ymin = Math.min(ymin, 0);
        ymax = Math.max(ymax, 0);
      }
      base = closed ? 0 : ymin;
      xscale = Linear([xmin, xmax], [0, width]);
      yscale = Linear([ymin, ymax], [height, 0]);
      scale = function(arg1) {
        var x, y;
        x = arg1[0], y = arg1[1];
        return [xscale(x), yscale(y)];
      };
      return {
        arranged: arranged,
        scale: scale,
        xscale: xscale,
        yscale: yscale,
        base: base
      };
    };
  });

}).call(this);
