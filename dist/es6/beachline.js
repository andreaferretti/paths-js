import Tree from './binarytree'
import Segment from './segment'
import Geom from './geom'

function Beachline(item, parent, l, r, cEvent) {
  Tree.call(this, item, parent, l, r)
  this.cEvent = cEvent
}

Beachline.prototype = Object.create(Tree.prototype)

Beachline.prototype.isLeaf = function() {
  return this.l === undefined
}

Beachline.prototype.getArcNodeOnSite = function(site) {
  let curNode = this
  let solN = undefined

  while (!curNode.isLeaf()) {
    curNode.item.pl[1] < curNode.item.pr[1] ? solN=0 : solN=1
    curNode =
      (site[0] < Geom.parabolsCrossX(curNode.item.pl, curNode.item.pr, site[1])[solN]) ?
      curNode.l : curNode.r
  }
  return curNode
}

Beachline.prototype.addArc = function(newArcSite, arcsNodes) {
  let lArcNode = arcsNodes[0]
  let crossedArcNode = arcsNodes[1]
  let rArcNode = arcsNodes[2]
  let crossedArcSite = crossedArcNode.item
  let crossPoint = [
    newArcSite[0],
    newArcSite[1] - Geom.distPointToParabol(newArcSite, crossedArcSite)
  ]
  let newLHalfedge = new Segment(crossedArcSite, newArcSite, crossPoint)
  let newRHalfedge = new Segment(newArcSite, crossedArcSite, crossPoint)

  crossedArcNode.item=newLHalfedge
  crossedArcNode.addLChild(new Beachline(crossedArcSite))
  crossedArcNode.addRChild(new Beachline(newRHalfedge))
  crossedArcNode.r.addLChild(new Beachline(newArcSite))
  crossedArcNode.r.addRChild(new Beachline(crossedArcSite))

  if(lArcNode != undefined && lArcNode.cEvent != undefined) {
    lArcNode.cEvent.arcsNodes[2] = crossedArcNode.l
  }
  if(rArcNode != undefined && rArcNode.cEvent != undefined) {
    rArcNode.cEvent.arcsNodes[0] = crossedArcNode.r.r
  }
}

Beachline.prototype.rmArc = function(newEdgeStart, arcsNodes, edgesNodes) {
  let liveLArcNode=arcsNodes[0]
  let deadArcNode=arcsNodes[1]
  let liveRArcNode=arcsNodes[2]

  if (deadArcNode.isRChild()) {
    var liveCutBranch = edgesNodes[0].l
    var midEdgeNode = edgesNodes[0]
    var topEdgeNode = edgesNodes[1]
  }
  else {
    var liveCutBranch = edgesNodes[1].r
    var midEdgeNode = edgesNodes[1]
    var topEdgeNode = edgesNodes[0]
  }

  topEdgeNode.item =
    new Segment(liveLArcNode.item, liveRArcNode.item, newEdgeStart)

  if (midEdgeNode.isRChild()) {
    midEdgeNode.parent.r = liveCutBranch
  }
  else {
    midEdgeNode.parent.l = liveCutBranch
  }
  liveCutBranch.parent = midEdgeNode.parent
}

export default Beachline