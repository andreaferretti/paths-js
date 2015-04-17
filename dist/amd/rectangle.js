(function() {
  define(['./polygon'], function(Polygon) {
    return function(arg) {
      var bottom, left, right, top;
      left = arg.left, right = arg.right, top = arg.top, bottom = arg.bottom;
      return Polygon({
        points: [[right, top], [right, bottom], [left, bottom], [left, top]],
        closed: true
      });
    };
  });

}).call(this);
