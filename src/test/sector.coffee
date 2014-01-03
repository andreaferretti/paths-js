Sector = require '../dist/node/sector.js'
expect = require 'expect.js'

round = (x, digits = 5) ->
  a = Math.pow(10, digits)
  Math.round(a * x) / a

round_vector = (v, digits = 5) ->
  v.map (x) -> round(x, digits)

describe 'sector function', ->
  it 'should pass through the expected points', ->
    sector = Sector
      r: 2
      R: 4
      center: [1, 1]
      start: 0
      end: Math.PI / 2
    points = sector.path.points().map round_vector
    expected = [[1, -3], [5, 1], [3, 1], [1, -1]]
    expect(points).to.eql(expected)

  it 'should have the expected centroid', ->
    sector = Sector
      r: 2
      R: 6
      center: [0, 0]
      start: 0
      end: Math.PI
    expect(round_vector(sector.centroid)).to.eql([4, 0])

  it 'should be closed', ->
    sector = Sector
      r: 2
      R: 4
      center: [1, 1]
      start: 0
      end: 1
    expect(sector.path.print()).to.match(/Z/)

  it 'should pass through the center when r = 0', ->
    sector = Sector
      r: 0
      R: 3
      center: [3, 16]
      start: 1
      end: 2
    expect(sector.path.points().filter (x) -> x[0] == 3 and x[1] == 16).to.have.length(2)
