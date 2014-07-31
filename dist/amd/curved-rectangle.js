(function() {
  define(['./path', './connector', './ops'], function(Path, Connector, O) {
    return function(_arg) {
      var bottomCurve, centroid, path, point1, point2, point3, point4, topCurve;
      point1 = _arg.point1, point2 = _arg.point2, point3 = _arg.point3, point4 = _arg.point4;
      topCurve = Connector({
        start: point1,
        end: point2
      }).path;
      bottomCurve = Connector({
        start: point4,
        end: point3
      }).path;
      path = topCurve.connect(bottomCurve).closepath();
      centroid = O.average([point1, point2, point3, point4]);
      return {
        path: path,
        centroid: centroid
      };
    };
  });

}).call(this);
