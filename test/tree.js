(function() {
  var Tree, data, expect, substrings;

  Tree = require('../dist/node/tree.js');

  expect = require('expect.js');

  data = {
    name: 1,
    children: [
      {
        name: 2,
        children: [
          {
            name: 4,
            children: [
              {
                name: 6,
                children: [
                  {
                    name: 7
                  }
                ]
              }
            ]
          }, {
            name: 5
          }
        ]
      }, {
        name: 3,
        children: [
          {
            name: 8
          }, {
            name: 9
          }
        ]
      }
    ]
  };

  substrings = function(word) {
    var l, _i, _results;
    l = word.length - 1;
    if (l === 0) {
      return [];
    } else {
      return (function() {
        _results = [];
        for (var _i = 0; 0 <= l ? _i <= l : _i >= l; 0 <= l ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(i) {
        if (i === 0) {
          return word.slice(1);
        } else {
          return word.slice(0, +(i - 1) + 1 || 9e9) + word.slice(i + 1, +l + 1 || 9e9);
        }
      });
    }
  };

  describe('the tree chart', function() {
    var tree;
    tree = Tree({
      data: data,
      width: 300,
      height: 300
    });
    it('should generate the right number of connectors', function() {
      return expect(tree.curves).to.have.length(8);
    });
    it('should generate open curves', function() {
      return expect(tree.curves[2].connector.path.print()).not.to.match(/Z/);
    });
    it('should give access to the original items', function() {
      return expect(tree.nodes[7].item).to.eql({
        name: 8
      });
    });
    return it('should allow a custom function to compute the children', function() {
      var tree1;
      tree1 = Tree({
        data: 'hello',
        children: substrings,
        width: 300,
        height: 300
      });
      expect(tree1.curves).to.have.length(205);
      return expect(tree1.nodes).to.have.length(206);
    });
  });

}).call(this);
