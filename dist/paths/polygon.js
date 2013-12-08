(function() {
  define(['./path'], function(Path) {
    return function(_arg) {
      var closed, head, l, path, points, tail;
      points = _arg.points, closed = _arg.closed;
      l = points.length;
      head = points[0];
      tail = points.slice(1, +l + 1 || 9e9);
      path = tail.reduce((function(pt, p) {
        return pt.lineto.apply(pt, p);
      }), Path().moveto(head));
      if (closed(path.closepath())) {

      } else {
        return path;
      }
    };
  });

}).call(this);
