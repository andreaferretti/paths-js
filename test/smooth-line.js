(function() {
  var SmoothLine, Stock, chart, data, date, expect, params, round, round_vector;

  SmoothLine = require('../dist/node/smooth-line.js');

  Stock = require('../dist/node/stock.js');

  expect = require('expect.js');

  data = [
    [
      {
        year: 2012,
        month: 1,
        value: 13
      }, {
        year: 2012,
        month: 2,
        value: 12
      }, {
        year: 2012,
        month: 3,
        value: 15
      }, {
        year: 2012,
        month: 4,
        value: 10
      }, {
        year: 2012,
        month: 5,
        value: 9
      }, {
        year: 2012,
        month: 6,
        value: 8
      }, {
        year: 2012,
        month: 7,
        value: 11
      }, {
        year: 2012,
        month: 8,
        value: 10
      }, {
        year: 2012,
        month: 9,
        value: 13
      }, {
        year: 2012,
        month: 10,
        value: 13
      }, {
        year: 2012,
        month: 11,
        value: 12
      }, {
        year: 2012,
        month: 12,
        value: 9
      }, {
        year: 2013,
        month: 1,
        value: 12
      }, {
        year: 2013,
        month: 2,
        value: 15
      }, {
        year: 2013,
        month: 3,
        value: 16
      }, {
        year: 2013,
        month: 4,
        value: 14
      }
    ], [
      {
        year: 2012,
        month: 1,
        value: 21
      }, {
        year: 2012,
        month: 2,
        value: 22
      }, {
        year: 2012,
        month: 3,
        value: 22
      }, {
        year: 2012,
        month: 4,
        value: 20
      }, {
        year: 2012,
        month: 5,
        value: 19
      }, {
        year: 2012,
        month: 6,
        value: 18
      }, {
        year: 2012,
        month: 7,
        value: 22
      }, {
        year: 2012,
        month: 8,
        value: 19
      }, {
        year: 2012,
        month: 9,
        value: 19
      }, {
        year: 2012,
        month: 10,
        value: 18
      }, {
        year: 2012,
        month: 11,
        value: 16
      }, {
        year: 2012,
        month: 12,
        value: 15
      }, {
        year: 2013,
        month: 1,
        value: 16
      }, {
        year: 2013,
        month: 2,
        value: 18
      }, {
        year: 2013,
        month: 3,
        value: 19
      }, {
        year: 2013,
        month: 4,
        value: 18
      }
    ]
  ];

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

  date = function(data) {
    var d;
    d = new Date();
    d.setYear(data.year);
    d.setMonth(data.month - 1);
    return d.getTime();
  };

  params = {
    data: data,
    xaccessor: date,
    yaccessor: function(d) {
      return d.value;
    },
    width: 300,
    height: 200
  };

  chart = SmoothLine(params);

  describe('smooth line chart', function() {
    it('should generate as many points as data', function() {
      return expect(chart.curves[0].line.path.points()).to.have.length(data[0].length);
    });
    it('should generate both closed and open polygons', function() {
      var area, line;
      line = chart.curves[0].line;
      area = chart.curves[0].area;
      expect(line.path.print()).not.to.match(/Z/);
      return expect(area.path.print()).to.match(/Z/);
    });
    it('should generate closed and open polygons with the same points', function() {
      var area, line;
      line = chart.curves[0].line;
      area = chart.curves[0].area;
      return expect(area.path.points().slice(0, 16)).to.eql(line.path.points());
    });
    it('should close area paths with two additional points on the base', function() {
      var area, line;
      line = chart.curves[0].line;
      area = chart.curves[0].area;
      return expect(area.path.points().length).to.equal(line.path.points().length + 2);
    });
    it('should pass through the same points as the stock graph', function() {
      var area, area1, chart1, line, line1;
      line = chart.curves[0].line;
      area = chart.curves[0].area;
      chart1 = Stock(params);
      line1 = chart1.curves[0].line;
      area1 = chart1.curves[0].area;
      expect(area.path.points().map(function(x) {
        return round_vector(x);
      })).to.eql(area1.path.points().map(function(x) {
        return round_vector(x);
      }));
      return expect(line.path.points().map(function(x) {
        return round_vector(x);
      })).to.eql(line1.path.points().map(function(x) {
        return round_vector(x);
      }));
    });
    it('should give access to the original items', function() {
      return expect(chart.curves[1].item).to.be(data[1]);
    });
    return it('should allow custom computations', function() {
      var chart1;
      chart1 = SmoothLine({
        data: data,
        xaccessor: date,
        yaccessor: function(d) {
          return d.value;
        },
        width: 300,
        height: 200,
        compute: {
          myitem: function(i, d) {
            return d;
          },
          myindex: function(i, d) {
            return i;
          }
        }
      });
      expect(chart1.curves[1].myitem).to.be(chart1.curves[1].item);
      return expect(chart1.curves[1].myindex).to.be(chart1.curves[1].index);
    });
  });

  describe('smooth line chart scales', function() {
    it('should take into account all data involved', function() {
      var scale;
      scale = chart.yscale;
      expect(scale(8)).to.be(200);
      return expect(scale(22)).to.be(0);
    });
    return it('should take into account if 0 is to be displayed as a baseline', function() {
      var chart1, scale;
      chart1 = SmoothLine({
        data: data,
        xaccessor: date,
        yaccessor: function(d) {
          return d.value;
        },
        width: 300,
        height: 200,
        closed: true
      });
      scale = chart1.yscale;
      expect(scale(0)).to.be(200);
      return expect(scale(22)).to.be(0);
    });
  });

}).call(this);
