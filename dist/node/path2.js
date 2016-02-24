'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var Path = function Path() {
  var string = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

  var _points = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var push = function push(arr, el) {
    var copy = arr.slice(0, arr.length);
    copy.push(el);
    return copy;
  };

  var areEqualPoints = function areEqualPoints(_ref, _ref3) {
    var _ref2 = _slicedToArray(_ref, 2);

    var a1 = _ref2[0];
    var b1 = _ref2[1];

    var _ref32 = _slicedToArray(_ref3, 2);

    var a2 = _ref32[0];
    var b2 = _ref32[1];
    return a1 === a2 && b1 === b2;
  };

  var trimZeros = function trimZeros(string, char) {
    var l = string.length;
    while (string.charAt(l - 1) === '0') {
      l = l - 1;
    }
    if (string.charAt(l - 1) === '.') {
      l = l - 1;
    }
    return string.substr(0, l);
  };

  var round = function round(number) {
    var digits = arguments.length <= 1 || arguments[1] === undefined ? 6 : arguments[1];

    var str = number.toFixed(digits);
    return trimZeros(str);
  };

  var printInstrunction = function printInstrunction(command, params) {
    var numbers = Array.prototype.map.call(params, function (param) {
      return round(param, 6);
    });
    return command + ' ' + numbers.join(' ');
  };

  var last = function last() {
    return _points[_points.length - 1];
  };

  var svg = function svg(letter, keys, f) {
    return function (a) {
      var mutable = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var args = typeof a === 'object' ? keys.map(function (k) {
        return a[k];
      }) : arguments;
      var p = f.apply(null, args);
      var s = printInstrunction(letter, args);

      if (mutable) {
        string += ' ' + s;
        if (p) {
          _points += p;
        }
        return Path(string, _points);
      } else {
        var string_ = string + ' ' + s;
        var points_ = p ? push(_points, p) : _points;
        return Path(string_, points_);
      }
    };
  };

  return {
    moveto: svg('M', ['x', 'y'], function (x, y) {
      return [x, y];
    }),
    lineto: svg('L', ['x', 'y'], function (x, y) {
      return [x, y];
    }),
    hlineto: svg('H', ['x'], function (x) {
      return [x, last()[1]];
    }),
    vlineto: svg('V', ['y'], function (y) {
      return [last()[0], y];
    }),
    closepath: svg('Z', [], function () {
      return null;
    }),
    curveto: svg('C', ['x1', 'y1', 'x2', 'y2', 'x', 'y'], function (x1, y1, x2, y2, x, y) {
      return [x, y];
    }),
    smoothcurveto: svg('S', ['x2', 'y2', 'x', 'y'], function (x2, y2, x, y) {
      return [x, y];
    }),
    qcurveto: svg('Q', ['x1', 'y1', 'x', 'y'], function (x1, y1, x, y) {
      return [x, y];
    }),
    smoothqcurveto: svg('T', ['x', 'y'], function (x, y) {
      return [x, y];
    }),
    arc: svg('A', ['rx', 'ry', 'xrot', 'largeArcFlag', 'sweepFlag', 'x', 'y'], function (rx, ry, xrot, largeArcFlag, sweepFlag, x, y) {
      return [x, y];
    }),
    print: function print() {
      return '' + string;
    },
    points: function points() {
      return _points.slice(0);
    },
    connect: function connect(path) {
      var ps = path.points();
      var newS = path.print();
      if (areEqualPoints(last(), ps[0])) {
        ps.shift();
      }
      return Path(string + ' ' + s, _points.concat(ps));
    }
  };
};

exports['default'] = function () {
  return Path();
};

module.exports = exports['default'];