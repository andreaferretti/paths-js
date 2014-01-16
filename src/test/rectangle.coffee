Rectangle = require '../dist/node/rectangle.js'
expect = require 'expect.js'

describe 'rectangle shape', ->
  it 'should have four vertices', ->
    rectangle = Rectangle
      left: 0
      right: 5
      top: 3
      bottom: -1
    expect(rectangle.path.points()).to.have.length(4)

  it 'should be made of straight lines', ->
    rectangle = Rectangle
      left: 1
      right: 3
      top: 6
      bottom: 2
    expect(rectangle.path.print()).to.match(/L \d+ \d+ L \d+ \d+ L \d+ \d+/)

  it 'should be closed', ->
    rectangle = Rectangle
      left: -3
      right: 3
      top: 6
      bottom: 2
    expect(rectangle.path.print()).to.match(/Z/)

  it 'should have center halfway between the sides', ->
    rectangle = Rectangle
      left: 1
      right: 9
      top: 5
      bottom: 1
    expect(rectangle.centroid).to.eql([5, 3])
