Radar = require '../dist/node/radar.js'
expect = require 'expect.js'

data = [
  { hp: 45, attack: 49, defense: 49, sp_attack: 65, sp_defense: 65, speed: 45 }
  { hp: 60, attack: 62, defense: 63, sp_attack: 80, sp_defense: 80, speed: 60 }
  { hp: 80, attack: 82, defense: 83, sp_attack: 100, sp_defense: 100, speed: 80 }
  { hp: 45, attack: 25, defense: 50, sp_attack: 25, sp_defense: 25, speed: 35 }
  { hp: 58, attack: 64, defense: 58, sp_attack: 80, sp_defense: 65, speed: 80 }
  { hp: 44, attack: 48, defense: 65, sp_attack: 50, sp_defense: 64, speed: 43 }
  { hp: 79, attack: 83, defense: 100, sp_attack: 85, sp_defense: 105, speed: 78 }
  { hp: 60, attack: 45, defense: 50, sp_attack: 90, sp_defense: 80, speed: 70 }
]

key_accessor = (keys) ->
  a = {}
  for key in keys
    ((k) -> (a[k] = (o) -> o[k]))(key)
  a

describe 'radar chart', ->
  it 'should generate as many polygons as data', ->
    radar = Radar
      data: data
      center: [1, 1]
      r: 10
    expect(radar.curves).to.have.length(data.length)

  it 'should generate closed polygons', ->
    radar = Radar
      data: data
      center: [1, 1]
      r: 10
    expect(radar.curves[4].polygon.path.print()).to.match(/Z/)

  it 'should have by default as many sides as data properties', ->
    radar = Radar
      data: data
      center: [1, 1]
      r: 10
    expect(radar.curves[0].polygon.path.points()).to.have.length(6)

  it 'should use the given key accessor', ->
    radar = Radar
      data: data
      accessor: key_accessor(['attack', 'defense', 'speed'])
      center: [1, 1]
      r: 10
    expect(radar.curves[0].polygon.path.points()).to.have.length(3)

  it 'should give access to the original items', ->
    radar = Radar
      data: data
      center: [1, 1]
      r: 10
    expect(radar.curves[3].item).to.be(data[3])

  it 'should allow custom computations', ->
    radar = Radar
      data: data
      center: [1, 1]
      r: 10
      compute:
        myitem: (i, d) -> d
        myindex: (i, d) -> i
    expect(radar.curves[3].myitem).to.be(radar.curves[3].item)
    expect(radar.curves[3].myindex).to.be(radar.curves[3].index)

describe 'radar chart rings', ->
  it 'should be as many as specified', ->
    radar = Radar
      data: data
      center: [1, 1]
      r: 5
      rings: 4
    expect(radar.rings).to.have.length(4)

  it 'should be centered at the given center', ->
    radar = Radar
      data: data
      center: [2, 3]
      r: 5
    expect(radar.rings[0].centroid).to.eql([2, 3])

  it 'should enclose the given chart', ->
    radar = Radar
      data: data
      center: [0, 0]
      rings: 3
      r: 5
    expect(radar.rings[2].path.points()[0]).to.eql([0, -5])
