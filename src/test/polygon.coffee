Polygon = require '../dist/node/polygon.js'
expect = require 'expect.js'

is_closed = (polygon) ->
  /Z/.test(polygon.path.print())
  
describe 'polygon function', ->
  it 'should start by moving to the first point of the polygon', ->
    polygon = Polygon
      points: [[1, 6], [3, 1], [7, 5], [7, 2], [3, -1]]
      closed: true
    path = polygon.path.print()
    expect(path.substring(0, 5)).to.be('M 1 6')
    
  it 'should correctly handle closed and open polygons', ->
    points = [[-1, 3], [2, 17], [3, 5], [4, 6]]
    polygon1 = Polygon
      points: points
      closed: true
    polygon2 = Polygon
      points: points
      closed: false
    expect(is_closed(polygon1)).to.be(true)
    expect(is_closed(polygon2)).to.be(false)

  it 'should compute the expected centroid of a square', ->
    square = Polygon
      points: [[-1, -1], [-1, 1], [1, 1], [1, -1]]
      closed: true
    expect(square.centroid).to.eql([0, 0])

  it 'should compute the expected centroid of a rotated square', ->
    square = Polygon
      points: [[-1, 1], [0, 0], [1, 1], [0, 2]]
      closed: true
    expect(square.centroid).to.eql([0, 1])

  it 'should compute the expected centroid of a triangle', ->
    triangle = Polygon
      points: [[0, 3], [0, 0], [-3, 0]]
      closed: true
    expect(triangle.centroid).to.eql([-1, 1])
