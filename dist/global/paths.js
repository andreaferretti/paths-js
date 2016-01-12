(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bar = require('./bar');

var _bar2 = _interopRequireDefault(_bar);

var _bezier = require('./bezier');

var _bezier2 = _interopRequireDefault(_bezier);

var _connector = require('./connector');

var _connector2 = _interopRequireDefault(_connector);

var _curvedRectangle = require('./curved-rectangle');

var _curvedRectangle2 = _interopRequireDefault(_curvedRectangle);

var _graph = require('./graph');

var _graph2 = _interopRequireDefault(_graph);

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _pie = require('./pie');

var _pie2 = _interopRequireDefault(_pie);

var _polygon = require('./polygon');

var _polygon2 = _interopRequireDefault(_polygon);

var _radar = require('./radar');

var _radar2 = _interopRequireDefault(_radar);

var _rectangle = require('./rectangle');

var _rectangle2 = _interopRequireDefault(_rectangle);

var _sankey = require('./sankey');

var _sankey2 = _interopRequireDefault(_sankey);

var _sector = require('./sector');

var _sector2 = _interopRequireDefault(_sector);

var _semiRegularPolygon = require('./semi-regular-polygon');

var _semiRegularPolygon2 = _interopRequireDefault(_semiRegularPolygon);

var _smoothLine = require('./smooth-line');

var _smoothLine2 = _interopRequireDefault(_smoothLine);

var _stock = require('./stock');

var _stock2 = _interopRequireDefault(_stock);

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

var _waterfall = require('./waterfall');

var _waterfall2 = _interopRequireDefault(_waterfall);

window.Paths = {
  Bar: _bar2['default'],
  Bezier: _bezier2['default'],
  Connector: _connector2['default'],
  CurvedRectangle: _curvedRectangle2['default'],
  Graph: _graph2['default'],
  Linear: _linear2['default'],
  Path: _path2['default'],
  Pie: _pie2['default'],
  Polygon: _polygon2['default'],
  Radar: _radar2['default'],
  Rectangle: _rectangle2['default'],
  Sankey: _sankey2['default'],
  Sector: _sector2['default'],
  SemiRegularPolygon: _semiRegularPolygon2['default'],
  SmoothLine: _smoothLine2['default'],
  Stock: _stock2['default'],
  Tree: _tree2['default'],
  Waterfall: _waterfall2['default']
};
},{"./bar":2,"./bezier":4,"./connector":5,"./curved-rectangle":6,"./graph":7,"./linear":9,"./path":11,"./pie":12,"./polygon":13,"./radar":14,"./rectangle":15,"./sankey":16,"./sector":17,"./semi-regular-polygon":18,"./smooth-line":19,"./stock":20,"./tree":22,"./waterfall":23}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

var _rectangle = require('./rectangle');

var _rectangle2 = _interopRequireDefault(_rectangle);

var _ops = require('./ops');

exports['default'] = function (_ref) {
  var data = _ref.data;
  var accessor = _ref.accessor;
  var width = _ref.width;
  var height = _ref.height;
  var _ref$gutter = _ref.gutter;
  var gutter = _ref$gutter === undefined ? 10 : _ref$gutter;
  var compute = _ref.compute;

  if (accessor == null) {
    accessor = function (x) {
      return x;
    };
  }
  var groups = [];
  var min = 0;
  var max = 0;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var i = _step$value[0];
      var d = _step$value[1];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = d.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2);

          var j = _step3$value[0];
          var el = _step3$value[1];

          var val = accessor(el);
          if (val < min) {
            min = val;
          }
          if (val > max) {
            max = val;
          }
          if (groups[j] == null) {
            groups[j] = [];
          }
          groups[j][i] = val;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var n = groups.length;
  var groupWidth = (width - gutter * (n - 1)) / n;
  var curves = [];
  var scale = (0, _linear2['default'])([min, max], [height, 0]);

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = groups.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 2);

      var i = _step2$value[0];
      var g = _step2$value[1];

      var w = groupWidth / g.length;
      var shift = (groupWidth + gutter) * i;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = g.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _step4$value = _slicedToArray(_step4.value, 2);

          var j = _step4$value[0];
          var el = _step4$value[1];

          var left = shift + w * j;
          var right = left + w;
          var bottom = scale(0);
          var _top = scale(el);
          var line = (0, _rectangle2['default'])({ left: left, right: right, bottom: bottom, top: _top });
          curves.push((0, _ops.enhance)(compute, {
            item: data[j][i],
            line: line,
            index: j
          }));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4['return']) {
            _iterator4['return']();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return {
    curves: curves,
    scale: scale
  };
};

module.exports = exports['default'];
},{"./linear":9,"./ops":10,"./rectangle":15}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _ops = require('./ops');

var average = function average(body1, body2) {
  var mass = body1.mass + body2.mass;
  var point = (0, _ops.times)(1 / mass, (0, _ops.plus)((0, _ops.times)(body1.mass, body1.point), (0, _ops.times)(body2.mass, body2.point)));
  return [point, mass];
};

var locate = function locate(_ref, quadrants) {
  var _ref2 = _slicedToArray(_ref, 2);

  var x = _ref2[0];
  var y = _ref2[1];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = quadrants[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var q = _step.value;
      var _q$box = q.box;
      var _top = _q$box.top;
      var bottom = _q$box.bottom;
      var left = _q$box.left;
      var right = _q$box.right;

      if (left <= x && x <= right && bottom <= y && y <= _top) {
        return q;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var makeQuadrant = function makeQuadrant(_ref3, _ref4) {
  var top = _ref3.top;
  var bottom = _ref3.bottom;
  var left = _ref3.left;
  var right = _ref3.right;

  var _ref42 = _slicedToArray(_ref4, 2);

  var a = _ref42[0];
  var b = _ref42[1];

  var halfwayV = (left + right) / 2;
  var halfwayH = (top + bottom) / 2;

  return {
    box: {
      top: b ? halfwayH : top,
      bottom: b ? bottom : halfwayH,
      left: a ? halfwayV : left,
      right: a ? right : halfwayV
    }
  };
};

var subdivide = function subdivide(_ref5) {
  var box = _ref5.box;
  return [makeQuadrant(box, [0, 0]), makeQuadrant(box, [1, 0]), makeQuadrant(box, [0, 1]), makeQuadrant(box, [1, 1])];
};

var addBody = function addBody(root, body) {
  if (root.body) {
    var oldBody = root.body;
    delete root.body;
    root.children = subdivide(root);
    addBody(root, oldBody);
    addBody(root, body);
  } else {
    if (root.children) {
      var child = locate(body.point, root.children);

      var _ref6 = root.point ? average(root, body) : [body.point, body.mass];

      var _ref62 = _slicedToArray(_ref6, 2);

      var p = _ref62[0];
      var m = _ref62[1];

      root.point = p;
      root.mass = m;
      addBody(child, body);
    } else {
      root.body = body;
    }
  }
};

var makeTree = function makeTree(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    var bodies = _x,
        root = _x2;
    _again = false;

    if (bodies.length === 0) {
      return root;
    } else {
      var body = bodies.shift();
      addBody(root, body);
      _x = bodies;
      _x2 = root;
      _again = true;
      body = undefined;
      continue _function;
    }
  }
};

var makeBodies = function makeBodies(positions) {
  return (0, _ops.mapObject)(positions, function (id, position) {
    return { id: id, point: position, mass: 1 };
  });
};

var makeRoot = function makeRoot(width, height) {
  return {
    box: {
      top: height,
      bottom: 0,
      left: 0,
      right: width
    }
  };
};

var walkLeaves = function walkLeaves(tree, f) {
  if (tree.body) {
    f(tree);
  } else {
    if (tree.children) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = tree.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var child = _step2.value;

          walkLeaves(child, f);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }
};

var bodyForceOn = function bodyForceOn(b1, b2, repulsion) {
  var segment = (0, _ops.minus)(b1.point, b2.point);
  var d = (0, _ops.length)(segment);
  return (0, _ops.times)(repulsion * b1.mass * b2.mass / (d * d * d), segment);
};

var boxWidth = function boxWidth(_ref7) {
  var top = _ref7.top;
  var bottom = _ref7.bottom;
  var left = _ref7.left;
  var right = _ref7.right;
  return (0, _ops.length)([top - bottom, right - left]);
};

var forceOn = function forceOn(leaf, tree, repulsion, threshold) {
  if (tree === leaf) {
    return [0, 0];
  } else if (tree.body) {
    return bodyForceOn(leaf.body, tree.body, repulsion);
  } else if (tree.point) {
    var s = boxWidth(tree.box);
    var d = (0, _ops.length)((0, _ops.minus)(leaf.body.point, tree.point));

    if (s / d < threshold) {
      return bodyForceOn(leaf.body, tree, repulsion);
    } else return (0, _ops.sumVectors)(tree.children.map(function (c) {
      return forceOn(leaf, c, repulsion, threshold);
    }));
  } else return [0, 0];
};

var repulsiveForces = function repulsiveForces(tree, repulsion, threshold) {
  var forces = {};
  walkLeaves(tree, function (leaf) {
    forces[leaf.body.id] = forceOn(leaf, tree, repulsion, threshold);
  });
  return forces;
};

exports.tree = makeTree;
exports.bodies = makeBodies;
exports.root = makeRoot;
exports.forces = repulsiveForces;
exports['default'] = {
  tree: makeTree,
  bodies: makeBodies,
  root: makeRoot,
  forces: repulsiveForces
};
},{"./ops":10}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _polygon = require('./polygon');

var _polygon2 = _interopRequireDefault(_polygon);

var _ops = require('./ops');

var reflect = function reflect(p, q) {
  return (0, _ops.minus)((0, _ops.times)(2, p), q);
};

exports['default'] = function (_ref) {
  var _Path;

  var points = _ref.points;
  var tension = _ref.tension;

  tension = tension || 0.3;
  var diffs = [];
  var l = points.length;
  if (l <= 2) {
    return (0, _polygon2['default'])({ points: points });
  }
  for (var i = 1; i <= l - 1; i++) {
    diffs.push((0, _ops.times)(tension, (0, _ops.minus)(points[i], points[i - 1])));
  }
  var controlPoints = [(0, _ops.plus)(points[0], reflect(diffs[0], diffs[1]))];
  for (var i = 1; i <= l - 2; i++) {
    controlPoints.push((0, _ops.minus)(points[i], (0, _ops.average)([diffs[i], diffs[i - 1]])));
  }
  controlPoints.push((0, _ops.minus)(points[l - 1], reflect(diffs[l - 2], diffs[l - 3])));
  var c0 = controlPoints[0];
  var c1 = controlPoints[1];
  var p0 = points[0];
  var p1 = points[1];
  var path = (_Path = (0, _path2['default'])()).moveto.apply(_Path, _toConsumableArray(p0)).curveto(c0[0], c0[1], c1[0], c1[1], p1[0], p1[1]);

  return {
    path: (0, _ops.range)(2, l).reduce(function (pt, i) {
      var c = controlPoints[i];
      var p = points[i];
      return pt.smoothcurveto(c[0], c[1], p[0], p[1]);
    }, path),
    centroid: (0, _ops.average)(points)
  };
};

module.exports = exports['default'];
},{"./ops":10,"./path":11,"./polygon":13}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _ops = require('./ops');

exports['default'] = function (_ref) {
  var _Path$moveto$lineto$curveto, _Path$moveto, _Path;

  var start = _ref.start;
  var end = _ref.end;
  var tension = _ref.tension;

  if (tension == null) {
    tension = 0.05;
  }

  var _start = _slicedToArray(start, 2);

  var a = _start[0];
  var b = _start[1];

  var _end = _slicedToArray(end, 2);

  var c = _end[0];
  var d = _end[1];

  var length = (c - a) * tension;
  var mid1 = [a + length, b];
  var mid2 = [c - length, d];

  return {
    path: (_Path$moveto$lineto$curveto = (_Path$moveto = (_Path = (0, _path2['default'])()).moveto.apply(_Path, _toConsumableArray(start))).lineto.apply(_Path$moveto, mid1).curveto(a + 5 * length, b, c - 5 * length, d, c - length, d)).lineto.apply(_Path$moveto$lineto$curveto, _toConsumableArray(end)),
    centroid: (0, _ops.average)([start, end])
  };
};

module.exports = exports['default'];
},{"./ops":10,"./path":11}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _connector = require('./connector');

var _connector2 = _interopRequireDefault(_connector);

var _ops = require('./ops');

exports['default'] = function (_ref) {
  var topleft = _ref.topleft;
  var topright = _ref.topright;
  var bottomleft = _ref.bottomleft;
  var bottomright = _ref.bottomright;

  var topCurve = (0, _connector2['default'])({ start: topleft, end: topright }).path;
  var bottomCurve = (0, _connector2['default'])({ start: bottomright, end: bottomleft }).path;
  var path = topCurve.connect(bottomCurve).closepath();
  var centroid = (0, _ops.average)([topleft, topright, bottomleft, bottomright]);

  return {
    path: path,
    centroid: centroid
  };
};

module.exports = exports['default'];
},{"./connector":5,"./ops":10,"./path":11}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polygon = require('./polygon');

var _polygon2 = _interopRequireDefault(_polygon);

var _ops = require('./ops');

var _barnesHut = require('./barnes-hut');

var _barnesHut2 = _interopRequireDefault(_barnesHut);

var randomPosition = function randomPosition(w, h) {
  return [Math.random() * w, Math.random() * h];
};

var cap = function cap(bound, x) {
  return Math.min(Math.max(x, 0), bound);
};

var inside = function inside(w, h) {
  return function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var x = _ref2[0];
    var y = _ref2[1];
    return [cap(w, x), cap(h, y)];
  };
};

var attractiveForces = function attractiveForces(links, positions, attraction) {
  var forces = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(links)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var id = _step.value;
      var _links$id = links[id];
      var start = _links$id.start;
      var end = _links$id.end;
      var weight = _links$id.weight;

      var pos1 = positions[start];
      var pos2 = positions[end];
      var force = (0, _ops.times)(attraction * weight, (0, _ops.minus)(pos1, pos2));
      if (!forces[start]) {
        forces[start] = [0, 0];
      }
      if (!forces[end]) {
        forces[end] = [0, 0];
      }
      forces[start] = (0, _ops.minus)(forces[start], force);
      forces[end] = (0, _ops.plus)(forces[end], force);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return forces;
};

exports['default'] = function (_ref3) {
  var data = _ref3.data;
  var nodeaccessor = _ref3.nodeaccessor;
  var linkaccessor = _ref3.linkaccessor;
  var width = _ref3.width;
  var height = _ref3.height;
  var attraction = _ref3.attraction;
  var repulsion = _ref3.repulsion;
  var threshold = _ref3.threshold;

  var identity = function identity(x) {
    return x;
  };
  if (!nodeaccessor) {
    nodeaccessor = identity;
  }
  if (!linkaccessor) {
    linkaccessor = identity;
  }
  attraction = attraction || 1;
  repulsion = repulsion || 1;
  threshold = threshold || 0.5;
  var bound = inside(width, height);

  var nodes = data.nodes;
  var links = data.links;
  var constraints = data.constraints;

  if (!constraints) {
    constraints = {};
  }
  var nodesPositions = {};
  var nodes_ = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var node = _step2.value;

      var id = nodeaccessor(node);
      nodesPositions[id] = constraints[id] || randomPosition(width, height);
      nodes_[id] = node;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var links_ = {};

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = links[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var link = _step3.value;

      var _linkaccessor = linkaccessor(link);

      var start = _linkaccessor.start;
      var end = _linkaccessor.end;
      var weight = _linkaccessor.weight;

      links_[start + '|' + end] = { weight: weight, start: start, end: end, link: link };
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var tick = function tick() {
    var bodies = _barnesHut2['default'].bodies(nodesPositions);
    var root = _barnesHut2['default'].root(width, height);
    var tree = _barnesHut2['default'].tree(bodies, root);
    var attractions = attractiveForces(links_, nodesPositions, attraction / 1000);
    var repulsions = _barnesHut2['default'].forces(tree, repulsion * 1000, threshold);
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = Object.keys(nodesPositions)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var id = _step4.value;

        var position = nodesPositions[id];
        if (constraints[id]) {
          nodesPositions[id] = constraints[id];
        } else {
          var f1 = attractions[id] || [0, 0];
          var f2 = repulsions[id] || [0, 0];
          var f = (0, _ops.plus)(f1, f2);
          nodesPositions[id] = bound((0, _ops.plus)(position, f));
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    return recompute();
  };

  var constrain = function constrain(id, position) {
    constraints[id] = position;
  };

  var unconstrain = function unconstrain(id) {
    delete constraints[id];
  };

  var graph = { tick: tick, constrain: constrain, unconstrain: unconstrain };

  var recompute = function recompute() {
    var i = -1;
    graph.curves = (0, _ops.mapObject)(links_, function (id, _ref4) {
      var start = _ref4.start;
      var end = _ref4.end;
      var link = _ref4.link;

      i += 1;
      var p = nodesPositions[start];
      var q = nodesPositions[end];

      return {
        link: (0, _polygon2['default'])({ points: [p, q], closed: false }),
        item: link,
        index: i
      };
    });

    graph.nodes = (0, _ops.mapObject)(nodes_, function (id, node) {
      return {
        point: nodesPositions[id],
        item: node
      };
    });

    return graph;
  };

  return recompute();
};

module.exports = exports['default'];
},{"./barnes-hut":3,"./ops":10,"./polygon":13}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

var _ops = require('./ops');

var epsilon = 1e-5;

var box = function box(datum, accessor) {
  var points = datum.map(accessor);
  var sorted = points.sort(function (_ref, _ref3) {
    var _ref2 = _slicedToArray(_ref, 2);

    var a = _ref2[0];
    var b = _ref2[1];

    var _ref32 = _slicedToArray(_ref3, 2);

    var c = _ref32[0];
    var d = _ref32[1];
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

exports['default'] = function (_ref4) {
  var data = _ref4.data;
  var xaccessor = _ref4.xaccessor;
  var yaccessor = _ref4.yaccessor;
  var width = _ref4.width;
  var height = _ref4.height;
  var closed = _ref4.closed;
  var min = _ref4.min;
  var max = _ref4.max;

  if (!xaccessor) {
    xaccessor = function (_ref5) {
      var _ref52 = _slicedToArray(_ref5, 2);

      var x = _ref52[0];
      var y = _ref52[1];
      return x;
    };
  }
  if (!yaccessor) {
    yaccessor = function (_ref6) {
      var _ref62 = _slicedToArray(_ref6, 2);

      var x = _ref62[0];
      var y = _ref62[1];
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
  var xscale = (0, _linear2['default'])([xmin, xmax], [0, width]);
  var yscale = (0, _linear2['default'])([ymin, ymax], [height, 0]);
  var scale = function scale(_ref7) {
    var _ref72 = _slicedToArray(_ref7, 2);

    var x = _ref72[0];
    var y = _ref72[1];
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

module.exports = exports['default'];
},{"./linear":9,"./ops":10}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var linear = function linear(_ref, _ref3) {
  var _ref2 = _slicedToArray(_ref, 2);

  var a = _ref2[0];
  var b = _ref2[1];

  var _ref32 = _slicedToArray(_ref3, 2);

  var c = _ref32[0];
  var d = _ref32[1];

  var f = function f(x) {
    return c + (d - c) * (x - a) / (b - a);
  };

  f.inverse = function () {
    return linear([c, d], [a, b]);
  };
  return f;
};

exports["default"] = linear;
module.exports = exports["default"];
},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var sum = function sum(xs) {
  return xs.reduce(function (a, b) {
    return a + b;
  }, 0);
};

var min = function min(xs) {
  return xs.reduce(function (a, b) {
    return Math.min(a, b);
  });
};

var max = function max(xs) {
  return xs.reduce(function (a, b) {
    return Math.max(a, b);
  });
};

var sumBy = function sumBy(xs, f) {
  return xs.reduce(function (a, b) {
    return a + f(b);
  }, 0);
};

var minBy = function minBy(xs, f) {
  return xs.reduce(function (a, b) {
    return Math.min(a, f(b));
  }, Infinity);
};

var maxBy = function maxBy(xs, f) {
  return xs.reduce(function (a, b) {
    return Math.max(a, f(b));
  }, -Infinity);
};

var plus = function plus(_ref, _ref3) {
  var _ref2 = _slicedToArray(_ref, 2);

  var a = _ref2[0];
  var b = _ref2[1];

  var _ref32 = _slicedToArray(_ref3, 2);

  var c = _ref32[0];
  var d = _ref32[1];
  return [a + c, b + d];
};

var minus = function minus(_ref4, _ref5) {
  var _ref42 = _slicedToArray(_ref4, 2);

  var a = _ref42[0];
  var b = _ref42[1];

  var _ref52 = _slicedToArray(_ref5, 2);

  var c = _ref52[0];
  var d = _ref52[1];
  return [a - c, b - d];
};

var times = function times(k, _ref6) {
  var _ref62 = _slicedToArray(_ref6, 2);

  var a = _ref62[0];
  var b = _ref62[1];
  return [k * a, k * b];
};

var length = function length(_ref7) {
  var _ref72 = _slicedToArray(_ref7, 2);

  var a = _ref72[0];
  var b = _ref72[1];
  return Math.sqrt(a * a + b * b);
};

var sumVectors = function sumVectors(xs) {
  return xs.reduce(plus, [0, 0]);
};

var average = function average(points) {
  return times(1 / points.length, points.reduce(plus));
};

var onCircle = function onCircle(r, angle) {
  return times(r, [Math.sin(angle), -Math.cos(angle)]);
};

var enhance = function enhance(compute, curve) {
  var obj = compute || {};
  for (var key in obj) {
    var method = obj[key];
    curve[key] = method(curve.index, curve.item, curve.group);
  }
  return curve;
};

var range = function range(a, b, inclusive) {
  var result = [];
  for (var i = a; i < b; i++) {
    result.push(i);
  }
  if (inclusive) {
    result.push(b);
  }
  return result;
};

var mapObject = function mapObject(obj, f) {
  var result = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var k = _step.value;

      var v = obj[k];
      result.push(f(k, v));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};

var pairs = function pairs(obj) {
  return mapObject(obj, function (k, v) {
    return [k, v];
  });
};

exports.sum = sum;
exports.min = min;
exports.max = max;
exports.sumBy = sumBy;
exports.minBy = minBy;
exports.maxBy = maxBy;
exports.plus = plus;
exports.minus = minus;
exports.times = times;
exports.length = length;
exports.sumVectors = sumVectors;
exports.average = average;
exports.onCircle = onCircle;
exports.enhance = enhance;
exports.range = range;
exports.mapObject = mapObject;
exports.pairs = pairs;
exports["default"] = { sum: sum, min: min, max: max, sumBy: sumBy, minBy: minBy, maxBy: maxBy, plus: plus, minus: minus, times: times,
  length: length, sumVectors: sumVectors, average: average, onCircle: onCircle, enhance: enhance, range: range, mapObject: mapObject, pairs: pairs };
},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var Path = function Path(init) {
  var _instructions = init || [];

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

  var round = function round(number, digits) {
    var str = number.toFixed(digits);
    return trimZeros(str);
  };

  var printInstrunction = function printInstrunction(_ref4) {
    var command = _ref4.command;
    var params = _ref4.params;

    var numbers = params.map(function (param) {
      return round(param, 6);
    });
    return command + ' ' + numbers.join(' ');
  };

  var point = function point(_ref5, _ref6) {
    var command = _ref5.command;
    var params = _ref5.params;

    var _ref62 = _slicedToArray(_ref6, 2);

    var prevX = _ref62[0];
    var prevY = _ref62[1];

    switch (command) {
      case 'M':
        return [params[0], params[1]];
      case 'L':
        return [params[0], params[1]];
      case 'H':
        return [params[0], prevY];
      case 'V':
        return [prevX, params[0]];
      case 'Z':
        return null;
      case 'C':
        return [params[4], params[5]];
      case 'S':
        return [params[2], params[3]];
      case 'Q':
        return [params[2], params[3]];
      case 'T':
        return [params[0], params[1]];
      case 'A':
        return [params[5], params[6]];
    }
  };

  var verbosify = function verbosify(keys, f) {
    return function (a) {
      var args = typeof a === 'object' ? keys.map(function (k) {
        return a[k];
      }) : arguments;
      return f.apply(null, args);
    };
  };

  var plus = function plus(instruction) {
    return Path(push(_instructions, instruction));
  };

  return {
    moveto: verbosify(['x', 'y'], function (x, y) {
      return plus({
        command: 'M',
        params: [x, y]
      });
    }),
    lineto: verbosify(['x', 'y'], function (x, y) {
      return plus({
        command: 'L',
        params: [x, y]
      });
    }),
    hlineto: verbosify(['x'], function (x) {
      return plus({
        command: 'H',
        params: [x]
      });
    }),
    vlineto: verbosify(['y'], function (y) {
      return plus({
        command: 'V',
        params: [y]
      });
    }),
    closepath: function closepath() {
      return plus({
        command: 'Z',
        params: []
      });
    },
    curveto: verbosify(['x1', 'y1', 'x2', 'y2', 'x', 'y'], function (x1, y1, x2, y2, x, y) {
      return plus({
        command: 'C',
        params: [x1, y1, x2, y2, x, y]
      });
    }),
    smoothcurveto: verbosify(['x2', 'y2', 'x', 'y'], function (x2, y2, x, y) {
      return plus({
        command: 'S',
        params: [x2, y2, x, y]
      });
    }),
    qcurveto: verbosify(['x1', 'y1', 'x', 'y'], function (x1, y1, x, y) {
      return plus({
        command: 'Q',
        params: [x1, y1, x, y]
      });
    }),
    smoothqcurveto: verbosify(['x', 'y'], function (x, y) {
      return plus({
        command: 'T',
        params: [x, y]
      });
    }),
    arc: verbosify(['rx', 'ry', 'xrot', 'largeArcFlag', 'sweepFlag', 'x', 'y'], function (rx, ry, xrot, largeArcFlag, sweepFlag, x, y) {
      return plus({
        command: 'A',
        params: [rx, ry, xrot, largeArcFlag, sweepFlag, x, y]
      });
    }),
    print: function print() {
      return _instructions.map(printInstrunction).join(' ');
    },
    points: function points() {
      var ps = [];
      var prev = [0, 0];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _instructions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var instruction = _step.value;

          var p = point(instruction, prev);
          prev = p;
          if (p) {
            ps.push(p);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return ps;
    },
    instructions: function instructions() {
      return _instructions.slice(0, _instructions.length);
    },
    connect: function connect(path) {
      var ps = this.points();
      var last = ps[ps.length - 1];
      var first = path.points()[0];
      var newInstructions = path.instructions().slice(1);
      if (!areEqualPoints(last, first)) {
        newInstructions.unshift({
          command: "L",
          params: first
        });
      }
      return Path(this.instructions().concat(newInstructions));
    }
  };
};

exports['default'] = function () {
  return Path();
};

module.exports = exports['default'];
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

var _sector = require('./sector');

var _sector2 = _interopRequireDefault(_sector);

var _ops = require('./ops');

exports['default'] = function (_ref) {
  var data = _ref.data;
  var accessor = _ref.accessor;
  var center = _ref.center;
  var r = _ref.r;
  var R = _ref.R;
  var compute = _ref.compute;

  var values = data.map(accessor);
  var s = (0, _ops.sum)(values);
  var scale = (0, _linear2['default'])([0, s], [0, 2 * Math.PI]);
  var curves = [];
  var t = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var i = _step$value[0];
      var item = _step$value[1];

      var value = values[i];
      curves.push((0, _ops.enhance)(compute, {
        item: item,
        index: i,
        sector: (0, _sector2['default'])({
          center: center,
          r: r,
          R: R,
          start: scale(t),
          end: scale(t + value)
        })
      }));
      t += value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return { curves: curves };
};

module.exports = exports['default'];
},{"./linear":9,"./ops":10,"./sector":17}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _ops = require('./ops');

exports['default'] = function (_ref) {
  var _Path;

  var points = _ref.points;
  var closed = _ref.closed;

  var l = points.length;
  var head = points[0];
  var tail = points.slice(1, l + 1);
  var path = tail.reduce(function (pt, p) {
    return pt.lineto.apply(pt, _toConsumableArray(p));
  }, (_Path = (0, _path2['default'])()).moveto.apply(_Path, _toConsumableArray(head)));

  return {
    path: closed ? path.closepath() : path,
    centroid: (0, _ops.average)(points)
  };
};

module.exports = exports['default'];
},{"./ops":10,"./path":11}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _semiRegularPolygon = require('./semi-regular-polygon');

var _semiRegularPolygon2 = _interopRequireDefault(_semiRegularPolygon);

var _ops = require('./ops');

var collectKeys = function collectKeys(objects) {
  var keys = [];
  var keysets = objects.map(Object.keys);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var object = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(object)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          if (keys.indexOf(key) == -1) {
            keys.push(key);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return keys;
};

var keyAccessor = function keyAccessor(keys) {
  var a = {};
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var key = _step3.value;

      (function (k) {
        a[k] = function (o) {
          return o[k];
        };
      })(key);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return a;
};

var globalMax = function globalMax(data, accessor) {
  var keys = Object.keys(accessor);
  var maxs = data.map(function (d) {
    return (0, _ops.maxBy)(keys, function (k) {
      return accessor[k](d);
    });
  });
  return (0, _ops.max)(maxs);
};

exports['default'] = function (_ref) {
  var data = _ref.data;
  var accessor = _ref.accessor;
  var center = _ref.center;
  var r = _ref.r;
  var max = _ref.max;
  var _ref$rings = _ref.rings;
  var rings = _ref$rings === undefined ? 3 : _ref$rings;
  var _ref$compute = _ref.compute;
  var compute = _ref$compute === undefined ? {} : _ref$compute;

  if (!accessor) {
    accessor = keyAccessor(collectKeys(data));
  }
  var keys = Object.keys(accessor);
  var sides = keys.length;
  var angle = 2 * Math.PI / sides;
  var i = -1;
  if (max == null) {
    max = globalMax(data, accessor);
  }

  var ringPaths = (0, _ops.range)(1, rings, true).map(function (n) {
    var radius = r * n / rings;
    return (0, _semiRegularPolygon2['default'])({
      center: center,
      radii: (0, _ops.range)(0, sides).map(function (s) {
        return radius;
      })
    });
  });

  var polygons = data.map(function (d) {
    i += 1;

    return (0, _ops.enhance)(compute, {
      polygon: (0, _semiRegularPolygon2['default'])({
        center: center,
        radii: keys.map(function (k) {
          return r * accessor[k](d) / max;
        })
      }),
      item: d,
      index: i
    });
  });

  return {
    curves: polygons,
    rings: ringPaths
  };
};

module.exports = exports['default'];
},{"./ops":10,"./semi-regular-polygon":18}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polygon = require('./polygon');

var _polygon2 = _interopRequireDefault(_polygon);

exports['default'] = function (_ref) {
  var left = _ref.left;
  var right = _ref.right;
  var top = _ref.top;
  var bottom = _ref.bottom;

  return (0, _polygon2['default'])({
    points: [[right, top], [right, bottom], [left, bottom], [left, top]],
    closed: true
  });
};

module.exports = exports['default'];
},{"./polygon":13}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rectangle = require('./rectangle');

var _rectangle2 = _interopRequireDefault(_rectangle);

var _curvedRectangle = require('./curved-rectangle');

var _curvedRectangle2 = _interopRequireDefault(_curvedRectangle);

var _ops = require('./ops');

exports['default'] = function (_ref) {
  var data = _ref.data;
  var nodeaccessor = _ref.nodeaccessor;
  var linkaccessor = _ref.linkaccessor;
  var width = _ref.width;
  var height = _ref.height;
  var gutter = _ref.gutter;
  var rectWidth = _ref.rectWidth;
  var compute = _ref.compute;

  var id = function id(x) {
    return x;
  };
  if (!nodeaccessor) {
    nodeaccessor = id;
  }
  if (!linkaccessor) {
    linkaccessor = id;
  }
  gutter = gutter || 10;
  rectWidth = rectWidth || 10;

  var links_ = data.links.map(linkaccessor);
  var nodes_ = data.nodes.map(function (level) {
    return level.map(nodeaccessor);
  });

  // Compute the spacing between groups of rectangles;
  // takes care of rects width
  var spacingGroups = (width - rectWidth) / (data.nodes.length - 1);
  var nameValues = {};

  // Initialize the information about nodes
  nodes_.reduce(function (a, b) {
    return a.concat(b);
  }).forEach(function (name) {
    nameValues[name] = {
      value: 0,
      currentlyUsedIn: 0,
      currentlyUsedOut: 0
    };
  });

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function () {
      var _step$value = _slicedToArray(_step.value, 2);

      var name = _step$value[0];
      var val = _step$value[1];

      var valsIn = (0, _ops.sumBy)(links_.filter(function (x) {
        return x.end === name;
      }), function (x) {
        return x.weight;
      });
      var valsOut = (0, _ops.sumBy)(links_.filter(function (x) {
        return x.start === name;
      }), function (x) {
        return x.weight;
      });
      val.value = Math.max(valsIn, valsOut);
    };

    for (var _iterator = (0, _ops.pairs)(nameValues)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }

    // Find a suitable scale: it should take care of the maximum height
    // of stacked rectangles and gutters between them.
    // I did as follows: take the initial height and, for each group of
    // rectangles, compute how much space you have available, that is,
    // height - gutters; there are lengthOfGroup - 1 gutters.
    // Consider the ratios spaceForEachGroup / heightOfStackedRectangles
    // and take the minimum. Use this as scale factor.

    // Compute height of staked rectangles in a group
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var heightOfGroups = nodes_.map(function (group) {
    return (0, _ops.sumBy)(group, function (name) {
      return nameValues[name].value;
    });
  });

  // Compute the available height for each group (height - gutters)
  var spaceForEachGroup = nodes_.map(function (group) {
    return height - (group.length - 1) * gutter;
  });

  // Compute minimum ratio
  var scale = (0, _ops.min)(heightOfGroups.map(function (heightOfGroup, idx) {
    return spaceForEachGroup[idx] / heightOfGroup;
  }));

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _ops.pairs)(nameValues)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 2);

      var _name = _step2$value[0];
      var val = _step2$value[1];

      val.scaledValue = scale * val.value;
    }

    // Fill rectangles information: each rectangle
    // is stack on the previous one, with a gutter
    // The group of rectangles is centered in their own column
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var rectangles = [];
  var nodeIdx = -1;

  nodes_.forEach(function (group, idg) {
    var hGroup = (0, _ops.sumBy)(group, function (y) {
      return nameValues[y].scaledValue;
    }) + (group.length - 1) * gutter;
    var firstTop = (height - hGroup) / 2;
    // Fake previous bottom
    var previousBottom = firstTop - gutter;
    group.forEach(function (name, idn) {
      var top = previousBottom + gutter;
      var bottom = top + nameValues[name].scaledValue;
      previousBottom = bottom;
      var att = {
        top: top,
        bottom: bottom,
        left: rectWidth / 2 + idg * spacingGroups - rectWidth / 2,
        right: rectWidth / 2 + idg * spacingGroups + rectWidth / 2
      };
      nameValues[name].rectangleCoords = att;
      nodeIdx += 1;
      rectangles.push((0, _ops.enhance)(compute, {
        curve: (0, _rectangle2['default'])(att),
        item: data.nodes[idg][idn],
        index: nodeIdx,
        group: idg
      }));
    });
  });

  var curvedRectangles = links_.map(function (link, i) {
    var s = nameValues[link.start];
    var t = nameValues[link.end];
    var rectSource = s.rectangleCoords;
    var rectTarget = t.rectangleCoords;
    var scaledWeight = link.weight * scale;
    var a = rectSource.top + s.currentlyUsedOut;
    var b = rectTarget.top + t.currentlyUsedIn;
    var curvedRect = {
      topleft: [rectSource.right, a],
      topright: [rectTarget.left, b],
      bottomleft: [rectSource.right, a + scaledWeight],
      bottomright: [rectTarget.left, b + scaledWeight]
    };
    s.currentlyUsedOut += scaledWeight;
    t.currentlyUsedIn += scaledWeight;

    return (0, _ops.enhance)(compute, {
      curve: (0, _curvedRectangle2['default'])(curvedRect),
      item: data.links[i],
      index: i
    });
  });

  return {
    curvedRectangles: curvedRectangles,
    rectangles: rectangles
  };
};

module.exports = exports['default'];
},{"./curved-rectangle":6,"./ops":10,"./rectangle":15}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _ops = require('./ops');

exports['default'] = function (_ref) {
  var _Path$moveto$arc$lineto, _Path$moveto$arc, _Path$moveto, _Path;

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

  var path = (_Path$moveto$arc$lineto = (_Path$moveto$arc = (_Path$moveto = (_Path = (0, _path2['default'])()).moveto.apply(_Path, _toConsumableArray(a))).arc.apply(_Path$moveto, [R, R, 0, large, 1].concat(_toConsumableArray(b)))).lineto.apply(_Path$moveto$arc, _toConsumableArray(c))).arc.apply(_Path$moveto$arc$lineto, [r, r, 0, large, 0].concat(_toConsumableArray(d))).closepath();

  var midAngle = (start + end) / 2;
  var midRadius = (r + R) / 2;
  var centroid = (0, _ops.plus)(center, (0, _ops.onCircle)(midRadius, midAngle));

  return {
    path: path,
    centroid: centroid
  };
};

module.exports = exports['default'];
},{"./ops":10,"./path":11}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polygon = require('./polygon');

var _polygon2 = _interopRequireDefault(_polygon);

var _ops = require('./ops');

exports['default'] = function (_ref) {
  var center = _ref.center;
  var radii = _ref.radii;

  var angle = 2 * Math.PI / radii.length;
  var points = radii.map(function (r, i) {
    return (0, _ops.plus)(center, (0, _ops.onCircle)(r, i * angle));
  });

  return (0, _polygon2['default'])({
    points: points,
    closed: true
  });
};

module.exports = exports['default'];
},{"./ops":10,"./polygon":13}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _bezier = require('./bezier');

var _bezier2 = _interopRequireDefault(_bezier);

var _lineChartComp = require('./line-chart-comp');

var _lineChartComp2 = _interopRequireDefault(_lineChartComp);

var _ops = require('./ops');

exports['default'] = function (options) {
  var _comp = (0, _lineChartComp2['default'])(options);

  var arranged = _comp.arranged;
  var scale = _comp.scale;
  var xscale = _comp.xscale;
  var yscale = _comp.yscale;
  var base = _comp.base;

  var i = -1;

  var lines = arranged.map(function (_ref) {
    var _line$path$lineto, _line$path;

    var points = _ref.points;
    var xmin = _ref.xmin;
    var xmax = _ref.xmax;

    var scaledPoints = points.map(scale);
    i += 1;
    var line = (0, _bezier2['default'])({ points: scaledPoints });
    var area = {
      path: (_line$path$lineto = (_line$path = line.path).lineto.apply(_line$path, _toConsumableArray(scale([xmax, base])))).lineto.apply(_line$path$lineto, _toConsumableArray(scale([xmin, base]))).closepath(),
      centroid: (0, _ops.average)([line.centroid, scale([xmin, base]), scale([xmax, base])])
    };

    return (0, _ops.enhance)(options.compute, {
      item: options.data[i],
      line: line,
      area: area,
      index: i
    });
  });

  return {
    curves: lines,
    xscale: xscale,
    yscale: yscale
  };
};

module.exports = exports['default'];
},{"./bezier":4,"./line-chart-comp":8,"./ops":10}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polygon = require('./polygon');

var _polygon2 = _interopRequireDefault(_polygon);

var _lineChartComp = require('./line-chart-comp');

var _lineChartComp2 = _interopRequireDefault(_lineChartComp);

var _ops = require('./ops');

exports['default'] = function (options) {
  var _comp = (0, _lineChartComp2['default'])(options);

  var arranged = _comp.arranged;
  var scale = _comp.scale;
  var xscale = _comp.xscale;
  var yscale = _comp.yscale;
  var base = _comp.base;

  var i = -1;

  var polygons = arranged.map(function (_ref) {
    var points = _ref.points;
    var xmin = _ref.xmin;
    var xmax = _ref.xmax;

    var scaledPoints = points.map(scale);
    points.push([xmax, base]);
    points.push([xmin, base]);
    var scaledPointsClosed = points.map(scale);
    i += 1;

    return (0, _ops.enhance)(options.compute, {
      item: options.data[i],
      line: (0, _polygon2['default'])({
        points: scaledPoints,
        closed: false
      }),
      area: (0, _polygon2['default'])({
        points: scaledPointsClosed,
        closed: true
      }),
      index: i
    });
  });

  return {
    curves: polygons,
    xscale: xscale,
    yscale: yscale
  };
};

module.exports = exports['default'];
},{"./line-chart-comp":8,"./ops":10,"./polygon":13}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var maxBy = function maxBy(items, f) {
  if (items === undefined) items = [];

  return items.reduce(function (m, i) {
    return Math.max(m, f(i));
  }, 0);
};

var treeHeight = function treeHeight(root) {
  return 1 + maxBy(root.children, treeHeight);
};

var buildTree = function buildTree(data, children) {
  var level = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  var result = {
    item: data,
    level: level
  };
  var cs = children(data);
  if (cs && cs.length) {
    result.children = cs.map(function (c) {
      return buildTree(c, children, level + 1);
    });
  }
  return result;
};

var setHeight = function setHeight(root) {
  var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var maxHeights = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  if (maxHeights[level] != null) {
    root.height = maxHeights[level] + 1;
    maxHeights[level] += 1;
  } else {
    maxHeights[level] = 0;
    root.height = 0;
  }
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (root.children || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;

      setHeight(child, level + 1, maxHeights);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return maxHeights;
};

// f is a function of (parent, child)
var collect = function collect(root, f) {
  var result = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (root.children || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var child = _step2.value;

      result.push(f(root, child));
      result = result.concat(collect(child, f));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return result;
};

exports.treeHeight = treeHeight;
exports.buildTree = buildTree;
exports.setHeight = setHeight;
exports.collect = collect;
},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _connector = require('./connector');

var _connector2 = _interopRequireDefault(_connector);

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

var _ops = require('./ops');

var _treeUtils = require('./tree-utils');

exports['default'] = function (_ref) {
  var data = _ref.data;
  var width = _ref.width;
  var height = _ref.height;
  var children = _ref.children;
  var tension = _ref.tension;

  if (!children) {
    children = function (x) {
      return x.children;
    };
  }
  var tree = (0, _treeUtils.buildTree)(data, children);
  var levels = (0, _treeUtils.treeHeight)(tree);
  var maxHeights = (0, _treeUtils.setHeight)(tree);
  var hspace = width / (levels - 1);
  var hscale = (0, _linear2['default'])([0, levels - 1], [0, width]);
  var vscales = (0, _ops.range)(0, levels).map(function (level) {
    var availableHeight = Math.sqrt(level / (levels - 1)) * height;
    var top = (height - availableHeight) / 2;
    var bottom = top + availableHeight;
    var maxHeight = level > 0 ? maxHeights[level] + maxHeights[level - 1] : maxHeights[level];
    if (maxHeight === 0) {
      return function (x) {
        return height / 2;
      };
    } else {
      return (0, _linear2['default'])([0, maxHeight], [top, bottom]);
    }
  });

  var position = function position(node) {
    var level = node.level;
    var vscale = vscales[level];
    return [hscale(level), vscale(node.height_)];
  };

  var i = -1;
  var connectors = (0, _treeUtils.collect)(tree, function (parent, child) {
    i += 1;
    child.height_ = child.height + parent.height;
    return {
      connector: (0, _connector2['default'])({
        start: position(parent),
        end: position(child),
        tension: tension
      }),
      index: i,
      item: {
        start: parent.item,
        end: child.item
      }
    };
  });
  var childNodes = (0, _treeUtils.collect)(tree, function (parent, child) {
    return {
      point: position(child),
      item: child.item
    };
  });
  var rootNode = {
    point: position(tree),
    item: tree.item
  };

  return {
    curves: connectors,
    nodes: [rootNode].concat(childNodes)
  };
};

module.exports = exports['default'];
},{"./connector":5,"./linear":9,"./ops":10,"./tree-utils":21}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

var _rectangle = require('./rectangle');

var _rectangle2 = _interopRequireDefault(_rectangle);

var _ops = require('./ops');

exports['default'] = function (_ref) {
  var data = _ref.data;
  var accessor = _ref.accessor;
  var width = _ref.width;
  var height = _ref.height;
  var _ref$gutter = _ref.gutter;
  var gutter = _ref$gutter === undefined ? 10 : _ref$gutter;
  var compute = _ref.compute;
  var _ref$min = _ref.min;
  var min = _ref$min === undefined ? 0 : _ref$min;
  var _ref$max = _ref.max;
  var max = _ref$max === undefined ? 0 : _ref$max;

  if (!accessor) {
    accessor = function (x) {
      return x;
    };
  }
  var last = 0;
  var data_ = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var d = _step.value;

      var _accessor = accessor(d);

      var value = _accessor.value;
      var absolute = _accessor.absolute;

      var _ref2 = absolute ? [0, value || last] : [last, last + value];

      var _ref22 = _slicedToArray(_ref2, 2);

      var low = _ref22[0];
      var high = _ref22[1];

      var m = Math.min(low, high);
      var M = Math.max(low, high);
      min = Math.min(min, m);
      max = Math.max(max, M);
      last = high;

      data_.push({
        item: d,
        low: low,
        high: high,
        value: value != null ? value : high
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var n = data_.length;
  var barWidth = (width - gutter * (n - 1)) / n;
  var curves = [];
  var scale = (0, _linear2['default'])([min, max], [height, 0]);

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = data_.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 2);

      var i = _step2$value[0];
      var d = _step2$value[1];

      var left = i * (barWidth + gutter);
      var right = left + barWidth;
      var bottom = scale(d.low);
      var _top = scale(d.high);
      var line = (0, _rectangle2['default'])({ left: left, right: right, bottom: bottom, top: _top });
      curves.push((0, _ops.enhance)(compute, {
        item: d.item,
        line: line,
        value: d.value,
        index: i
      }));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return {
    curves: curves,
    scale: scale
  };
};

module.exports = exports['default'];
},{"./linear":9,"./ops":10,"./rectangle":15}]},{},[1]);
