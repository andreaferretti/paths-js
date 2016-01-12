define(['exports', 'module', './polygon', './line-chart-comp', './ops'], function (exports, module, _polygon, _lineChartComp, _ops) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Polygon = _interopRequireDefault(_polygon);

  var _comp2 = _interopRequireDefault(_lineChartComp);

  module.exports = function (options) {
    var _comp = (0, _comp2['default'])(options);

    var arranged = _comp.arranged;
    var scale = _comp.scale;
    var xscale = _comp.xscale;
    var yscale = _comp.yscale;
    var base = _comp.base;

    var i = -1;

    var polygons = arranged.map(function (_ref) {
      var points = _ref.points;
      var xmin = _ref.xmin;
      var xmax = _ref.xmax;

      var scaledPoints = points.map(scale);
      points.push([xmax, base]);
      points.push([xmin, base]);
      var scaledPointsClosed = points.map(scale);
      i += 1;

      return (0, _ops.enhance)(options.compute, {
        item: options.data[i],
        line: (0, _Polygon['default'])({
          points: scaledPoints,
          closed: false
        }),
        area: (0, _Polygon['default'])({
          points: scaledPointsClosed,
          closed: true
        }),
        index: i
      });
    });

    return {
      curves: polygons,
      xscale: xscale,
      yscale: yscale
    };
  };
});