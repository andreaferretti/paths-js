(function() {
  var Bar, bar, data, expect, sum;

  Bar = require('../dist/node/bar.js');

  expect = require('expect.js');

  data = [[1, 3, 2, 4, 5, 6, 8], [3, 1, 1, 4, 1, 5, 7], [4, 9, 2, 2, 3, 5, 6], [5, 8, 1, 2, 6, 1, 6], [5, 7, 3, 3, 1, 1, 4]];

  sum = function(xs) {
    return xs.reduce((function(a, b) {
      return a + b;
    }), 0);
  };

  bar = Bar({
    data: data,
    width: 300,
    height: 400,
    gutter: 15
  });

  describe('bar chart', function() {
    it('should generate as many sectors as data', function() {
      return expect(bar.curves).to.have.length(sum(data.map(function(d) {
        return d.length;
      })));
    });
    it('should contain rectangle', function() {
      return expect(bar.curves[18].line.path.print()).to.match(/L \d+ \d+ L \d+ \d+ L \d+ \d+/);
    });
    it('should generate closed curves', function() {
      return expect(bar.curves[5].line.path.print()).to.match(/Z/);
    });
    it('should give access to the original items', function() {
      expect(bar.curves[13].item).to.be(data[3][2]);
      return expect(bar.curves[22].item).to.be(data[2][4]);
    });
    return it('should allow custom color functions', function() {
      var bar1, constant_color;
      constant_color = function() {
        return "#ffbb22";
      };
      bar1 = Bar({
        data: data,
        width: 300,
        height: 400,
        gutter: 15,
        colors: constant_color
      });
      return expect(bar1.curves[14].color).to.be("#ffbb22");
    });
  });

  describe('bar chart scale', function() {
    return it('should take into account all data involved', function() {
      expect(bar.scale(9)).to.be(0);
      return expect(bar.scale(0)).to.be(400);
    });
  });

}).call(this);
