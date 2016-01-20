import Stack from '../dist/node/stack.js'
import { sumBy } from '../dist/node/ops.js'
import expect from 'expect.js'

let data = [
  [1, 3, 2, 4, 5, 6, 8],
  [3, 1, 1, 4, 1, 5, 7],
  [4, 9, 2, 2, 3, 5, 6],
  [5, 8, 1, 2, 6, 1, 6],
  [5, 7, 3, 3, 1, 1, 4]
]

let groups = []
let max = 0

for(let [i, d] of data.entries()) {
  for(let [j, el] of d.entries()) {
    if (groups[j] == null) { groups[j] = [] }
    let last = (i === 0) ? 0 : groups[j][i - 1]
    let val = el + last
    if(val > max) { max = val }
    groups[j][i] = val
  }
}

let stack = Stack({
  data: data,
  width: 300,
  height: 400,
  gutter: 15
})

describe('stack chart', () => {
  it('should generate as many sectors as data', () => {
    expect(stack.curves).to.have.length(sumBy(data, (d) => d.length))
  })

  it('should contain rectangle', () => {
    expect(stack.curves[18].line.path.print()).to.match(/L \d+ \d+.?\d+ L \d+ \d+.?\d+ L \d+ \d+.?\d+/)
  })

  it('should generate closed curves', () => {
    expect(stack.curves[5].line.path.print()).to.match(/Z/)
  })

  it('should give access to the original items', () => {
    expect(stack.curves[23].item).to.be(data[3][2])
    expect(stack.curves[18].item).to.be(data[2][4])
  })

  it('should allow custom computations', () => {
    let stack1 = Stack({
      data: data,
      width: 300,
      height: 400,
      gutter: 15,
      compute: {
        myitem: (i, d) => d,
        myindex: (i, d) => i
      }
    })
    expect(stack1.curves[14].myitem).to.be(stack1.curves[14].item)
    expect(stack1.curves[14].myindex).to.be(stack1.curves[14].index)
  })
})

describe('stack chart scale', () => {
  it('should take into account all data involved', () => {
    expect(stack.scale(max)).to.be(0)
    expect(stack.scale(0)).to.be(400)
  })

  it('should allow a custom accessor function', () => {
    let stack1 = Stack({
      data: data,
      accessor: (x) => 2 * x,
      width: 300,
      height: 400,
      gutter: 15
    })
    expect(stack1.scale(2*max)).to.be(0)
    expect(stack1.scale(0)).to.be(400)
  })
})
