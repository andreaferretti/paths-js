(function() {
  var __slice = [].slice;

  define(['./path'], function(Path) {
    var minus, on_circle, plus, times;
    plus = function(_arg, _arg1) {
      var a, b, c, d;
      a = _arg[0], b = _arg[1];
      c = _arg1[0], d = _arg1[1];
      return [a + c, b + d];
    };
    minus = function(_arg, _arg1) {
      var a, b, c, d;
      a = _arg[0], b = _arg[1];
      c = _arg1[0], d = _arg1[1];
      return [a - c, b - d];
    };
    times = function(k, _arg) {
      var a, b;
      a = _arg[0], b = _arg[1];
      return [k * a, k * b];
    };
    on_circle = function(r, angle) {
      return times(r, [Math.sin(angle), -Math.cos(angle)]);
    };
    return function(_arg) {
      var R, center, end, r, start;
      center = _arg.center, r = _arg.r, R = _arg.R, start = _arg.start, end = _arg.end;
      return {
        path: function() {
          var a, b, c, d, _ref, _ref1, _ref2, _ref3;
          a = plus(center, on_circle(R, start));
          b = plus(center, on_circle(R, end));
          c = plus(center, on_circle(r, end));
          d = plus(center, on_circle(r, start));
          return (_ref = (_ref1 = (_ref2 = (_ref3 = Path()).moveto.apply(_ref3, a)).arc.apply(_ref2, [R, R, 0, 0, 1].concat(__slice.call(b)))).lineto.apply(_ref1, c)).arc.apply(_ref, [r, r, 0, 0, 0].concat(__slice.call(d))).closepath();
        },
        centroid: function() {
          var mid_angle, mid_radius;
          mid_angle = (start + end) / 2;
          mid_radius = (r + R) / 2;
          return plus(center, on_circle(mid_radius, mid_angle));
        }
      };
    };
  });

}).call(this);
