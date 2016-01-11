'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref5) {
  var data = _ref5.data;
  var xaccessor = _ref5.xaccessor;
  var yaccessor = _ref5.yaccessor;
  var width = _ref5.width;
  var height = _ref5.height;
  var closed = _ref5.closed;
  var min = _ref5.min;
  var max = _ref5.max;

  if (!xaccessor) {
    xaccessor = function xaccessor(_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2);

      var x = _ref7[0];
      var y = _ref7[1];
      return x;
    };
  }
  if (!yaccessor) {
    yaccessor = function yaccessor(_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2);

      var x = _ref9[0];
      var y = _ref9[1];
      return y;
    };
  }
  var f = function f(i) {
    return [xaccessor(i), yaccessor(i)];
  };
  var arranged = data.map(function (datum) {
    return box(datum, f);
  });

  var xmin = (0, _ops.minBy)(arranged, function (d) {
    return d.xmin;
  });
  var xmax = (0, _ops.maxBy)(arranged, function (d) {
    return d.xmax;
  });
  var ymin = min || (0, _ops.minBy)(arranged, function (d) {
    return d.ymin;
  });
  var ymax = max || (0, _ops.maxBy)(arranged, function (d) {
    return d.ymax;
  });
  if (closed) {
    ymin = Math.min(ymin, 0);
    ymax = Math.max(ymax, 0);
  }
  var base = closed ? 0 : ymin;
  var xscale = (0, _linear2.default)([xmin, xmax], [0, width]);
  var yscale = (0, _linear2.default)([ymin, ymax], [height, 0]);
  var scale = function scale(_ref10) {
    var _ref11 = _slicedToArray(_ref10, 2);

    var x = _ref11[0];
    var y = _ref11[1];
    return [xscale(x), yscale(y)];
  };

  return {
    arranged: arranged,
    scale: scale,
    xscale: xscale,
    yscale: yscale,
    base: base
  };
};

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

var _ops = require('./ops');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var epsilon = 1e-5;

var box = function box(datum, accessor) {
  var points = datum.map(accessor);
  var sorted = points.sort(function (_ref, _ref2) {
    var _ref4 = _slicedToArray(_ref, 2);

    var a = _ref4[0];
    var b = _ref4[1];

    var _ref3 = _slicedToArray(_ref2, 2);

    var c = _ref3[0];
    var d = _ref3[1];
    return a - c;
  });
  var l = sorted.length;
  var xmin = sorted[0][0];
  var xmax = sorted[l - 1][0];
  var ymin = (0, _ops.minBy)(sorted, function (p) {
    return p[1];
  });
  var ymax = (0, _ops.maxBy)(sorted, function (p) {
    return p[1];
  });
  if (xmin == xmax) {
    xmax += epsilon;
  }
  if (ymin == ymax) {
    ymax += epsilon;
  }

  return {
    points: sorted,
    xmin: xmin,
    xmax: xmax,
    ymin: ymin,
    ymax: ymax
  };
};