Linear = require '../dist/node/linear.js'
expect = require 'expect.js'

describe 'linear scale', ->
  it 'should map the extremes of the source interval to those of the target', ->
    linear = Linear([-1, 3], [2, 17])
    expect(linear(-1)).to.be(2)
    expect(linear(3)).to.be(17)

  it 'should map a known point in the source interval correctly', ->
    linear = Linear([-10, 2], [0, 100])
    expect(linear(-1)).to.be(75)

  it 'should map correctly points outside the source interval', ->
    linear = Linear([0, 1], [3, 13])
    expect(linear(-1)).to.be(-7)
    expect(linear(2)).to.be(23)

describe 'linear scale inverse', ->
  it 'should compute the inverse of the original map', ->
    linear1 = Linear([-1, 3], [2, 17])
    linear2 = linear1.inverse()
    expect(linear2(2)).to.be(-1)
    expect(linear2(17)).to.be(3)

  it 'should allow to recover the original points', ->
    linear1 = Linear([0, 3], [5, 14])
    linear2 = linear1.inverse()
    expect(linear1(linear2(2))).to.be(2)
    expect(linear2(linear1(7))).to.be(7)