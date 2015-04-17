(function() {
  var build_tree, collect, expect, ref, set_height, substrings, tree_height;

  ref = require('../dist/node/tree_utils.js'), tree_height = ref.tree_height, build_tree = ref.build_tree, collect = ref.collect, set_height = ref.set_height;

  expect = require('expect.js');

  substrings = function(word) {
    var j, l, results;
    l = word.length - 1;
    if (l === 0) {
      return [];
    } else {
      return (function() {
        results = [];
        for (var j = 0; 0 <= l ? j <= l : j >= l; 0 <= l ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).map(function(i) {
        if (i === 0) {
          return word.slice(1);
        } else {
          return word.slice(0, +(i - 1) + 1 || 9e9) + word.slice(i + 1, +l + 1 || 9e9);
        }
      });
    }
  };

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
      var data, tree;
      data = 'hello';
      tree = build_tree(data, substrings);
      return expect(tree_height(tree)).to.be(5);
    });
  });

  describe('the collect function', function() {
    var tree;
    tree = {
      name: 'a',
      children: [
        {
          name: 'b'
        }, {
          name: 'c',
          children: [
            {
              name: 'd'
            }, {
              name: 'e'
            }
          ]
        }
      ]
    };
    it('should accumulate a function along the edges', function() {
      var list;
      list = collect(tree, function(p, c) {
        return c;
      });
      return expect(list.map(function(x) {
        return x.name;
      })).to.eql(['b', 'c', 'd', 'e']);
    });
    return it('take the parent into account', function() {
      var list;
      list = collect(tree, function(p, c) {
        return p;
      });
      return expect(list.map(function(x) {
        return x.name;
      })).to.eql(['a', 'a', 'c', 'c']);
    });
  });

  describe('the set height function', function() {
    it('should assign distinct consecutive numbers on each level', function() {
      var heights_at_level_2, pairs, tree;
      tree = build_tree('hello', substrings);
      set_height(tree);
      pairs = collect(tree, function(p, c) {
        return [c.level, c.height];
      });
      heights_at_level_2 = pairs.filter(function(arg) {
        var h, l;
        l = arg[0], h = arg[1];
        return l === 2;
      }).map(function(arg) {
        var h, l;
        l = arg[0], h = arg[1];
        return h;
      });
      return expect(heights_at_level_2).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    });
    return it('should return the maximum heights found on each level', function() {
      var heights, tree;
      tree = build_tree('hello', substrings);
      heights = set_height(tree);
      return expect(heights).to.eql([1 - 1, 5 - 1, 20 - 1, 60 - 1, 120 - 1]);
    });
  });

}).call(this);
