O = require '../dist/node/ops.js'
expect = require 'expect.js'

round = (x, digits = 5) ->
  a = Math.pow(10, digits)
  Math.round(a * x) / a

round_vector = (v, digits = 5) ->
  v.map (x) -> round(x, digits)

describe 'sum function', ->
  it 'should sum the given elements', ->
    expect(O.sum [1, 2, 3, 4]).to.be(10)
    expect(O.sum [0, -1, 1, 3]).to.be(3)

  it 'should work when only one element is given', ->
    expect(O.sum [13]).to.be(13)
    
  it 'should return 0 on an empty array', ->
    expect(O.sum []).to.be(0)
    
describe 'min function', ->
  it 'should yield the minimum of the given elements', ->
    expect(O.min [1, 2, 3, 4]).to.be(1)
    expect(O.min [0, -1, 1, 3]).to.be(-1)

  it 'should work when only one element is given', ->
    expect(O.min [13]).to.be(13)

describe 'max function', ->
  it 'should yield the maximum of the given elements', ->
    expect(O.max [1, 2, 3, 4]).to.be(4)
    expect(O.max [0, -1, 1, 3]).to.be(3)

  it 'should work when only one element is given', ->
    expect(O.max [13]).to.be(13)

describe 'vector sum', ->
  it 'should yield the sum of the given vectors', ->
    expect(O.plus [1, 2], [3, 4]).to.eql([4, 6])
    expect(O.plus [0, -1], [1, 3]).to.eql([1, 2])

describe 'vector difference', ->
  it 'should yield the difference of the given vectors', ->
    expect(O.minus [1, 2], [3, 4]).to.eql([-2, -2])
    expect(O.minus [0, -1], [1, 3]).to.eql([-1, -4])

describe 'scalar product', ->
  it 'should yield the rescaled vector', ->
    expect(O.times 5, [3, 4]).to.eql([15, 20])
    expect(O.times -1, [1, 3]).to.eql([-1, -3])

describe 'vector average', ->
  it 'should yield the central point of the given vectors', ->
    expect(O.average [[3, 4], [-1, -2], [3, 5], [-5, -7]]).to.eql([0, 0])
    expect(O.average [[5, 4], [-1, 0], [3, 6], [-3, -6]]).to.eql([1, 1])

describe 'on_circle function', ->
  it 'should yield the top point when the angle is 0', ->
    expect(O.on_circle 3, 0).to.eql([0, -3])
    
  it 'should yield the leftmost point when the angle is pi / 2', ->
    point = O.on_circle(3, 3 * Math.PI / 2)
    expect(round_vector(point)).to.eql([-3, 0])

describe 'random int', ->
  it 'should be between 0 and max', ->
    expect(O.random_int(100)).to.be.above(0)
    expect(O.random_int(357)).to.be.below(357)

  it 'should be an integer', ->
    num = O.random_int(100)
    expect(num).to.be(round(num))

describe 'random color', ->
  it 'should generate an rgb string', ->
    expect(O.random_colors()).to.match(/rgb\([\d]+, [\d]+, [\d]+\)/)
