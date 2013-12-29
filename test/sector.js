(function() {
  var Sector, expect, round, round_vector;

  Sector = require('../dist/node/sector.js');

  expect = require('expect.js');

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

  describe('sector function', function() {
    it('should pass through the expected points', function() {
      var expected, points, sector;
      sector = Sector({
        r: 2,
        R: 4,
        center: [1, 1],
        start: 0,
        end: Math.PI / 2
      });
      points = sector.path.points().map(round_vector);
      expected = [[1, -3], [5, 1], [3, 1], [1, -1]];
      return expect(points).to.eql(expected);
    });
    return it('should have the expected centroid', function() {
      var sector;
      sector = Sector({
        r: 2,
        R: 6,
        center: [0, 0],
        start: 0,
        end: Math.PI
      });
      return expect(round_vector(sector.centroid)).to.eql([4, 0]);
    });
  });

}).call(this);
