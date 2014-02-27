SmoothLine = require '../dist/node/smooth-line.js'
Stock = require '../dist/node/stock.js'
expect = require 'expect.js'

data = [
  [
    { year: 2012, month: 1, value: 13 }
    { year: 2012, month: 2, value: 12 }
    { year: 2012, month: 3, value: 15 }
    { year: 2012, month: 4, value: 10 }
    { year: 2012, month: 5, value: 9 }
    { year: 2012, month: 6, value: 8 }
    { year: 2012, month: 7, value: 11 }
    { year: 2012, month: 8, value: 10 }
    { year: 2012, month: 9, value: 13 }
    { year: 2012, month: 10, value: 13 }
    { year: 2012, month: 11, value: 12 }
    { year: 2012, month: 12, value: 9 }
    { year: 2013, month: 1, value: 12 }
    { year: 2013, month: 2, value: 15 }
    { year: 2013, month: 3, value: 16 }
    { year: 2013, month: 4, value: 14 }
  ]
  [
    { year: 2012, month: 1, value: 21 }
    { year: 2012, month: 2, value: 22 }
    { year: 2012, month: 3, value: 22 }
    { year: 2012, month: 4, value: 20 }
    { year: 2012, month: 5, value: 19 }
    { year: 2012, month: 6, value: 18 }
    { year: 2012, month: 7, value: 22 }
    { year: 2012, month: 8, value: 19 }
    { year: 2012, month: 9, value: 19 }
    { year: 2012, month: 10, value: 18 }
    { year: 2012, month: 11, value: 16 }
    { year: 2012, month: 12, value: 15 }
    { year: 2013, month: 1, value: 16 }
    { year: 2013, month: 2, value: 18 }
    { year: 2013, month: 3, value: 19 }
    { year: 2013, month: 4, value: 18 }
  ]
]

round = (x, digits = 5) ->
  a = Math.pow(10, digits)
  Math.round(a * x) / a

round_vector = (v, digits = 5) ->
  v.map (x) -> round(x, digits)

date = (data) ->
  d = new Date()
  d.setYear(data.year)
  d.setMonth(data.month - 1)
  d.getTime()

params =
  data: data
  xaccessor: date
  yaccessor: (d) -> d.value
  width: 300
  height: 200

chart = SmoothLine(params)

describe 'smooth line chart', ->
  it 'should generate as many points as data', ->
    expect(chart.curves[0].line.path.points()).to.have.length(data[0].length)

  it 'should generate both closed and open polygons', ->
    line = chart.curves[0].line
    area = chart.curves[0].area
    expect(line.path.print()).not.to.match(/Z/)
    expect(area.path.print()).to.match(/Z/)

  it 'should generate closed and open polygons with the same points', ->
    line = chart.curves[0].line
    area = chart.curves[0].area
    expect(area.path.points().slice(0, 16)).to.eql(line.path.points())

  it 'should close area paths with two additional points on the base', ->
    line = chart.curves[0].line
    area = chart.curves[0].area
    expect(area.path.points().length).to.equal(line.path.points().length + 2)

  it 'should pass through the same points as the stock graph', ->
    line = chart.curves[0].line
    area = chart.curves[0].area
    chart1 = Stock(params)
    line1 = chart1.curves[0].line
    area1 = chart1.curves[0].area
    expect(area.path.points().map (x) -> round_vector(x)).to.eql(area1.path.points().map (x) -> round_vector(x))
    expect(line.path.points().map (x) -> round_vector(x)).to.eql(line1.path.points().map (x) -> round_vector(x))

  it 'should give access to the original items', ->
    expect(chart.curves[1].item).to.be(data[1])

  it 'should allow custom computations', ->
    constant_color = ->
      "#ffbb22"

    chart1 = SmoothLine
      data: data
      xaccessor: date
      yaccessor: (d) -> d.value
      width: 300
      height: 200
      compute:
        color: constant_color
    expect(chart1.curves[1].color).to.be("#ffbb22")

describe 'smooth line chart scales', ->
  it 'should take into account all data involved', ->
    scale = chart.yscale
    expect(scale(8)).to.be(200)
    expect(scale(22)).to.be(0)

  it 'should take into account if 0 is to be displayed as a baseline', ->
    chart1 = SmoothLine
      data: data
      xaccessor: date
      yaccessor: (d) -> d.value
      width: 300
      height: 200
      closed: true
    scale = chart1.yscale
    expect(scale(0)).to.be(200)
    expect(scale(22)).to.be(0)