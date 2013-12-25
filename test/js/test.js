(function() {
  var expect, path;

  path = require('../../dist/node/path.js');

  expect = require('expect.js');

  describe('first test', function() {
    return it('should work', function() {
      return expect(typeof path).to.be('function');
    });
  });

}).call(this);
