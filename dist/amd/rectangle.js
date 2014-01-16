(function() {
  define(['./polygon'], function(Polygon) {
    return function(_arg) {
      var bottom, left, right, top;
      left = _arg.left, right = _arg.right, top = _arg.top, bottom = _arg.bottom;
      return Polygon({
        points: [[right, top], [right, bottom], [left, bottom], [left, top]],
        closed: true
      });
    };
  });

}).call(this);
