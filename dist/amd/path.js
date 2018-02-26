define(['exports', 'module'], function (exports, module) {
  'use strict';

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

    var point = function point(_ref5, prev) {
      var command = _ref5.command;
      var params = _ref5.params;

      switch (command) {
        case 'M':
          return [params[0], params[1]];
        case 'L':
          return [params[0], params[1]];
        case 'H':
          return [params[0], prev[1]];
        case 'V':
          return [prev[0], params[0]];
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

    var matrixTransform = function matrixTransform(points, m) {
      return points.map(function (point) {
        return {
          x: point.x * m[0] + point.y * m[2] + m[4],
          y: point.x * m[1] + point.y * m[3] + m[5]
        };
      });
    };

    var transformEllipse = function transformEllipse(rx, ry, ax, m) {
      var torad = Math.PI / 180;
      var epsilon = 0.0000000001;

      var c = Math.cos(ax * torad),
          s = Math.sin(ax * torad);
      var ma = [rx * (m[0] * c + m[2] * s), rx * (m[1] * c + m[3] * s), ry * (-m[0] * s + m[2] * c), ry * (-m[1] * s + m[3] * c)];

      var J = ma[0] * ma[0] + ma[2] * ma[2],
          K = ma[1] * ma[1] + ma[3] * ma[3];

      var D = ((ma[0] - ma[3]) * (ma[0] - ma[3]) + (ma[2] + ma[1]) * (ma[2] + ma[1])) * ((ma[0] + ma[3]) * (ma[0] + ma[3]) + (ma[2] - ma[1]) * (ma[2] - ma[1]));

      var JK = (J + K) / 2;

      if (D < epsilon * JK) {
        return {
          rx: Math.sqrt(JK),
          ry: Math.sqrt(JK),
          ax: 0,
          isDegenerate: false
        };
      }

      var L = ma[0] * ma[1] + ma[2] * ma[3];
      D = Math.sqrt(D);

      var l1 = JK + D / 2,
          l2 = JK - D / 2;

      var newAx = undefined,
          newRx = undefined,
          newRy = undefined;
      newAx = Math.abs(L) < epsilon && Math.abs(l1 - K) < epsilon ? 90 : Math.atan(Math.abs(L) > Math.abs(l1 - K) ? (l1 - J) / L : L / (l1 - K)) * 180 / Math.PI;

      if (newAx >= 0) {
        newRx = Math.sqrt(l1);
        newRy = Math.sqrt(l2);
      } else {
        newAx += 90;
        newRx = Math.sqrt(l2);
        newRy = Math.sqrt(l1);
      }

      return {
        rx: newRx,
        ry: newRy,
        ax: newAx,
        isDegenerate: newRx < epsilon * newRy || newRy < epsilon * newRx
      };
    };

    var transformParams = function transformParams(instruction, matrix, prev) {
      var p = instruction.params;

      var transformer = {
        'V': function V(instruction, matrix, prev) {
          var pts = [{ x: prev[0], y: p[1] }];
          var newPts = matrixTransform(pts, matrix);
          if (newPts[0].x === matrixTransform([{ x: prev[0], y: prev[1] }])[0].x) {
            return {
              command: 'V',
              params: [newPts[0].y]
            };
          } else {
            return {
              command: 'L',
              params: [newPts[0].x, newPts[0].y]
            };
          }
        },
        'H': function H(instruction, matrix, prev) {
          var pts = [{ x: p[0], y: prev[1] }];
          var newPts = matrixTransform(pts, matrix);
          if (newPts[0].y === matrixTransform([{ x: prev[0], y: prev[1] }])[0].y) {
            return {
              command: 'H',
              params: [newPts[0].x]
            };
          } else {
            return {
              command: 'L',
              params: [newPts[0].x, newPts[0].y]
            };
          }
        },
        'A': function A(instruction, matrix, prev) {
          // transform rx, ry, and x-axis rotation
          var r = transformEllipse(p[0], p[1], p[2], matrix);

          var sweepFlag = p[4];
          if (matrix[0] * matrix[3] - matrix[1] * matrix[2] < 0) {
            sweepFlag = sweepFlag ? '0' : '1';
          }

          // transform endpoint
          var pts = [{ x: p[5], y: p[6] }];
          var newPts = matrixTransform(pts, matrix);

          if (r.isDegenerate) {
            return {
              command: 'L',
              params: [newPts[0].x, newPts[0].y]
            };
          } else {
            return {
              command: 'A',
              params: [r.rx, r.ry, r.ax, p[3], sweepFlag, newPts[0].x, newPts[0].y]
            };
          }
        },
        'C': function C(instruction, matrix, prev) {
          var pts = [{ x: p[0], y: p[1] }, { x: p[2], y: p[3] }, { x: p[4], y: p[5] }];
          var newPts = matrixTransform(pts, matrix);
          return {
            command: 'C',
            params: [newPts[0].x, newPts[0].y, newPts[1].x, newPts[1].y, newPts[2].x, newPts[2].y]
          };
        },
        'Z': function Z(instruction, matrix, prev) {
          return {
            command: 'Z',
            params: []
          };
        },
        'default': function _default(instruction, matrix, prev) {
          var pts = [{ x: p[0], y: p[1] }];
          var newPts = matrixTransform(pts, matrix);
          var newParams = instruction.params.slice(0, instruction.params.length);
          newParams.splice(0, 2, newPts[0].x, newPts[0].y);
          return {
            command: instruction.command,
            params: newParams
          };
        }
      };

      if (transformer[instruction.command]) {
        return transformer[instruction.command](instruction, matrix, prev);
      } else {
        return transformer['default'](instruction, matrix, prev);
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
      translate: verbosify(['dx', 'dy'], function (dx, dy) {
        var prev = [0, 0];
        var newInstructions = _instructions.map(function (instruction) {
          var matrix = [1, 0, 0, 1, dx, dy];
          var p = transformParams(instruction, matrix, prev);
          prev = point(instruction, prev);
          return p;
        });
        return Path(newInstructions);
      }),
      rotate: verbosify(['angle', 'rx', 'ry'], function (angle, rx, ry) {
        if (angle !== 0) {
          var _ret = (function () {
            var prev = undefined;
            var matrix = undefined;
            var newInstructions = _instructions;

            if (rx !== 0 && ry !== 0) {
              prev = [0, 0];
              matrix = [1, 0, 0, 1, -rx, -ry];
              newInstructions = newInstructions.map(function (instruction) {
                var p = transformParams(instruction, matrix, prev);
                prev = point(instruction, prev);
                return p;
              });
            }

            var rad = angle * Math.PI / 180;
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);

            prev = [0, 0];
            matrix = [cos, sin, -sin, cos, 0, 0];
            newInstructions = newInstructions.map(function (instruction) {
              var p = transformParams(instruction, matrix, prev);
              prev = point(instruction, prev);
              return p;
            });

            if (rx !== 0 && ry !== 0) {
              prev = [0, 0];
              matrix = [1, 0, 0, 1, rx, ry];
              newInstructions = newInstructions.map(function (instruction) {
                var p = transformParams(instruction, matrix, prev);
                prev = point(instruction, prev);
                return p;
              });
            }

            return {
              v: Path(newInstructions)
            };
          })();

          if (typeof _ret === 'object') return _ret.v;
        } else {
          return Path(_instructions);
        }
      }),
      print: function print() {
        return _instructions.map(printInstrunction).join(' ');
      },
      toString: function toString() {
        return undefined.print();
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
        var newInstructions = undefined;
        if (_instructions[_instructions.length - 1].command !== 'Z') {
          newInstructions = path.instructions().slice(1);
          if (!areEqualPoints(last, first)) {
            newInstructions.unshift({
              command: "L",
              params: first
            });
          }
        } else {
          newInstructions = path.instructions();
        }
        return Path(this.instructions().concat(newInstructions));
      }
    };
  };

  module.exports = function () {
    return Path();
  };
});