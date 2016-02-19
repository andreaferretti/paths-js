define(["exports", "module"], function (exports, module) {
  "use strict";

  var _exports = {};

  function distPointToPoint(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
  }
  _exports.distPointToPoint = distPointToPoint;

  function distPointToParabol(a, f) {
    var p = distPointToPoint(a, f);
    return p == 0 ? Infinity : Math.pow(p, 2) / (2 * Math.abs(a[1] - f[1]));
  }
  _exports.distPointToParabol = distPointToParabol;

  function circumCenter(a, b, c) {
    var d = (a[0] - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (a[1] - c[1]);
    if (d == 0) return [Infinity, Infinity];
    var xc = (((a[0] - c[0]) * (a[0] + c[0]) + (a[1] - c[1]) * (a[1] + c[1])) / 2 * (b[1] - c[1]) - ((b[0] - c[0]) * (b[0] + c[0]) + (b[1] - c[1]) * (b[1] + c[1])) / 2 * (a[1] - c[1])) / d;
    var yc = (((b[0] - c[0]) * (b[0] + c[0]) + (b[1] - c[1]) * (b[1] + c[1])) / 2 * (a[0] - c[0]) - ((a[0] - c[0]) * (a[0] + c[0]) + (a[1] - c[1]) * (a[1] + c[1])) / 2 * (b[0] - c[0])) / d;
    return [xc, yc];
  }
  _exports.circumCenter = circumCenter;

  function parabolsCrossX(fa, fb, q) {
    if (fa[1] === fb[1]) return [(fa[0] + fb[0]) / 2, (fa[0] + fb[0]) / 2];
    var s1 = (fa[1] * fb[0] - fa[0] * fb[1] + fa[0] * q - fb[0] * q + Math.sqrt((fa[0] * fa[0] + fa[1] * fa[1] - 2 * fa[0] * fb[0] + fb[0] * fb[0] - 2 * fa[1] * fb[1] + fb[1] * fb[1]) * (fa[1] * fb[1] - fa[1] * q - fb[1] * q + q * q))) / (fa[1] - fb[1]);
    var s2 = (fa[1] * fb[0] - fa[0] * fb[1] + fa[0] * q - fb[0] * q - Math.sqrt((fa[0] * fa[0] + fa[1] * fa[1] - 2 * fa[0] * fb[0] + fb[0] * fb[0] - 2 * fa[1] * fb[1] + fb[1] * fb[1]) * (fa[1] * fb[1] - fa[1] * q - fb[1] * q + q * q))) / (fa[1] - fb[1]);
    return s1 < s2 ? [s1, s2] : [s2, s1];
  }
  _exports.parabolsCrossX = parabolsCrossX;

  function doHalflinesCross(sa, sb, approx) {
    //sa, sb are Segment instance
    var approx = approx || 1e-10;
    var dx = sb.ps[0] - sa.ps[0];
    var dy = sb.ps[1] - sa.ps[1];
    if (sa.m == Infinity) return sa.hp * (sb.m * dx - dy) <= approx && sb.vec[0] * dx <= approx;
    if (sb.m == Infinity) return sb.hp * (sa.m * dx - dy) >= -approx && sa.vec[0] * dx >= -approx;
    var det = sb.vec[0] * sa.vec[1] - sb.vec[1] * sa.vec[0];
    if (det === 0) return false;
    var u = (dy * sb.vec[0] - dx * sb.vec[1]) / det;
    var v = (dy * sa.vec[0] - dx * sa.vec[1]) / det;
    return u >= -approx && v >= approx || u >= approx && v >= -approx;
  }
  _exports.doHalflinesCross = doHalflinesCross;

  module.exports = _exports;
});