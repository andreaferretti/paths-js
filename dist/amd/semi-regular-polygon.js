(function() {
  define(['./polygon', './ops'], function(Polygon, O) {
    return function(_arg) {
      var angle, center, points, radii;
      center = _arg.center, radii = _arg.radii;
      angle = 2 * Math.PI / radii.length;
      points = radii.map(function(r, i) {
        return O.plus(center, O.on_circle(r, i * angle));
      });
      return Polygon({
        points: points,
        closed: true
      });
    };
  });

}).call(this);
