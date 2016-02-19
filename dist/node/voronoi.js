"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Voronoi;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _polygon = require("./polygon");

var _polygon2 = _interopRequireDefault(_polygon);

var _fortune = require("./fortune");

var _fortune2 = _interopRequireDefault(_fortune);

function Voronoi(args) {
  //data, accessor, width, height, xrange, yrange, compute

  if (typeof args.accessor !== "function") {
    args.accessor = function (x) {
      return x;
    };
  };
  var xrange = args.xrange || [-1, 1];
  var yrange = args.yrange || [-1, 1];

  function enhance(compute, curve) {
    var obj = compute || {};
    for (var key in obj) {
      var method = obj[key];
      curve[key] = method(curve.index, curve.item, curve.group);
    };
    return curve;
  }

  function scale(iIn, iOut) {
    return function (x) {
      return iOut[0] + (iOut[1] - iOut[0]) * (x - iIn[0]) / (iIn[1] - iIn[0]);
    };
  }
  var sites = args.data.map(args.accessor);
  var xm = (xrange[0] + xrange[1]) / 2;
  var ym = (yrange[0] + yrange[1]) / 2;
  var diag = Math.sqrt(Math.pow(xrange[0] - xrange[1], 2) + Math.pow(yrange[0] - yrange[1], 2));
  var xscale = scale(xrange, [0, args.width]);
  var yscale = scale(yrange, [args.height, 0]);
  var k = 10;

  var closingPoints = [[k * (xrange[0] - diag), k * ym], [k * (xrange[1] + diag), k * ym], [k * xm, k * (yrange[0] - diag)], [k * xm, k * (yrange[1] + diag)]];

  var points = closingPoints.concat(sites);
  // var points = sites;
  console.log(points);

  var fortune = new _fortune2["default"](points);
  var patches = fortune.getPatches();
  var nodes = [];
  var curves = [];

  sites.forEach(function (site, i) {
    var scaledPatch = patches[site].map(function (vertex) {
      return [xscale(vertex[0]), yscale(vertex[1])];
    });
    nodes.push({
      point: [xscale(site[0]), yscale(site[1])],
      item: args.data[i]
    });
    curves.push(enhance(args.compute, {
      line: (0, _polygon2["default"])({
        points: scaledPatch,
        closed: true
      }),
      index: i,
      item: args.data[i]
    }));
  });

  return {
    curves: curves,
    nodes: nodes,
    xscale: xscale,
    yscale: yscale
  };
}

module.exports = exports["default"];