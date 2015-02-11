(function() {
  define([], function() {
    var linear;
    linear = function(_arg, _arg1) {
      var a, b, c, d, f;
      a = _arg[0], b = _arg[1];
      c = _arg1[0], d = _arg1[1];
      f = function(x) {
        return c + (d - c) * (x - a) / (b - a);
      };
      f.inverse = function() {
        return linear([c, d], [a, b]);
      };
      return f;
    };
    return linear;
  });

}).call(this);
