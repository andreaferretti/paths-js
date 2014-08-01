(function() {
  var CurvedRectangle, expect;

  CurvedRectangle = require('../dist/node/curved-rectangle.js');

  expect = require('expect.js');

  describe('polygon function', function() {
    it('should start by moving to the first point of the curved rectangle', function() {
      var curvedRectangle, path;
      curvedRectangle = CurvedRectangle({
        topleft: [1, 1],
        topright: [4, 1],
        bottomleft: [1, 5],
        bottomright: [4, 5]
      });
      path = curvedRectangle.path.print();
      return expect(path.substring(0, 5)).to.be('M 1 1');
    });
    it('should be a closed shape', function() {
      var curvedRectangle;
      curvedRectangle = CurvedRectangle({
        topleft: [1, 1],
        topright: [4, 1],
        bottomleft: [1, 5],
        bottomright: [4, 5]
      });
      return expect(curvedRectangle.path.print()).to.match(/Z/);
    });
    it('should compute the expected centroid of a square', function() {
      var square;
      square = CurvedRectangle({
        topleft: [0, 0],
        topright: [2, 0],
        bottomleft: [0, 2],
        bottomright: [2, 2]
      });
      return expect(square.centroid).to.eql([1, 1]);
    });
    return it('should compute the expected centroid of a shape', function() {
      var curvedRectangle;
      curvedRectangle = CurvedRectangle({
        topleft: [0, 0],
        topright: [6, 0],
        bottomleft: [0, 3],
        bottomright: [6, 5]
      });
      return expect(curvedRectangle.centroid).to.eql([3, 2]);
    });
  });

}).call(this);
