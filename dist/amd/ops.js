(function() {
  define([], function() {
    var average, max, min, minus, on_circle, plus, random_colors, random_int, times;
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
    average = function(points) {
      return times(1 / points.length, points.reduce(plus));
    };
    on_circle = function(r, angle) {
      return times(r, [Math.sin(angle), -Math.cos(angle)]);
    };
    random_int = function(max) {
      return Math.floor(Math.random() * max);
    };
    random_colors = function() {
      return "rgb(" + (random_int(256)) + ", " + (random_int(256)) + ", " + (random_int(256)) + ")";
    };
    return {
      min: min,
      max: max,
      plus: plus,
      minus: minus,
      times: times,
      average: average,
      on_circle: on_circle,
      random_int: random_int,
      random_colors: random_colors
    };
  });

}).call(this);
