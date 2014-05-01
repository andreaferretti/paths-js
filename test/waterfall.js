(function() {
  var Waterfall, data, expect, waterfall;

  Waterfall = require('../dist/node/waterfall.js');

  expect = require('expect.js');

  data = [
    {
      name: 'Gross income',
      value: 30,
      absolute: true
    }, {
      name: 'Transport',
      value: -6
    }, {
      name: 'Distribution',
      value: -3
    }, {
      name: 'Detail income',
      absolute: true
    }, {
      name: 'Taxes',
      value: -8
    }, {
      name: 'Net income',
      absolute: true
    }
  ];

  waterfall = Waterfall({
    data: data,
    width: 300,
    height: 400,
    gutter: 15,
    compute: {
      myitem: function(i, d) {
        return d;
      },
      myindex: function(i, d) {
        return i;
      }
    }
  });

  describe('waterfall chart', function() {
    it('should generate as many sectors as data', function() {
      return expect(waterfall.curves).to.have.length(6);
    });
    it('should contain rectangles', function() {
      return expect(waterfall.curves[2].line.path.print()).to.match(/L [\d\.]+ [\d\.]+ L [\d\.]+ [\d\.]+ L [\d\.]+ [\d\.]+/);
    });
    it('should generate closed curves', function() {
      return expect(waterfall.curves[3].line.path.print()).to.match(/Z/);
    });
    it('should give access to the original items', function() {
      expect(waterfall.curves[1].item.name).to.be('Transport');
      return expect(waterfall.curves[3].item.name).to.be('Detail income');
    });
    return it('should allow custom computations', function() {
      expect(waterfall.curves[4].myitem).to.be(waterfall.curves[4].item);
      return expect(waterfall.curves[4].myindex).to.be(waterfall.curves[4].index);
    });
  });

}).call(this);
