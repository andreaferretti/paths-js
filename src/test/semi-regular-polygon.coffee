SemiRegularPolygon = require '../dist/node/semi-regular-polygon.js'
expect = require 'expect.js'

length = ([x, y]) ->
  Math.sqrt(x * x + y * y)

angle = ([x, y]) ->
  a = Math.atan2(x, -y)
  if a < 0 then a + 2 * Math.PI else a

round = (x, digits = 5) ->
  a = Math.pow(10, digits)
  Math.round(a * x) / a

round_vector = (v, digits = 5) ->
  v.map (x) -> round(x, digits)

describe 'semi regular polygon', ->
  it 'should place points at the right radii', ->
    radii = [2, 3, 5, 7]
    polygon = SemiRegularPolygon
      center: [0, 0]
      radii: radii
    expect(polygon.path.points().map length).to.eql(radii)

  it 'should place points at the right angles', ->
    radii = [2, 3, 5, 7, 9]
    a = 2 * Math.PI / radii.length
    angles = [0..radii.length - 1].map (i) -> a * i
    polygon = SemiRegularPolygon
      center: [0, 0]
      radii: radii
    expect(round_vector(polygon.path.points().map angle)).to.eql(round_vector angles)

  it 'should take the center into account', ->
    radii = [1, 3, 4, 2, 6]
    polygon1 = SemiRegularPolygon
      center: [1, 3]
      radii: radii
    polygon2 = SemiRegularPolygon
      center: [0, 0]
      radii: radii
    shift = ([x, y]) -> [x + 1, y + 3]
    expect(polygon1.path.points()).to.eql(polygon2.path.points().map shift)