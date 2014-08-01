CurvedRectangle = require '../dist/node/curved-rectangle.js'
expect = require 'expect.js'

describe 'polygon function', ->
  it 'should start by moving to the first point of the curved rectangle', ->
    curvedRectangle = CurvedRectangle
      topleft: [1,1]
      topright: [4,1]
      bottomleft: [1,5]
      bottomright: [4,5]
    path = curvedRectangle.path.print()
    expect(path.substring(0, 5)).to.be('M 1 1')

  it 'should be a closed shape', ->
    curvedRectangle = CurvedRectangle
      topleft: [1,1]
      topright: [4,1]
      bottomleft: [1,5]
      bottomright: [4,5]
    expect(curvedRectangle.path.print()).to.match(/Z/)

  it 'should compute the expected centroid of a square', ->
    square = CurvedRectangle
      topleft: [0,0]
      topright: [2,0]
      bottomleft: [0,2]
      bottomright: [2,2]
    expect(square.centroid).to.eql([1, 1])

  it 'should compute the expected centroid of a shape', ->
    curvedRectangle = CurvedRectangle
      topleft: [0,0]
      topright: [6,0]
      bottomleft: [0,3]
      bottomright: [6,5]
    expect(curvedRectangle.centroid).to.eql([3, 2])