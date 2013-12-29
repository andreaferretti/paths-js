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
