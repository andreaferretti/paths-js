(function() {
  var SemiRegularPolygon, angle, expect, length, round, round_vector;

  SemiRegularPolygon = require('../dist/node/semi-regular-polygon.js');

  expect = require('expect.js');

  length = function(arg) {
    var x, y;
    x = arg[0], y = arg[1];
    return Math.sqrt(x * x + y * y);
  };

  angle = function(arg) {
    var a, x, y;
    x = arg[0], y = arg[1];
    a = Math.atan2(x, -y);
    if (a < 0) {
      return a + 2 * Math.PI;
    } else {
      return a;
    }
  };

  round = function(x, digits) {
    var a;
    if (digits == null) {
      digits = 5;
    }
    a = Math.pow(10, digits);
    return Math.round(a * x) / a;
  };

  round_vector = function(v, digits) {
    if (digits == null) {
      digits = 5;
    }
    return v.map(function(x) {
      return round(x, digits);
    });
  };

  describe('semi regular polygon', function() {
    it('should place points at the right radii', function() {
      var polygon, radii;
      radii = [2, 3, 5, 7];
      polygon = SemiRegularPolygon({
        center: [0, 0],
        radii: radii
      });
      return expect(polygon.path.points().map(length)).to.eql(radii);
    });
    it('should place points at the right angles', function() {
      var a, angles, j, polygon, radii, ref, results;
      radii = [2, 3, 5, 7, 9];
      a = 2 * Math.PI / radii.length;
      angles = (function() {
        results = [];
        for (var j = 0, ref = radii.length - 1; 0 <= ref ? j <= ref : j >= ref; 0 <= ref ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).map(function(i) {
        return a * i;
      });
      polygon = SemiRegularPolygon({
        center: [0, 0],
        radii: radii
      });
      return expect(round_vector(polygon.path.points().map(angle))).to.eql(round_vector(angles));
    });
    return it('should take the center into account', function() {
      var polygon1, polygon2, radii, shift;
      radii = [1, 3, 4, 2, 6];
      polygon1 = SemiRegularPolygon({
        center: [1, 3],
        radii: radii
      });
      polygon2 = SemiRegularPolygon({
        center: [0, 0],
        radii: radii
      });
      shift = function(arg) {
        var x, y;
        x = arg[0], y = arg[1];
        return [x + 1, y + 3];
      };
      return expect(polygon1.path.points()).to.eql(polygon2.path.points().map(shift));
    });
  });

}).call(this);
