(function() {
  define([], function() {
    var average, minus, plus, times;
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
    return {
      plus: plus,
      minus: minus,
      times: times,
      average: average
    };
  });

}).call(this);
