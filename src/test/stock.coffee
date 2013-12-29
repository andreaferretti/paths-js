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

stock = Stock
  data: data
  xaccessor: date
  yaccessor: (d) -> d.value
  width: 300
  height: 200
  
describe 'stock chart', ->
  it 'should generate as many points as data', ->
    expect(stock.polygons[0].line.path.points()).to.have.length(data[0].length)

  it 'should generate both closed and open polygons', ->
    line = stock.polygons[0].line
    area = stock.polygons[0].area
    expect(line.path.print()).not.to.match(/Z/)
    expect(area.path.print()).to.match(/Z/)

  it 'should generate closed and open polygons with the same points', ->
    line = stock.polygons[0].line
    area = stock.polygons[0].area
    expect(area.path.points().slice(0, 16)).to.eql(line.path.points())

  it 'should allow custom color functions', ->
    constant_color = ->
      "#ffbb22"

    stock1 = Stock
      data: data
      xaccessor: date
      yaccessor: (d) -> d.value
      width: 300
      height: 200
      colors: constant_color
    expect(stock1.polygons[1].color).to.be("#ffbb22")

  it 'should allow not to include 0 as a baseline for area paths', ->
    points = stock.polygons[0].area.path.points().map (v) -> round_vector(v)
    # When 0 is not included, the two extremes in the area path
    # close at the same level as the minimum value, hence we find
    # 3 points with y = 200
    expect(points.filter (p) -> p[1] == 200).to.have.length(3)
    
  it 'should allow to include 0 as a baseline for area paths', ->
    stock1 = Stock
      data: data
      xaccessor: date
      yaccessor: (d) -> d.value
      width: 300
      height: 200
      closed: true
    points = stock1.polygons[0].area.path.points().map (v) -> round_vector(v)
    # When 0 is not included, only the two extremes in the area path
    # have y = 200
    expect(points.filter (p) -> p[1] == 200).to.have.length(2)
    
describe 'stock chart scales', ->
  it 'should take into account all data involved', ->
    scale = stock.yscale
    expect(scale(8)).to.be(200)
    expect(scale(22)).to.be(0)

  it 'should take into account if 0 is to be displayed as a baseline', ->
    stock1 = Stock
      data: data
      xaccessor: date
      yaccessor: (d) -> d.value
      width: 300
      height: 200
      closed: true
    scale = stock1.yscale
    expect(scale(0)).to.be(200)
    expect(scale(22)).to.be(0)
