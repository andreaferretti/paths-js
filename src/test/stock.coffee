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
