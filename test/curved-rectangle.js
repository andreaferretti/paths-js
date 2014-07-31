(function() {
  var CurvedRectangle, expect;

  CurvedRectangle = require('../dist/node/curved-rectangle.js');

  expect = require('expect.js');

  describe('polygon function', function() {
    it('should start by moving to the first point of the curved rectangle', function() {
      var curvedRectangle, path;
      curvedRectangle = CurvedRectangle({
        point1: [1, 1],
        point2: [4, 1],
        point3: [1, 5],
        point4: [4, 5]
      });
      path = curvedRectangle.path.print();
      return expect(path.substring(0, 5)).to.be('M 1 1');
    });
    it('should be a closed shape', function() {
      var curvedRectangle;
      curvedRectangle = CurvedRectangle({
        point1: [1, 1],
        point2: [4, 1],
        point3: [1, 5],
        point4: [4, 5]
      });
      return expect(curvedRectangle.path.print()).to.match(/Z/);
    });
    it('should compute the expected centroid of a square', function() {
      var square;
      square = CurvedRectangle({
        point1: [0, 0],
        point2: [2, 0],
        point3: [0, 2],
        point4: [2, 2]
      });
      return expect(square.centroid).to.eql([1, 1]);
    });
    return it('should compute the expected centroid of a shape', function() {
      var curvedRectangle;
      curvedRectangle = CurvedRectangle({
        point1: [0, 0],
        point2: [6, 0],
        point3: [0, 3],
        point4: [6, 5]
      });
      return expect(curvedRectangle.centroid).to.eql([3, 2]);
    });
  });

}).call(this);
