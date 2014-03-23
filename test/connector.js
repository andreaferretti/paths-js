(function() {
  var Connector, expect;

  Connector = require('../dist/node/connector.js');

  expect = require('expect.js');

  describe('connector shape', function() {
    it('should pass through four points', function() {
      var connector;
      connector = Connector({
        start: [1, 3],
        end: [3, -2]
      });
      return expect(connector.path.points()).to.have.length(4);
    });
    it('should start and end at the given points', function() {
      var connector;
      connector = Connector({
        start: [2, 7],
        end: [5, -1]
      });
      expect(connector.path.points()[0]).to.eql([2, 7]);
      return expect(connector.path.points()[3]).to.eql([5, -1]);
    });
    it('should be made of two straight lines and a bezier curve', function() {
      var connector;
      connector = Connector({
        start: [2, 7],
        end: [5, 5]
      });
      return expect(connector.path.print()).to.match(/L .* C .* L .*/);
    });
    it('should be open', function() {
      var connector;
      connector = Connector({
        start: [0, 2],
        end: [3, 4]
      });
      return expect(connector.path.print()).not.to.match(/Z/);
    });
    return it('should have center halfway between the endpoints', function() {
      var connector;
      connector = Connector({
        start: [0, 4],
        end: [6, -2]
      });
      return expect(connector.centroid).to.eql([3, 1]);
    });
  });

}).call(this);
