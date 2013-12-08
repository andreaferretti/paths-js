(function() {
  var __slice = [].slice;

  define(['./path', './ops'], function(Path, O) {
    var on_circle;
    on_circle = function(r, angle) {
      return O.times(r, [Math.sin(angle), -Math.cos(angle)]);
    };
    return function(_arg) {
      var R, center, end, r, start;
      center = _arg.center, r = _arg.r, R = _arg.R, start = _arg.start, end = _arg.end;
      return {
        path: function() {
          var a, b, c, d, _ref, _ref1, _ref2, _ref3;
          a = O.plus(center, on_circle(R, start));
          b = O.plus(center, on_circle(R, end));
          c = O.plus(center, on_circle(r, end));
          d = O.plus(center, on_circle(r, start));
          return (_ref = (_ref1 = (_ref2 = (_ref3 = Path()).moveto.apply(_ref3, a)).arc.apply(_ref2, [R, R, 0, 0, 1].concat(__slice.call(b)))).lineto.apply(_ref1, c)).arc.apply(_ref, [r, r, 0, 0, 0].concat(__slice.call(d))).closepath();
        },
        centroid: function() {
          var mid_angle, mid_radius;
          mid_angle = (start + end) / 2;
          mid_radius = (r + R) / 2;
          return O.plus(center, on_circle(mid_radius, mid_angle));
        }
      };
    };
  });

}).call(this);
