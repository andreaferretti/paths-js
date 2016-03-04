import Geom from '../dist/node/geom.js'
import Segment from '../dist/node/segment.js'
import Btree from '../dist/node/binarytree.js'
import Beachline from '../dist/node/beachline.js'
import Event from '../dist/node/event.js'
import Voronoi from '../dist/node/voronoi.js'
import expect from 'expect.js'

let almostEqual = function(p1, p2, tolerance){
    let TOLERANCE = tolerance || 1e-10
    let [dx, dy] = [p1[0]-p2[0], p1[1]-p2[1]]
    return Math.abs(dx)<TOLERANCE && Math.abs(dy)<TOLERANCE
}

//---------------SEGMENT---------------------//

describe('segment module test', function(){

    let s1 =new Segment([0,1],[1,0],[0,0],[2,2])
    let s2 =new Segment([1,0],[0,-1],[0.5,-0.5])

    it('should be a segment with m=1', function(){
        expect(s1.m).to.be(1)
    })

    it('should be a segment in the upper halfplane', function(){
        expect(s1.hp).to.be(1)
    })

    it('should be a segment with direction vector', function(){
        expect(s1.vec).to.eql([1,1])
    })

    it('should be a segment with m=-1', function(){
        expect(s2.m).to.be(-1)
    })

    it('should be a segment in the lower halfplane', function(){
        expect(s2.hp).to.be(-1)
    })

    it('should be a segment with direction vector', function(){
        expect(s2.vec).to.eql([1,-1])
    })

})


//---------------GEOM------------------------//

describe('geometry module test', function(){

    let sqrt2 = Math.sqrt(2)
    let s1 =new Segment([0,1],[1,0],[0,0],[2,2])
    let s2 =new Segment([1,0],[0,-1],[0.5,-0.5])
    let s3 =new Segment([0,0],[1,1],[1,0])

    it('gives the distance between two points', function(){
        expect(Geom.distPointToPoint([0,0],[1,1])).to.be(sqrt2)
    })

    it('should give the distance between a point on a parabol directrix and the parabol itself', function(){
        expect(Geom.distPointToParabol([0,0], [0,2])).to.be(1)
    })

    it('gives the center of a circle passing for three points', function(){
        let cc= Geom.circumCenter([0,-2],[sqrt2,sqrt2],[-sqrt2,sqrt2])
        //let [ccx, ccy] = [cc[0], cc[1]]
        expect(almostEqual(cc, [0,0])).to.be(true)
    })

    it('gives the x of the cross points between two parabols in ascending order', function(){
        let crossx = Geom.parabolsCrossX([0,2],[-2,2],0)
        expect(crossx).to.eql([-1,-1])
    })

    it('gives the x of the cross points between two parabols in ascending order', function(){
        let crossx = Geom.parabolsCrossX([0,2],[-2,2],0)
        expect(crossx).to.eql([-1,-1])
    })

    it('gives the x of the cross points between two parabols in ascending order', function(){
        let crossx = Geom.parabolsCrossX([0,2],[-2,2],0)
        expect(crossx).to.eql([-1,-1])
    })

    it('verifies that the two given segments do not cross', function(){
        expect(Geom.doHalflinesCross(s1, s2)).to.be(false)
    })

    it('verifies that the two given segments do cross', function(){
        expect(Geom.doHalflinesCross(s1, s3)).to.be(true)
    })

})


//---------------BINARYTREE------------------------//

describe('binary tree module test', function() {

    let root = new Btree("0")
    root.addLChild(new Btree("l"))
    root.addRChild(new Btree("r"))


    it('verifies that a left child node has been correctly added', function () {
        expect(root.l.item).to.be("l")
        expect(root.l.parent.item).to.be("0")
    })

    it('verifies that a right child node has been correctly added', function () {
        expect(root.r.item).to.be("r")
        expect(root.r.parent.item).to.be("0")
    })

    it('verifies the value contained by the node', function () {
        expect(root.item).to.be("0")
    })

    it('verifies that a node is the root of the tree', function () {
        expect(root.isRoot()).to.be(true)
    })

    it('verifies that a node is the root of the tree', function () {
        expect(root.isRoot()).to.be(true)
    })

    it('verifies that a node is not a leaf of the tree', function () {
        expect(root.isLeaf()).to.be(false)
    })

    it('verifies that a node is a leaf of the tree', function () {
        expect(root.r.isLeaf()).to.be(true)
    })

    it('verifies that a node is not the root of the tree', function () {
        expect(root.r.isRoot()).to.be(false)
    })

    it('verifies that a node is a left child', function () {
        expect(root.l.isLChild()).to.be(true)
    })

    it('verifies that a node is not a left child', function () {
        expect(root.l.isRChild()).to.be(false)
    })

    it('verifies that a node is a right child', function () {
        expect(root.r.isRChild()).to.be(true)
    })

    it('verifies that a node is not a right child', function () {
        expect(root.r.isLChild()).to.be(false)
    })

    it('verifies that the first leaf from the left has no lefter leaf', function () {
        expect(root.l.getLLeafAndLParent()[0]).to.be(undefined)
    })

    it('verifies that the first leaf from the left has no left parent', function () {
        expect(root.l.getLLeafAndLParent()[1]).to.be(undefined)
    })

    it('gives the righter leaf of (the first) leaf from the left', function () {
        expect(root.l.getRLeafAndRParent()[0]).to.be(root.r)
    })

    it('gives the right parent of (the first) leaf from the left', function () {
        expect(root.l.getRLeafAndRParent()[1]).to.be(root)
    })

    it('verifies that the first leaf from the right has no righter leaf', function () {
        expect(root.r.getRLeafAndRParent()[0]).to.be(undefined)
    })

    it('verifies that the first leaf from the right has no right parent', function () {
        expect(root.r.getRLeafAndRParent()[1]).to.be(undefined)
    })

    it('gives the lefter leaf of (the first) leaf from the right', function () {
        expect(root.r.getLLeafAndLParent()[0]).to.be(root.l)
    })

    it('gives the lefter parent of (the first) leaf from the right', function () {
        expect(root.r.getLLeafAndLParent()[1]).to.be(root)
    })

})


//---------------BEACHLINE------------------------//

describe('beachline module test', function(){

    let beach=new Beachline([0,0]);
    let ll=beach.getLLeafAndLParent()[0];
    let rl=beach.getRLeafAndRParent()[0];
    let arcsNodes=[ll, beach, rl];
    let newSite=[1,1]
    beach.addArc(newSite, arcsNodes);

    it('gives the node associated to the arc of the beachline that is situated directly above a given point', function(){
        expect(beach.getArcNodeOnSite([2,2])).to.equal(beach.r.l)
    })

    it('adds an arc to the beachline, placing the arcs nodes in the correct position', function(){
        expect(beach.l.item).to.eql([0,0])
        expect(beach.r.l.item).to.eql([1,1])
        expect(beach.r.r.item).to.eql([0,0])
    })

    it('adds an arc to the beachline, placing the segment nodes in the correct position', function(){
        expect(beach.item.pl).to.eql([0,0])
        expect(beach.item.pr).to.eql([1,1])
        expect(almostEqual(beach.item.ps, [1,0])).to.be(true)
        expect(beach.r.item.pl).to.eql([1,1])
        expect(beach.r.item.pr).to.eql([0,0])
        expect(almostEqual(beach.r.item.ps, [1,0])).to.be(true)
    })

    it('removes an arc from the beachline, placing the arcs nodes in the correct position', function(){
        beach.rmArc([-10, -10], [beach.l, beach.r.l, beach.r.r],[beach, beach.r]);
        expect(beach.l.item).to.eql([0,0])
        expect(beach.r.item).to.eql([0,0])
    })

    it('removes an arc from the beachline, placing the segment nodes in the correct position', function(){
        expect(beach.item.pl).to.eql([0,0])
        expect(beach.item.pr).to.eql([0,0])
        expect(beach.item.ps).to.eql([-10,-10])
    })

})


//---------------EVENT------------------------//

let sqrt2=Math.sqrt(2)
let ec=new Event([new Beachline([0,0]), new Beachline("seg1"),
    new Beachline([sqrt2,2+sqrt2]), new Beachline("seg2"),
    new Beachline([-sqrt2,2+sqrt2])], [0,2], [0,4]);

let es=[];
let coords=[[0,3], [0,5], [1,4], [6,2], [2,4], [7,4], [5,6]]
coords.forEach(function(coord){new Event(coord).add(es)})

it('build circle events', function(){
    expect(ec.coord).to.eql([0,2])
    expect(ec.vertexCoord).to.eql([0,4])
    expect(ec.arcsNodes).to.eql([new Beachline([0,0]),
        new Beachline([sqrt2,2+sqrt2]), new Beachline([-sqrt2,2+sqrt2])])
    expect(ec.edgesNodes).to.eql([new Beachline("seg1"), new Beachline("seg2")])
})

it('add events in order of y', function(){
    expect(es[0]).to.eql(new Event([6,2]))
    expect(es[es.length-1]).to.eql(new Event([5,6]))
    expect(es.length).to.be(coords.length)
})

it('removes the specified events', function(){
    es[0].rm(es)
    expect(es[0]).to.eql(new Event([0,3]))
    expect(es[es.length-1]).to.eql(new Event([5,6]))
    expect(es.length).to.be(coords.length-1)
})


//---------------VORONOI------------------------//

describe('voronoi module test', function() {

    let data = [
            {"id": "c", "point": [0, 0]},
            {"id": "dd", "point": [-1, -1]},
            {"id": "dt", "point": [-1, 1]},
            {"id": "td", "point": [1, -1]},
            {"id": "tt", "point": [1, 1]},

        ]

    let v = new Voronoi({
        data: data,
        accessor: function (x) {
            return x.point
        },
        width: 400,
        height: 200,
        xrange: [-2, 2],
        yrange: [-2, 2],
        compute: {
            indexDoubled: function(i) {return 2*i}
        }
    })
    function scalePoint(p) {
        return [v.xscale(p[0]), v.yscale(p[1])]
    }
    let points = [[0,0], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    let scaledPoints = points.map(scalePoint)

    it('gives access to the original data and associate every data with its index: ', function(){
        expect(v.curves.every(function(curve){return curve.item==data[curve.index]})).to.be(true)
        expect(v.nodes.every(function(node, i){return node.item==data[i]})).to.be(true)
    })

    it('allows to define user-defined properties', function(){
        expect(v.curves.every(function(curve){return curve.indexDoubled==2*curve.index})).to.be(true)
    })

    it('gives the x and y axis scaling functions in agreement with the specified xrange, xrange, width, height', function () {
        expect(v.xscale(-1)).to.be(100)
        expect(v.yscale(-1)).to.be(150)
    })

    it('gives a number of patches and sites equal to the number of input points', function () {
        expect(v.curves).to.have.length(5)
        expect(v.nodes).to.have.length(5)
    })

    it('gives a set of sites that is equal to the input points scaled', function () {
        v.nodes.forEach(function(node, i){expect(node.point).eql(scaledPoints[i])})
    })

    it('gives patches (polygons) with the correct extrema', function () {
        expect(v.curves[0].line.path.print().trim()).to.match(/M 100 100( L 200 150)+( L 300 100)+( L 200 50)+( L 100 100)+ Z/)
    })


})