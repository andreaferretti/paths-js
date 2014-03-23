(function() {
  var expect, tree_height;

  tree_height = require('../dist/node/tree_utils.js').tree_height;

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

}).call(this);
