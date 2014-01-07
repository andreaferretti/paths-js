(function() {
  var Bezier, expect;

  Bezier = require('../dist/node/bezier.js');

  expect = require('expect.js');

  describe('bézier function', function() {
    it('should start by moving to the first point of the curve', function() {
      var bezier, path;
      bezier = Bezier({
        points: [[1, 7], [2, 0], [4, 3], [2, 5], [7, 0], [-2, -1]]
      });
      path = bezier.path.print();
      return expect(path.substring(0, 5)).to.be('M 1 7');
    });
    it('should give the same points that are fed as input', function() {
      var bezier, points;
      points = [[1, 7], [2, 0], [4, 3], [2, 5], [7, 0], [-2, -1]];
      bezier = Bezier({
        points: points
      });
      return expect(bezier.path.points()).to.eql(points);
    });
    it('should produce open curves', function() {
      var bezier, points;
      points = [[-1, 3], [2, 17], [3, 5], [4, 6]];
      bezier = Bezier({
        points: points
      });
      return expect(bezier.path.print()).not.to.match(/Z/);
    });
    it('should compute the expected centroid of a square', function() {
      var bezier;
      bezier = Bezier({
        points: [[-1, -1], [-1, 1], [1, 1], [1, -1]]
      });
      return expect(bezier.centroid).to.eql([0, 0]);
    });
    it('should compute the expected centroid of a rotated square', function() {
      var bezier;
      bezier = Bezier({
        points: [[-1, 1], [0, 0], [1, 1], [0, 2]]
      });
      return expect(bezier.centroid).to.eql([0, 1]);
    });
    return it('should compute the expected centroid of a triangle', function() {
      var bezier;
      bezier = Bezier({
        points: [[0, 3], [0, 0], [-3, 0]]
      });
      return expect(bezier.centroid).to.eql([-1, 1]);
    });
  });

}).call(this);
