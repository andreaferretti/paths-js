(function() {
  var bodies, expect, ref, root;

  ref = require('../dist/node/barnes_hut.js'), root = ref.root, bodies = ref.bodies;

  expect = require('expect.js');

  describe('the root function', function() {
    return it('should return a tree with the given box as quadrant', function() {
      var tree;
      tree = root(300, 200);
      return expect(tree).to.eql({
        box: {
          left: 0,
          bottom: 0,
          top: 200,
          right: 300
        }
      });
    });
  });

  describe('the bodies function', function() {
    return it('should populate a list of bodies from a map of positions', function() {
      var positions;
      positions = {
        1: [3, 5],
        3: [-2, 8],
        4: [3, 6],
        6: [0, 0]
      };
      expect(bodies(positions)).to.have.length(4);
      expect(bodies(positions).map(function(x) {
        return x.mass;
      })).to.eql([1, 1, 1, 1]);
      return expect(bodies(positions)[0].point).to.eql([3, 5]);
    });
  });

}).call(this);
