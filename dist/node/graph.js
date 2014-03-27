// Generated by uRequire v{NO_VERSION} - template: 'nodejs' 
(function (window, global) {
  
var __isAMD = !!(typeof define === 'function' && define.amd),
    __isNode = (typeof exports === 'object'),
    __isWeb = !__isNode;
Polygon = require('./polygon'),
    O = require('./ops'),
    bh = require('./barnes_hut');

module.exports = (function () {
  var attractive_forces, cap, inside, random_position;
  random_position = function (w, h) {
    return [
      Math.random() * w,
      Math.random() * h
    ];
  };
  cap = function (bound, x) {
    return Math.min(Math.max(x, 0), bound);
  };
  inside = function (w, h) {
    return function (_arg) {
      var x, y;
      x = _arg[0], y = _arg[1];
      return [
        cap(w, x),
        cap(h, y)
      ];
    };
  };
  attractive_forces = function (links, positions, attraction) {
    var end, force, forces, id, pos1, pos2, start, weight, _ref;
    forces = {};
    for (id in links) {
      _ref = links[id], start = _ref.start, end = _ref.end, weight = _ref.weight;
      pos1 = positions[start];
      pos2 = positions[end];
      force = O.times(attraction * weight, O.minus(pos1, pos2));
      if (forces[start] == null) {
        forces[start] = [
          0,
          0
        ];
      }
      if (forces[end] == null) {
        forces[end] = [
          0,
          0
        ];
      }
      forces[start] = O.minus(forces[start], force);
      forces[end] = O.plus(forces[end], force);
    }
    return forces;
  };
  return function (_arg) {
    var attraction, bound, data, end, graph, height, i, id, link, linkaccessor, links, links_, node, nodeaccessor, nodes, nodes_positions, recompute, repulsion, start, tick, weight, width, _i, _j, _len, _len1, _ref;
    data = _arg.data, nodeaccessor = _arg.nodeaccessor, linkaccessor = _arg.linkaccessor, width = _arg.width, height = _arg.height, attraction = _arg.attraction, repulsion = _arg.repulsion;
    if (nodeaccessor == null) {
      nodeaccessor = function (n) {
        return n;
      };
    }
    if (linkaccessor == null) {
      linkaccessor = function (l) {
        return l;
      };
    }
    if (attraction == null) {
      attraction = 0.01;
    }
    if (repulsion == null) {
      repulsion = 1000;
    }
    nodes = data.nodes, links = data.links;
    nodes_positions = {};
    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      node = nodes[_i];
      id = nodeaccessor(node);
      nodes_positions[id] = random_position(width, height);
    }
    i = -1;
    bound = inside(width, height);
    links_ = {};
    for (_j = 0, _len1 = links.length; _j < _len1; _j++) {
      link = links[_j];
      _ref = linkaccessor(link), start = _ref.start, end = _ref.end, weight = _ref.weight;
      links_["" + start + "|" + end] = {
        weight: weight,
        start: start,
        end: end,
        link: link
      };
    }
    tick = function () {
      var attractions, bodies, f, f1, f2, position, repulsions, root, tree;
      bodies = bh.bodies(nodes_positions);
      root = bh.root(width, height);
      tree = bh.tree(bodies, root);
      attractions = attractive_forces(links_, nodes_positions, attraction);
      repulsions = bh.forces(tree, repulsion);
      for (id in nodes_positions) {
        position = nodes_positions[id];
        f1 = attractions[id] || [
          0,
          0
        ];
        f2 = repulsions[id] || [
          0,
          0
        ];
        f = O.plus(f1, f2);
        nodes_positions[id] = bound(O.plus(position, f));
      }
      return recompute();
    };
    graph = { tick: tick };
    recompute = function () {
      graph.curves = links.map(function (link) {
        var p, q, _ref1;
        i += 1;
        _ref1 = linkaccessor(link), start = _ref1.start, end = _ref1.end, weight = _ref1.weight;
        p = nodes_positions[start];
        q = nodes_positions[end];
        return {
          link: Polygon({
            points: [
              p,
              q
            ],
            closed: false
          }),
          item: link,
          index: i
        };
      });
      return graph.nodes = nodes.map(function (node) {
        id = nodeaccessor(node);
        return {
          point: nodes_positions[id],
          item: node
        };
      });
    };
    recompute();
    return graph;
  };
}).call(this);


}).call(this, (typeof exports === 'object' ? global : window), (typeof exports === 'object' ? global : window))