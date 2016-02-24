'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path2 = require('./path2');

var _path22 = _interopRequireDefault(_path2);

var _ops = require('./ops');

exports['default'] = function (_ref) {
  var center = _ref.center;
  var r = _ref.r;
  var R = _ref.R;
  var start = _ref.start;
  var end = _ref.end;

  var a = (0, _ops.plus)(center, (0, _ops.onCircle)(R, start));
  var b = (0, _ops.plus)(center, (0, _ops.onCircle)(R, end));
  var c = (0, _ops.plus)(center, (0, _ops.onCircle)(r, end));
  var d = (0, _ops.plus)(center, (0, _ops.onCircle)(r, start));

  var large = end - start > Math.PI ? 1 : 0;

  var path = (0, _path22['default'])().moveto({ x: a[0], y: a[1] }, true).arc({ rx: R, ry: R, xrot: 0, largeArcFlag: large, sweepFlag: 1, x: b[0], y: b[1] }, true).lineto({ x: c[0], y: c[1] }, true).arc({ rx: r, ry: r, xrot: 0, largeArcFlag: large, sweepFlag: 0, x: d[0], y: d[1] }, true).closepath(null, true);

  var midAngle = (start + end) / 2;
  var midRadius = (r + R) / 2;
  var centroid = (0, _ops.plus)(center, (0, _ops.onCircle)(midRadius, midAngle));

  return {
    path: path,
    centroid: centroid
  };
};

module.exports = exports['default'];