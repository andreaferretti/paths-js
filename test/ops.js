(function() {
  var O, expect;

  O = require('../dist/node/ops.js');

  expect = require('expect.js');

  describe('sum function', function() {
    it('should sum the given elements', function() {
      expect(O.sum([1, 2, 3, 4])).to.be(10);
      return expect(O.sum([0, -1, 1, 3])).to.be(3);
    });
    it('should work when only one element is given', function() {
      return expect(O.sum([13])).to.be(13);
    });
    return it('should return 0 on an empty array', function() {
      return expect(O.sum([])).to.be(0);
    });
  });

  describe('min function', function() {
    it('should yield the minimum of the given elements', function() {
      expect(O.min([1, 2, 3, 4])).to.be(1);
      return expect(O.min([0, -1, 1, 3])).to.be(-1);
    });
    return it('should work when only one element is given', function() {
      return expect(O.min([13])).to.be(13);
    });
  });

  describe('max function', function() {
    it('should yield the maximum of the given elements', function() {
      expect(O.max([1, 2, 3, 4])).to.be(4);
      return expect(O.max([0, -1, 1, 3])).to.be(3);
    });
    return it('should work when only one element is given', function() {
      return expect(O.max([13])).to.be(13);
    });
  });

}).call(this);
