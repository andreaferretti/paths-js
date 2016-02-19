"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var sq = function sq(x) {
  return x * x;
};

var distPointToPoint = function distPointToPoint(_ref, _ref3) {
  var _ref2 = _slicedToArray(_ref, 2);

  var ax = _ref2[0];
  var ay = _ref2[1];

  var _ref32 = _slicedToArray(_ref3, 2);

  var bx = _ref32[0];
  var by = _ref32[1];
  return Math.sqrt(sq(ax - bx) + sq(ay - by));
};

var distPointToParabol = function distPointToParabol(a, f) {
  var p = distPointToPoint(a, f);

  return p == 0 ? Infinity : sq(p) / (2 * Math.abs(a[1] - f[1]));
};

var circumCenter = function circumCenter(a, b, c) {
  var d = (a[0] - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (a[1] - c[1]);

  if (d == 0) return [Infinity, Infinity];

  var xc = (((a[0] - c[0]) * (a[0] + c[0]) + (a[1] - c[1]) * (a[1] + c[1])) / 2 * (b[1] - c[1]) - ((b[0] - c[0]) * (b[0] + c[0]) + (b[1] - c[1]) * (b[1] + c[1])) / 2 * (a[1] - c[1])) / d;
  var yc = (((b[0] - c[0]) * (b[0] + c[0]) + (b[1] - c[1]) * (b[1] + c[1])) / 2 * (a[0] - c[0]) - ((a[0] - c[0]) * (a[0] + c[0]) + (a[1] - c[1]) * (a[1] + c[1])) / 2 * (b[0] - c[0])) / d;
  return [xc, yc];
};

var parabolsCrossX = function parabolsCrossX(fa, fb, q) {
  if (fa[1] === fb[1]) return [(fa[0] + fb[0]) / 2, (fa[0] + fb[0]) / 2];

  var s1 = (fa[1] * fb[0] - fa[0] * fb[1] + fa[0] * q - fb[0] * q + Math.sqrt((fa[0] * fa[0] + fa[1] * fa[1] - 2 * fa[0] * fb[0] + fb[0] * fb[0] - 2 * fa[1] * fb[1] + fb[1] * fb[1]) * (fa[1] * fb[1] - fa[1] * q - fb[1] * q + q * q))) / (fa[1] - fb[1]);
  var s2 = (fa[1] * fb[0] - fa[0] * fb[1] + fa[0] * q - fb[0] * q - Math.sqrt((fa[0] * fa[0] + fa[1] * fa[1] - 2 * fa[0] * fb[0] + fb[0] * fb[0] - 2 * fa[1] * fb[1] + fb[1] * fb[1]) * (fa[1] * fb[1] - fa[1] * q - fb[1] * q + q * q))) / (fa[1] - fb[1]);

  return s1 < s2 ? [s1, s2] : [s2, s1];
};

var doHalflinesCross = function doHalflinesCross(sa, sb) {
  var approx = arguments.length <= 2 || arguments[2] === undefined ? 1e-10 : arguments[2];
  //sa, sb are Segment instance
  var dx = sb.ps[0] - sa.ps[0];
  var dy = sb.ps[1] - sa.ps[1];

  if (sa.m == Infinity) return sa.hp * (sb.m * dx - dy) <= approx && sb.vec[0] * dx <= approx;
  if (sb.m == Infinity) return sb.hp * (sa.m * dx - dy) >= -approx && sa.vec[0] * dx >= -approx;

  var det = sb.vec[0] * sa.vec[1] - sb.vec[1] * sa.vec[0];

  if (det === 0) return false;

  var u = (dy * sb.vec[0] - dx * sb.vec[1]) / det;
  var v = (dy * sa.vec[0] - dx * sa.vec[1]) / det;

  return u >= -approx && v >= approx || u >= approx && v >= -approx;
};

exports["default"] = { distPointToPoint: distPointToPoint, distPointToParabol: distPointToParabol, circumCenter: circumCenter,
  parabolsCrossX: parabolsCrossX, doHalflinesCross: doHalflinesCross };
module.exports = exports["default"];