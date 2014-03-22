(function() {
  define(['./path', './ops'], function(Path, O) {
    return function(_arg) {
      var a, b, c, d, end, length, mid1, mid2, start, tension, _ref, _ref1, _ref2;
      start = _arg.start, end = _arg.end, tension = _arg.tension;
      if (tension == null) {
        tension = 0.05;
      }
      a = start[0], b = start[1];
      c = end[0], d = end[1];
      length = (c - a) * tension;
      mid1 = [a + length, b];
      mid2 = [c - length, d];
      return {
        path: (_ref = (_ref1 = (_ref2 = Path()).moveto.apply(_ref2, start)).lineto.apply(_ref1, mid1).curveto(a + 5 * length, b, c - 5 * length, d, c - length, d)).lineto.apply(_ref, end),
        centroid: O.average([start, end])
      };
    };
  });

}).call(this);
