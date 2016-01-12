define(['exports', 'module', './polygon'], function (exports, module, _polygon) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Polygon = _interopRequireDefault(_polygon);

  module.exports = function (_ref) {
    var left = _ref.left;
    var right = _ref.right;
    var top = _ref.top;
    var bottom = _ref.bottom;

    return (0, _Polygon['default'])({
      points: [[right, top], [right, bottom], [left, bottom], [left, top]],
      closed: true
    });
  };
});