Bar = require '../dist/node/bar.js'
expect = require 'expect.js'

data = [
  [1, 3, 2, 4, 5, 6, 8]
  [3, 1, 1, 4, 1, 5, 7]
  [4, 9, 2, 2, 3, 5, 6]
  [5, 8, 1, 2, 6, 1, 6]
  [5, 7, 3, 3, 1, 1, 4]
]

sum = (xs) ->
  xs.reduce ((a, b) -> a + b), 0

bar = Bar
  data: data
  width: 300
  height: 400
  gutter: 15

describe 'bar chart', ->
  it 'should generate as many sectors as data', ->
    expect(bar.curves).to.have.length(sum(data.map (d) -> d.length))

  it 'should contain rectangle', ->
    expect(bar.curves[18].line.path.print()).to.match(/L \d+ \d+ L \d+ \d+ L \d+ \d+/)

  it 'should generate closed curves', ->
    expect(bar.curves[5].line.path.print()).to.match(/Z/)

  it 'should give access to the original items', ->
    expect(bar.curves[13].item).to.be(data[3][2])
    expect(bar.curves[22].item).to.be(data[2][4])

  it 'should allow custom computations', ->
    constant_color = ->
      "#ffbb22"

    bar1 = Bar
      data: data
      width: 300
      height: 400
      gutter: 15
      compute:
        color: constant_color
    expect(bar1.curves[14].color).to.be("#ffbb22")

describe 'bar chart scale', ->
  it 'should take into account all data involved', ->
    expect(bar.scale(9)).to.be(0)
    expect(bar.scale(0)).to.be(400)

  it 'should allow a custom accessor function', ->
    bar1 = Bar
      data: data
      accessor: (x) -> x * x
      width: 300
      height: 400
      gutter: 15
    expect(bar1.scale(81)).to.be(0)
    expect(bar1.scale(0)).to.be(400)