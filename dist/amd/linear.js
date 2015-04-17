(function() {
  define([], function() {
    var linear;
    linear = function(arg, arg1) {
      var a, b, c, d, f;
      a = arg[0], b = arg[1];
      c = arg1[0], d = arg1[1];
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
