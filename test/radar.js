(function() {
  var Radar, data, expect;

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

  describe('radar chart', function() {
    return it('should generate as many polygons as data', function() {
      var radar;
      radar = Radar({
        data: data,
        center: [1, 1],
        r: 10
      });
      return expect(radar.polygons).to.have.length(data.length);
    });
  });

}).call(this);
