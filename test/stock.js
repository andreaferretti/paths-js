import Stock from '../dist/node/stock.js'
import expect from 'expect.js'

let data = [
  [
    { year: 2012, month: 1, value: 13 },
    { year: 2012, month: 2, value: 12 },
    { year: 2012, month: 3, value: 15 },
    { year: 2012, month: 4, value: 10 },
    { year: 2012, month: 5, value: 9 },
    { year: 2012, month: 6, value: 8 },
    { year: 2012, month: 7, value: 11 },
    { year: 2012, month: 8, value: 10 },
    { year: 2012, month: 9, value: 13 },
    { year: 2012, month: 10, value: 13 },
    { year: 2012, month: 11, value: 12 },
    { year: 2012, month: 12, value: 9 },
    { year: 2013, month: 1, value: 12 },
    { year: 2013, month: 2, value: 15 },
    { year: 2013, month: 3, value: 16 },
    { year: 2013, month: 4, value: 14 }
  ],
  [
    { year: 2012, month: 1, value: 21 },
    { year: 2012, month: 2, value: 22 },
    { year: 2012, month: 3, value: 22 },
    { year: 2012, month: 4, value: 20 },
    { year: 2012, month: 5, value: 19 },
    { year: 2012, month: 6, value: 18 },
    { year: 2012, month: 7, value: 22 },
    { year: 2012, month: 8, value: 19 },
    { year: 2012, month: 9, value: 19 },
    { year: 2012, month: 10, value: 18 },
    { year: 2012, month: 11, value: 16 },
    { year: 2012, month: 12, value: 15 },
    { year: 2013, month: 1, value: 16 },
    { year: 2013, month: 2, value: 18 },
    { year: 2013, month: 3, value: 19 },
    { year: 2013, month: 4, value: 18 }
  ]
]

let round = (x, digits = 5) => {
  let a = Math.pow(10, digits)
  return Math.round(a * x) / a
}

let roundVector = (v, digits = 5) =>
  v.map((x) => round(x, digits))

let deepCopy = (x) => JSON.parse(JSON.stringify(x))

let date = (data) => {
  let d = new Date()
  d.setYear(data.year)
  d.setMonth(data.month - 1)
  return d.getTime()
}

let stock = Stock({
  data: data,
  xaccessor: date,
  yaccessor: (d) => d.value,
  width: 300,
  height: 200
})

describe('stock chart', () => {
  it('should generate as many points as data', () => {
    expect(stock.curves[0].line.path.points()).to.have.length(data[0].length)
  })

  it('should generate both closed and open polygons', () => {
    let line = stock.curves[0].line
    let area = stock.curves[0].area
    expect(line.path.print()).not.to.match(/Z/)
    expect(area.path.print()).to.match(/Z/)
  })

  it('should generate closed and open polygons with the same points', () => {
    let line = stock.curves[0].line
    let area = stock.curves[0].area
    expect(area.path.points().slice(0, 16)).to.eql(line.path.points())
  })

  it('should sort the points', () => {
    let data1 = deepCopy(data)
    let tmp = data1[0][0]
    data1[0][0] = data1[0][3]
    data1[0][3] = tmp
    let stock1 = Stock({
      data: data1,
      xaccessor: date,
      yaccessor: (d) => d.value,
      width: 300,
      height: 200
    })
    let points = stock1.curves[0].line.path.points()
    let sorted = deepCopy(points).sort(([x1, y1], [x2, y2]) => x1 - x2)
    expect(points).to.eql(sorted)
  })

  it('should allow not to sort the points', () => {
    let data1 = deepCopy(data)
    let tmp = data1[0][0]
    data1[0][0] = data1[0][3]
    data1[0][3] = tmp
    let stock1 = Stock({
      data: data1,
      xaccessor: date,
      yaccessor: (d) => d.value,
      width: 300,
      height: 200,
      sort: false
    })
    let points = stock1.curves[0].line.path.points()
    let sorted = deepCopy(points).sort(([x1, y1], [x2, y2]) => x1 - x2)
    expect(points).not.to.eql(sorted)
  })

  it('should give access to the original items', () => {
    expect(stock.curves[1].item).to.be(data[1])
  })

  it('should allow custom computations', () => {
    let stock1 = Stock({
      data: data,
      xaccessor: date,
      yaccessor: (d) => d.value,
      width: 300,
      height: 200,
      compute: {
        myitem: (i, d) => d,
        myindex: (i, d) => i
      }
    })
    expect(stock1.curves[1].myitem).to.be(stock1.curves[1].item)
    expect(stock1.curves[1].myindex).to.be(stock1.curves[1].index)
  })

  it('should allow not to include 0 as a baseline for area paths', () => {
    let points = stock.curves[0].area.path.points().map((v) => roundVector(v))
    // When 0 is not included, the two extremes in the area path
    // close at the same level as the minimum value, hence we find
    // 3 points with y = 200
    expect(points.filter((p) => p[1] === 200)).to.have.length(3)
  })

  it('should allow to include 0 as a baseline for area paths', () => {
    let stock1 = Stock({
      data: data,
      xaccessor: date,
      yaccessor: (d) => d.value,
      width: 300,
      height: 200,
      closed: true
    })
    let points = stock1.curves[0].area.path.points().map((v) => { return roundVector(v) })
    // When 0 is not included, only the two extremes in the area path
    // have y = 200
    expect(points.filter((p) => (p[1] === 200))).to.have.length(2)
  })

  it('should compute the centroid even if all y values are the same', () => {
    let stock2 = Stock({
      data: [[
        { year: 2012, month: 1, value: 13 },
        { year: 2012, month: 2, value: 13 },
        { year: 2012, month: 3, value: 13 },
        { year: 2012, month: 4, value: 13 }
      ]],
      xaccessor: date,
      yaccessor: (d) => d.value,
      width: 300,
      height: 200
    })

    expect(stock2.curves[0].area.centroid[1]).to.be(200)
  })
})

describe('stock chart scales', () => {
  it('should take into account all data involved', () => {
    let scale = stock.yscale
    expect(scale(8)).to.be(200)
    expect(scale(22)).to.be(0)
  })

  it('should use user-defined ymin and/or ymax if they are are specified', () => {
    let stock3 = Stock({
      data: [[
        { year: 2012, month: 1, value: 20 },
        { year: 2012, month: 2, value: 30 },
      ]],
      min: 10,
      max: 40,
      xaccessor: date,
      yaccessor: (d) => d.value,
      width: 300,
      height: 200
    })
    let scale = stock3.yscale
    expect(scale(10)).to.be(200)
    expect(scale(40)).to.be(0)
  })

  it('should take into account if 0 is to be displayed as a baseline', () => {
    let stock1 = Stock({
      data: data,
      xaccessor: date,
      yaccessor: (d) => d.value,
      width: 300,
      height: 200,
      closed: true
    })
    let scale = stock1.yscale
    expect(scale(0)).to.be(200)
    expect(scale(22)).to.be(0)
  })
})
