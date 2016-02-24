'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path2 = require('./path2');

var _path22 = _interopRequireDefault(_path2);

var _ops = require('./ops');

exports['default'] = function (_ref) {
  var points = _ref.points;
  var closed = _ref.closed;

  var l = points.length;

  var _points$0 = _slicedToArray(points[0], 2);

  var a = _points$0[0];
  var b = _points$0[1];

  var tail = points.slice(1, l + 1);
  var path = tail.reduce(function (pt, _ref2) {
    var _ref22 = _slicedToArray(_ref2, 2);

    var c = _ref22[0];
    var d = _ref22[1];
    return pt.lineto({ x: c, y: d }, true);
  }, (0, _path22['default'])().moveto({ x: a, y: b }, true));

  return {
    path: closed ? path.closepath(null, true) : path,
    centroid: (0, _ops.average)(points)
  };
};

module.exports = exports['default'];