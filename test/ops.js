(function() {
  var O, expect, round, round_vector;

  O = require('../dist/node/ops.js');

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

  describe('vector sum', function() {
    return it('should yield the sum of the given vectors', function() {
      expect(O.plus([1, 2], [3, 4])).to.eql([4, 6]);
      return expect(O.plus([0, -1], [1, 3])).to.eql([1, 2]);
    });
  });

  describe('vector difference', function() {
    return it('should yield the difference of the given vectors', function() {
      expect(O.minus([1, 2], [3, 4])).to.eql([-2, -2]);
      return expect(O.minus([0, -1], [1, 3])).to.eql([-1, -4]);
    });
  });

  describe('scalar product', function() {
    return it('should yield the rescaled vector', function() {
      expect(O.times(5, [3, 4])).to.eql([15, 20]);
      return expect(O.times(-1, [1, 3])).to.eql([-1, -3]);
    });
  });

  describe('vector average', function() {
    return it('should yield the central point of the given vectors', function() {
      expect(O.average([[3, 4], [-1, -2], [3, 5], [-5, -7]])).to.eql([0, 0]);
      return expect(O.average([[5, 4], [-1, 0], [3, 6], [-3, -6]])).to.eql([1, 1]);
    });
  });

  describe('on_circle function', function() {
    it('should yield the top point when the angle is 0', function() {
      return expect(O.on_circle(3, 0)).to.eql([0, -3]);
    });
    return it('should yield the leftmost point when the angle is pi / 2', function() {
      var point;
      point = O.on_circle(3, 3 * Math.PI / 2);
      return expect(round_vector(point)).to.eql([-3, 0]);
    });
  });

  describe('random int', function() {
    it('should be between 0 and max', function() {
      expect(O.random_int(100)).to.be.above(0);
      return expect(O.random_int(357)).to.be.below(357);
    });
    return it('should be an integer', function() {
      var num;
      num = O.random_int(100);
      return expect(num).to.be(round(num));
    });
  });

  describe('random color', function() {
    return it('should generate an rgb string', function() {
      return expect(O.random_colors()).to.match(/rgb\([\d]+, [\d]+, [\d]+\)/);
    });
  });

}).call(this);
