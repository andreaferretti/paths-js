import Sankey from '../dist/node/sankey.js'
import CurvedRectangle from '../dist/node/curved-rectangle.js'
import expect from 'expect.js'

let data = {
  nodes: [
    ["pippo", "paperino"],
    ["pluto", "ciccio", "nonna papera"],
    ["minnie", "gastone"]
  ],
  links: [
    {
      start: "pippo",
      end: "pluto",
      weight: 100
    },
    {
      start: "pippo",
      end: "minnie",
      weight: 50
    },
    {
      start: "paperino",
      end: "gastone",
      weight: 60
    }
  ]
}

let width = 300
let height = 400
let rectWidth = 10

let curvRectData = {
  topleft: [rectWidth, 0],
  topright: [width - rectWidth, 0],
  bottomleft: [rectWidth, height],
  bottomright: [width - rectWidth, height]
}

let cRect = CurvedRectangle(curvRectData)

let sankey = Sankey({
  data: data,
  width: width,
  height: height,
  rectWidth: rectWidth,
  gutter: 10,
  compute: {
    myitem: (i, d) => d,
    myindex: (i) => i,
    mygroup: (i, d, g) => g
  }
})

describe('sankey diagram', () => {
  it('should generate as many rectangles as data nodes', () => {
    expect(sankey.rectangles).to.have.length(7)
  })

  it('should generate as many curved rectangles as data links', () => {
    expect(sankey.curvedRectangles).to.have.length(3)
  })

  it('should include the group number', () => {
    expect(sankey.rectangles[4].group).to.be(1)
  })

  it('should allow custom computations', () => {
    expect(sankey.rectangles[2].myitem).to.be(sankey.rectangles[2].item)
    expect(sankey.curvedRectangles[2].myindex).to.be(sankey.curvedRectangles[2].index)
    expect(sankey.rectangles[5].mygroup).to.be(sankey.rectangles[5].group)
  })
})