O = require '../dist/node/ops.js'
expect = require 'expect.js'
  
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
