define(['exports', 'module', './connector', './linear', './ops', './tree-utils'], function (exports, module, _connector, _linear, _ops, _treeUtils) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Connector = _interopRequireDefault(_connector);

  var _Linear = _interopRequireDefault(_linear);

  module.exports = function (_ref) {
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
    var hscale = (0, _Linear['default'])([0, levels - 1], [0, width]);
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
        return (0, _Linear['default'])([0, maxHeight], [top, bottom]);
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
        connector: (0, _Connector['default'])({
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
});