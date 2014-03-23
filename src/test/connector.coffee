Connector = require '../dist/node/connector.js'
expect = require 'expect.js'

describe 'connector shape', ->
  it 'should pass through four points', ->
    connector = Connector
      start: [1, 3]
      end: [3, -2]
    expect(connector.path.points()).to.have.length(4)

  it 'should start and end at the given points', ->
    connector = Connector
      start: [2, 7]
      end: [5, -1]
    expect(connector.path.points()[0]).to.eql([2, 7])
    expect(connector.path.points()[3]).to.eql([5, -1])

  it 'should be made of two straight lines and a bezier curve', ->
    connector = Connector
      start: [2, 7]
      end: [5, 5]
    expect(connector.path.print()).to.match(/L .* C .* L .*/)

  it 'should be open', ->
    connector = Connector
      start: [0, 2]
      end: [3, 4]
    expect(connector.path.print()).not.to.match(/Z/)

  it 'should have center halfway between the endpoints', ->
    connector = Connector
      start: [0, 4]
      end: [6, -2]
    expect(connector.centroid).to.eql([3, 1])
