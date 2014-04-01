{ root, bodies } = require '../dist/node/barnes_hut.js'
expect = require 'expect.js'


describe 'the root function', ->
  it 'should return a tree with the given box as quadrant', ->
    tree = root(300, 200)
    expect(tree).to.eql(box: { left: 0, bottom: 0, top: 200, right: 300 })

describe 'the bodies function', ->
  it 'should populate a list of bodies from a map of positions', ->
    positions =
      1: [3, 5]
      3: [-2, 8]
      4: [3, 6]
      6: [0, 0]
    expect(bodies(positions)).to.have.length(4)
    expect(bodies(positions).map (x) -> x.mass).to.eql([1, 1, 1, 1])
    expect(bodies(positions)[0].point).to.eql([3, 5])