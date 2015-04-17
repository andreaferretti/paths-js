(function() {
  define(['./path', './ops'], function(Path, O) {
    return function(arg) {
      var closed, head, l, path, points, ref, tail;
      points = arg.points, closed = arg.closed;
      l = points.length;
      head = points[0];
      tail = points.slice(1, +l + 1 || 9e9);
      path = tail.reduce((function(pt, p) {
        return pt.lineto.apply(pt, p);
      }), (ref = Path()).moveto.apply(ref, head));
      return {
        path: closed ? path.closepath() : path,
        centroid: O.average(points)
      };
    };
  });

}).call(this);
