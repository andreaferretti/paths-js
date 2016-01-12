define(['exports', 'module', './polygon', './ops'], function (exports, module, _polygon, _ops) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Polygon = _interopRequireDefault(_polygon);

  module.exports = function (_ref) {
    var center = _ref.center;
    var radii = _ref.radii;

    var angle = 2 * Math.PI / radii.length;
    var points = radii.map(function (r, i) {
      return (0, _ops.plus)(center, (0, _ops.onCircle)(r, i * angle));
    });

    return (0, _Polygon['default'])({
      points: points,
      closed: true
    });
  };
});