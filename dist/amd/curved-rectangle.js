(function() {
  define(['./path', './connector', './ops'], function(Path, Connector, O) {
    return function(_arg) {
      var bottomCurve, bottomleft, bottomright, centroid, path, topCurve, topleft, topright;
      topleft = _arg.topleft, topright = _arg.topright, bottomleft = _arg.bottomleft, bottomright = _arg.bottomright;
      topCurve = Connector({
        start: topleft,
        end: topright
      }).path;
      bottomCurve = Connector({
        start: bottomright,
        end: bottomleft
      }).path;
      path = topCurve.connect(bottomCurve).closepath();
      centroid = O.average([topleft, topright, bottomleft, bottomright]);
      return {
        path: path,
        centroid: centroid
      };
    };
  });

}).call(this);
