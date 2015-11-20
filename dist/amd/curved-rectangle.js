define(['exports', 'module', './path', './connector', './ops'], function (exports, module, _path, _connector, _ops) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Path = _interopRequireDefault(_path);

  var _Connector = _interopRequireDefault(_connector);

  module.exports = function (_ref) {
    var topleft = _ref.topleft;
    var topright = _ref.topright;
    var bottomleft = _ref.bottomleft;
    var bottomright = _ref.bottomright;

    var topCurve = (0, _Connector['default'])({ start: topleft, end: topright }).path;
    var bottomCurve = (0, _Connector['default'])({ start: bottomright, end: bottomleft }).path;
    var path = topCurve.connect(bottomCurve).closepath();
    var centroid = (0, _ops.average)([topleft, topright, bottomleft, bottomright]);

    return {
      path: path,
      centroid: centroid
    };
  };
});