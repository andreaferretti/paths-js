(function() {
  var Linear, expect;

  Linear = require('../dist/node/linear.js');

  expect = require('expect.js');

  describe('linear scale', function() {
    it('should map the extremes of the source interval to those of the target', function() {
      var linear;
      linear = Linear([-1, 3], [2, 17]);
      expect(linear(-1)).to.be(2);
      return expect(linear(3)).to.be(17);
    });
    it('should map a known point in the source interval correctly', function() {
      var linear;
      linear = Linear([-10, 2], [0, 100]);
      return expect(linear(-1)).to.be(75);
    });
    return it('should map correctly points outside the source interval', function() {
      var linear;
      linear = Linear([0, 1], [3, 13]);
      expect(linear(-1)).to.be(-7);
      return expect(linear(2)).to.be(23);
    });
  });

}).call(this);
