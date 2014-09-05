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
    it('should have the expected centroid', function() {
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
    it('should be closed', function() {
      var sector;
      sector = Sector({
        r: 2,
        R: 4,
        center: [1, 1],
        start: 0,
        end: 1
      });
      return expect(sector.path.print()).to.match(/Z/);
    });
    it('should pass through the center when r = 0', function() {
      var sector;
      sector = Sector({
        r: 0,
        R: 3,
        center: [3, 16],
        start: 1,
        end: 2
      });
      return expect(sector.path.points().filter(function(x) {
        return x[0] === 3 && x[1] === 16;
      })).to.have.length(2);
    });
    return it('should have the expected large arc flag', function() {
      var sector;
      sector = Sector({
        r: 0,
        R: 3,
        center: [0, 0],
        start: 0,
        end: 3 / 2 * Math.PI
      });
      return expect(sector.path.print()).to.match(/A 3 3 0 1 1 -3/);
    });
  });

}).call(this);
