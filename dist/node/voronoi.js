'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = Voronoi;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polygon = require('./polygon');

var _polygon2 = _interopRequireDefault(_polygon);

var _fortune = require('./fortune');

var _fortune2 = _interopRequireDefault(_fortune);

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

var _ops = require('./ops');

function Voronoi(args) {
  //data, accessor, width, height, xrange, yrange, compute
  if (typeof args.accessor !== "function") {
    args.accessor = function (x) {
      return x;
    };
  }
  var xrange = args.xrange || [-1, 1];
  var yrange = args.yrange || [-1, 1];

  // function scale(iIn, iOut) {
  //   return function(x){
  //     return iOut[0] + (iOut[1] - iOut[0]) * (x - iIn[0]) / (iIn[1] - iIn[0]);
  //   }
  // }
  var sites = args.data.map(args.accessor);
  var sq = function sq(x) {
    return x * x;
  };
  var xm = (xrange[0] + xrange[1]) / 2;
  var ym = (yrange[0] + yrange[1]) / 2;
  var diag = Math.sqrt(sq(xrange[0] - xrange[1]) + sq(yrange[0] - yrange[1]));
  var xscale = (0, _linear2['default'])(xrange, [0, args.width]);
  var yscale = (0, _linear2['default'])(yrange, [args.height, 0]);
  var k = 10;
  var closingPoints = [[k * (xrange[0] - diag), k * ym], [k * (xrange[1] + diag), k * ym], [k * xm, k * (yrange[0] - diag)], [k * xm, k * (yrange[1] + diag)]];
  var points = closingPoints.concat(sites);
  var fortune = new _fortune2['default'](points);
  var patches = fortune.getPatches();
  var nodes = [];
  var curves = [];

  sites.forEach(function (site, i) {
    var scaledPatch = patches[site].map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var x = _ref2[0];
      var y = _ref2[1];
      return [xscale(x), yscale(y)];
    });

    nodes.push({
      point: [xscale(site[0]), yscale(site[1])],
      item: args.data[i]
    });
    curves.push((0, _ops.enhance)(args.compute, {
      line: (0, _polygon2['default'])({
        points: scaledPatch,
        closed: true
      }),
      index: i,
      item: args.data[i]
    }));
  });

  return { curves: curves, nodes: nodes, xscale: xscale, yscale: yscale };
}

module.exports = exports['default'];