define(['exports', 'module', './binarytree', './segment', './geom'], function (exports, module, _binarytree, _segment, _geom) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Tree = _interopRequireDefault(_binarytree);

  var _Segment = _interopRequireDefault(_segment);

  var _Geom = _interopRequireDefault(_geom);

  function Beachline(item, parent, l, r, cEvent) {
    _Tree['default'].call(this, item, parent, l, r);
    this.cEvent = cEvent;
  }

  Beachline.prototype = Object.create(_Tree['default'].prototype);

  Beachline.prototype.isLeaf = function () {
    return this.l === undefined;
  };

  Beachline.prototype.getArcNodeOnSite = function (site) {
    var curNode = this;
    var solN = undefined;

    while (!curNode.isLeaf()) {
      curNode.item.pl[1] < curNode.item.pr[1] ? solN = 0 : solN = 1;
      curNode = site[0] < _Geom['default'].parabolsCrossX(curNode.item.pl, curNode.item.pr, site[1])[solN] ? curNode.l : curNode.r;
    }
    return curNode;
  };

  Beachline.prototype.addArc = function (newArcSite, arcsNodes) {
    var lArcNode = arcsNodes[0];
    var crossedArcNode = arcsNodes[1];
    var rArcNode = arcsNodes[2];
    var crossedArcSite = crossedArcNode.item;
    var crossPoint = [newArcSite[0], newArcSite[1] - _Geom['default'].distPointToParabol(newArcSite, crossedArcSite)];
    var newLHalfedge = new _Segment['default'](crossedArcSite, newArcSite, crossPoint);
    var newRHalfedge = new _Segment['default'](newArcSite, crossedArcSite, crossPoint);

    crossedArcNode.item = newLHalfedge;
    crossedArcNode.addLChild(new Beachline(crossedArcSite));
    crossedArcNode.addRChild(new Beachline(newRHalfedge));
    crossedArcNode.r.addLChild(new Beachline(newArcSite));
    crossedArcNode.r.addRChild(new Beachline(crossedArcSite));

    if (lArcNode != undefined && lArcNode.cEvent != undefined) {
      lArcNode.cEvent.arcsNodes[2] = crossedArcNode.l;
    }
    if (rArcNode != undefined && rArcNode.cEvent != undefined) {
      rArcNode.cEvent.arcsNodes[0] = crossedArcNode.r.r;
    }
  };

  Beachline.prototype.rmArc = function (newEdgeStart, arcsNodes, edgesNodes) {
    var liveLArcNode = arcsNodes[0];
    var deadArcNode = arcsNodes[1];
    var liveRArcNode = arcsNodes[2];

    if (deadArcNode.isRChild()) {
      var liveCutBranch = edgesNodes[0].l;
      var midEdgeNode = edgesNodes[0];
      var topEdgeNode = edgesNodes[1];
    } else {
      var liveCutBranch = edgesNodes[1].r;
      var midEdgeNode = edgesNodes[1];
      var topEdgeNode = edgesNodes[0];
    }

    topEdgeNode.item = new _Segment['default'](liveLArcNode.item, liveRArcNode.item, newEdgeStart);

    if (midEdgeNode.isRChild()) {
      midEdgeNode.parent.r = liveCutBranch;
    } else {
      midEdgeNode.parent.l = liveCutBranch;
    }
    liveCutBranch.parent = midEdgeNode.parent;
  };

  module.exports = Beachline;
});