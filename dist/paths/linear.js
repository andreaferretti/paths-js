(function() {
  define([], function() {
    return function(_arg, _arg1) {
      var a, b, c, d;
      a = _arg[0], b = _arg[1];
      c = _arg1[0], d = _arg1[1];
      return function(x) {
        return c + (d - c) * (x - a) / (b - a);
      };
    };
  });

}).call(this);
