(function() {
  define(['./path', './ops'], function(Path, O) {
    return function(_arg) {
      var closed, head, l, path, points, tail, _ref;
      points = _arg.points, closed = _arg.closed;
      l = points.length;
      head = points[0];
      tail = points.slice(1, +l + 1 || 9e9);
      path = tail.reduce((function(pt, p) {
        return pt.lineto.apply(pt, p);
      }), (_ref = Path()).moveto.apply(_ref, head));
      return {
        path: closed ? path.closepath() : path,
        centroid: O.average(points)
      };
    };
  });

}).call(this);
