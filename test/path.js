(function() {
  var Path, expect;

  Path = require('../dist/node/path.js');

  expect = require('expect.js');

  describe('node module import', function() {
    return it('should export the correct type', function() {
      return expect(Path).to.be.a('function');
    });
  });

  describe('path', function() {
    it('should have methods to get the points and the printed string', function() {
      var path;
      path = Path();
      expect(path).to.have.property('points');
      return expect(path).to.have.property('print');
    });
    it('should report the expected point for a moveto command', function() {
      var path;
      path = Path().moveto(2, 10);
      return expect(path.points()).to.eql([[2, 10]]);
    });
    return it('should report the expected points for lineto commands', function() {
      var path;
      path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17);
      return expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]]);
    });
  });

}).call(this);
