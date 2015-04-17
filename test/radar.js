(function() {
  var Radar, data, expect, key_accessor;

  Radar = require('../dist/node/radar.js');

  expect = require('expect.js');

  data = [
    {
      hp: 45,
      attack: 49,
      defense: 49,
      sp_attack: 65,
      sp_defense: 65,
      speed: 45
    }, {
      hp: 60,
      attack: 62,
      defense: 63,
      sp_attack: 80,
      sp_defense: 80,
      speed: 60
    }, {
      hp: 80,
      attack: 82,
      defense: 83,
      sp_attack: 100,
      sp_defense: 100,
      speed: 80
    }, {
      hp: 45,
      attack: 25,
      defense: 50,
      sp_attack: 25,
      sp_defense: 25,
      speed: 35
    }, {
      hp: 58,
      attack: 64,
      defense: 58,
      sp_attack: 80,
      sp_defense: 65,
      speed: 80
    }, {
      hp: 44,
      attack: 48,
      defense: 65,
      sp_attack: 50,
      sp_defense: 64,
      speed: 43
    }, {
      hp: 79,
      attack: 83,
      defense: 100,
      sp_attack: 85,
      sp_defense: 105,
      speed: 78
    }, {
      hp: 60,
      attack: 45,
      defense: 50,
      sp_attack: 90,
      sp_defense: 80,
      speed: 70
    }
  ];

  key_accessor = function(keys) {
    var a, fn, j, key, len;
    a = {};
    fn = function(k) {
      return a[k] = function(o) {
        return o[k];
      };
    };
    for (j = 0, len = keys.length; j < len; j++) {
      key = keys[j];
      fn(key);
    }
    return a;
  };

  describe('radar chart', function() {
    it('should generate as many polygons as data', function() {
      var radar;
      radar = Radar({
        data: data,
        center: [1, 1],
        r: 10
      });
      return expect(radar.curves).to.have.length(data.length);
    });
    it('should generate closed polygons', function() {
      var radar;
      radar = Radar({
        data: data,
        center: [1, 1],
        r: 10
      });
      return expect(radar.curves[4].polygon.path.print()).to.match(/Z/);
    });
    it('should have by default as many sides as data properties', function() {
      var radar;
      radar = Radar({
        data: data,
        center: [1, 1],
        r: 10
      });
      return expect(radar.curves[0].polygon.path.points()).to.have.length(6);
    });
    it('should use the given key accessor', function() {
      var radar;
      radar = Radar({
        data: data,
        accessor: key_accessor(['attack', 'defense', 'speed']),
        center: [1, 1],
        r: 10
      });
      return expect(radar.curves[0].polygon.path.points()).to.have.length(3);
    });
    it('should give access to the original items', function() {
      var radar;
      radar = Radar({
        data: data,
        center: [1, 1],
        r: 10
      });
      return expect(radar.curves[3].item).to.be(data[3]);
    });
    return it('should allow custom computations', function() {
      var radar;
      radar = Radar({
        data: data,
        center: [1, 1],
        r: 10,
        compute: {
          myitem: function(i, d) {
            return d;
          },
          myindex: function(i, d) {
            return i;
          }
        }
      });
      expect(radar.curves[3].myitem).to.be(radar.curves[3].item);
      return expect(radar.curves[3].myindex).to.be(radar.curves[3].index);
    });
  });

  describe('radar chart rings', function() {
    it('should be as many as specified', function() {
      var radar;
      radar = Radar({
        data: data,
        center: [1, 1],
        r: 5,
        rings: 4
      });
      return expect(radar.rings).to.have.length(4);
    });
    it('should be centered at the given center', function() {
      var radar;
      radar = Radar({
        data: data,
        center: [2, 3],
        r: 5
      });
      return expect(radar.rings[0].centroid).to.eql([2, 3]);
    });
    return it('should enclose the given chart', function() {
      var radar;
      radar = Radar({
        data: data,
        center: [0, 0],
        rings: 3,
        r: 5
      });
      return expect(radar.rings[2].path.points()[0]).to.eql([0, -5]);
    });
  });

}).call(this);
