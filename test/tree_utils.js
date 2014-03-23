(function() {
  var build_tree, expect, tree_height, _ref;

  _ref = require('../dist/node/tree_utils.js'), tree_height = _ref.tree_height, build_tree = _ref.build_tree;

  expect = require('expect.js');

  describe('the tree height function', function() {
    it('should return 1 for a single node tree', function() {
      return expect(tree_height({
        name: 'root'
      })).to.be(1);
    });
    return it('should return the expected height', function() {
      var tree;
      tree = {
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
      return expect(tree_height(tree)).to.be(5);
    });
  });

  describe('the build tree function', function() {
    it('should return an object with the "children" property', function() {
      var data, tree;
      data = {
        name: 'a',
        descendants: ['b', 'c']
      };
      tree = build_tree(data, function(x) {
        return x.descendants;
      });
      return expect(tree).to.have.property('children');
    });
    it('should populate the "level" property', function() {
      var data, tree;
      data = {
        name: 'a',
        descendants: ['b', 'c']
      };
      tree = build_tree(data, function(x) {
        return x.descendants;
      });
      expect(tree.level).to.be(0);
      return expect(tree.children.map(function(c) {
        return c.level;
      })).to.eql([1, 1]);
    });
    return it('should take into account a function to compute the children', function() {
      var children, data, tree;
      data = 'hello';
      children = function(word) {
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
      tree = build_tree(data, children);
      return expect(tree_height(tree)).to.be(5);
    });
  });

}).call(this);
