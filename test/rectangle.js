(function() {
  var Rectangle, expect;

  Rectangle = require('../dist/node/rectangle.js');

  expect = require('expect.js');

  describe('rectangle shape', function() {
    it('should have four vertices', function() {
      var rectangle;
      rectangle = Rectangle({
        left: 0,
        right: 5,
        top: 3,
        bottom: -1
      });
      return expect(rectangle.path.points()).to.have.length(4);
    });
    it('should be made of straight lines', function() {
      var rectangle;
      rectangle = Rectangle({
        left: 1,
        right: 3,
        top: 6,
        bottom: 2
      });
      return expect(rectangle.path.print()).to.match(/L \d+ \d+ L \d+ \d+ L \d+ \d+/);
    });
    it('should be closed', function() {
      var rectangle;
      rectangle = Rectangle({
        left: -3,
        right: 3,
        top: 6,
        bottom: 2
      });
      return expect(rectangle.path.print()).to.match(/Z/);
    });
    return it('should have center halfway between the sides', function() {
      var rectangle;
      rectangle = Rectangle({
        left: 1,
        right: 9,
        top: 5,
        bottom: 1
      });
      return expect(rectangle.centroid).to.eql([5, 3]);
    });
  });

}).call(this);
