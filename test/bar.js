import Bar from '../dist/node/bar.js'
import { sumBy } from '../dist/node/ops.js'
import expect from 'expect.js'

let data = [
  [1, 3, 2, 4, 5, 6, 8],
  [3, 1, 1, 4, 1, 5, 7],
  [4, 9, 2, 2, 3, 5, 6],
  [5, 8, 1, 2, 6, 1, 6],
  [5, 7, 3, 3, 1, 1, 4]
]

let bar = Bar({
  data: data,
  width: 300,
  height: 400,
  gutter: 15
})

describe('bar chart', () => {
  it('should generate as many sectors as data', () => {
    expect(bar.curves).to.have.length(sumBy(data, (d) => d.length))
  })

  it('should contain rectangle', () => {
    expect(bar.curves[18].line.path.print()).to.match(/L \d+ \d+ L \d+ \d+ L \d+ \d+/)
  })

  it('should generate closed curves', () => {
    expect(bar.curves[5].line.path.print()).to.match(/Z/)
  })

  it('should give access to the original items', () => {
    expect(bar.curves[13].item).to.be(data[3][2])
    expect(bar.curves[22].item).to.be(data[2][4])
  })

  it('should allow custom computations', () => {
    let bar1 = Bar({
      data: data,
      width: 300,
      height: 400,
      gutter: 15,
      compute: {
        myitem: (i, d) => d,
        myindex: (i, d) => i
      }
    })
    expect(bar1.curves[14].myitem).to.be(bar1.curves[14].item)
    expect(bar1.curves[14].myindex).to.be(bar1.curves[14].index)
  })
})

describe('bar chart scale', () => {
  it('should take into account all data involved', () => {
    expect(bar.scale(9)).to.be(0)
    expect(bar.scale(0)).to.be(400)
  })

  it('should allow a custom accessor function', () => {
    let bar1 = Bar({
      data: data,
      accessor: (x) => x * x,
      width: 300,
      height: 400,
      gutter: 15
    })
    expect(bar1.scale(81)).to.be(0)
    expect(bar1.scale(0)).to.be(400)
  })

  it('should use user-defined ymin and/or ymax if they are are specified', () => {
    let bar1 = Bar({
      data: data,
      width: 300,
      height: 400,
      gutter: 15,
      max: 8,
      min: -1
    })
    let scale = bar1.scale
    expect(scale(-1)).to.be(400)
    expect(scale(8)).to.be(0)
  })
})