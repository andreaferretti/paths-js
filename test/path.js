import Path from '../dist/node/path.js'
import expect from 'expect.js'

let labels = (path) => {
  let regex = /([A-Z])/g
  return path.print().match(regex)
}

describe('node module import', () => {
  it('should export the correct type', () => {
    expect(Path).to.be.a('function')
  })
})

describe('path', () => {
  it('should have methods to get the points, the printed string, a copy of instructions and a method to connect paths', () => {
    let path = Path()
    expect(path).to.have.property('points')
    expect(path).to.have.property('print')
    expect(path).to.have.property('instructions')
    expect(path).to.have.property('connect')
  })

  it('should have methods corresponding the SVG path spec', () => {
    let path = Path()
    expect(path).to.have.property('moveto')
    expect(path).to.have.property('lineto')
    expect(path).to.have.property('hlineto')
    expect(path).to.have.property('vlineto')
    expect(path).to.have.property('closepath')
    expect(path).to.have.property('curveto')
    expect(path).to.have.property('qcurveto')
    expect(path).to.have.property('smoothcurveto')
    expect(path).to.have.property('smoothqcurveto')
    expect(path).to.have.property('arc')
    expect(path).to.have.property('points')
  })

  it('should ignore constructor arguments', () => {
    let path = Path([{command: 'L', params: [2, 3]}])
    expect(path.points()).to.have.length(0)
  })

  it('should ignore malformed constructor arguments', () => {
    let path = Path([{garbage: 'L', random: [2, 3]}])
    expect(path.points()).to.have.length(0)
  })
})

describe('points method', () => {
  it('should report the expected point for a moveto command', () => {
    let path = Path().moveto(2, 10)
    expect(path.points()).to.eql([[2, 10]])
  })

  it('should report the expected points for lineto commands', () => {
    let path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]])
  })

  it('should report the expected points for horizontal line commands', () => {
    let path = Path().moveto(4, 5).hlineto(3).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [3, 5], [-1, 17]])
  })

  it('should report the expected points for vertical line commands', () => {
    let path = Path().moveto(4, 5).vlineto(3).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [4, 3], [-1, 17]])
  })

  it('should not add points when closing a path', () => {
    let path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17)
    expect(path.points()).to.eql(path.closepath().points())
  })

  it('should report the expected points for curveto commands', () => {
    let path = Path().moveto(4, 5).curveto(1, 1, 2, 6, 3, 1).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]])
  })

  it('should report the expected points for smoothcurveto commands', () => {
    let path = Path().moveto(4, 5).smoothcurveto(1, 1, 3, 1).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]])
  })

  it('should report the expected points for quadratic curveto commands', () => {
    let path = Path().moveto(4, 5).qcurveto(1, 1, 6, -3).curveto(2, 1, 3, -1, -1, 17)
    expect(path.points()).to.eql([[4, 5], [6, -3], [-1, 17]])
  })

  it('should report the expected points for smoothqcurveto commands', () => {
    let path = Path().moveto(4, 5).smoothqcurveto(1, 1).lineto(1, 6)
    expect(path.points()).to.eql([[4, 5], [1, 1], [1, 6]])
  })

  it('should report the expected points for arc commands', () => {
    let path = Path().moveto(0, 1).arc(3, 3, 2, 0, 1, 6, -3).curveto(2, 1, 3, 1, -1, 17)
    expect(path.points()).to.eql([[0, 1], [6, -3], [-1, 17]])
  })

  it('should report the expected points for the translate command', () => {
    let path = Path().moveto(0, 0).arc(20, 20, 0, 0, 1, 30, 60).lineto(60, 90).lineto(0, 100).closepath()
    let path2 = path.translate(50, 20)
    expect(path2.points()).to.eql([[50, 20], [80, 80], [110, 110], [50, 120]])
  })

  it ('should report the expected points for the rotate command', () => {
    let path = Path().moveto(0, 0).arc(20, 20, 0, 0, 1, 30, 60).lineto(60, 90).lineto(0, 100).closepath()
    let path2 = path.rotate(-30, 100, 100)
    let path2Points = path2.points().map(point => [point[0].toFixed(4), point[1].toFixed(4)])
    expect(path2Points).to.eql([[-36.6025, 63.3975], [19.3782, 100.3590], [60.3590, 111.3397], [13.3975, 150.0000]])
  })

  it('should allow multiple subpaths within the same path', () => {
    let path = Path().moveto(0,0).lineto(100,0).lineto(100,100).closepath().moveto(10,70).lineto(30,40).lineto(30,70).closepath()
    expect(path.points()).to.eql([[0, 0], [100, 0], [100, 100], [10, 70], [30, 40], [30, 70]])
  })
})

describe('print method', () => {
  it('should report the expected labels for a moveto command', () => {
    let path = Path().moveto(2, 10)
    expect(labels(path)).to.eql(['M'])
  })

  it('should report the expected labels for lineto commands', () => {
    let path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17)
    expect(labels(path)).to.eql(['M', 'L', 'L'])
  })

  it('should report the expected labels for horizontal line commands', () => {
    let path = Path().moveto(4, 5).hlineto(3).lineto(-1, 17)
    expect(labels(path)).to.eql(['M', 'H', 'L'])
  })

  it('should report the expected labels for vertical line commands', () => {
    let path = Path().moveto(4, 5).vlineto(3).lineto(-1, 17)
    expect(labels(path)).to.eql(['M', 'V', 'L'])
  })

  it('should report the expected labels when closing a path', () => {
    let path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17).closepath()
    expect(labels(path)).to.eql(['M', 'L', 'L', 'Z'])
  })

  it('should report the expected labels for curveto commands', () => {
    let path = Path().moveto(4, 5).curveto(1, 1, 2, 5, 3, 1).lineto(-1, 17)
    expect(labels(path)).to.eql(['M', 'C', 'L'])
  })

  it('should report the expected labels for smoothcurveto commands', () => {
    let path = Path().moveto(4, 5).smoothcurveto(2, 5, 2, 6).lineto(-1, 17)
    expect(labels(path)).to.eql(['M', 'S', 'L'])
  })

  it('should report the expected points for quadratic curveto commands', () => {
    let path = Path().moveto(4, 5).qcurveto(0, 1, 2, 3).curveto(2, 1, 0, -1, -1, 17)
    expect(labels(path)).to.eql(['M', 'Q', 'C'])
  })

  it('should report the expected points for smooth quadratic curveto commands', () => {
    let path = Path().moveto(4, 5).smoothqcurveto(6, -3).curveto(2, 1, 0, -1, -1, 17)
    expect(labels(path)).to.eql(['M', 'T', 'C'])
  })

  it('should report the expected points for arc commands', () => {
    let path = Path().moveto(0, 1).arc(3, 3, 2, 0, 1, 6, -3).curveto(2, 1, 3, 1, -1, 17)
    expect(labels(path)).to.eql(['M', 'A', 'C'])
  })

  it('should round numbers to a few digits', () => {
    let path = Path().moveto(4, 5).qcurveto(0, 1, 1/7, 1/3).curveto(2, 1, 0, -1, -1, 17)
    expect(path.print()).to.eql('M 4 5 Q 0 1 0.142857 0.333333 C 2 1 0 -1 -1 17')
  })
})

describe('connect method', () => {
  it('should skip the move instruction in the second path if the end point of the first path is first point of second one', () => {
    let path = Path().moveto(0,0).lineto(2,20)
    let path2 = Path().moveto(2,20).lineto(3,40)
    expect(path.connect(path2).points()).to.eql([[0,0],[2,20],[3,40]])
  })

  it('should connect the end point with the first point of next path', () => {
    let path = Path().moveto(0,0).lineto(1,20)
    let path2 = Path().moveto(2,20).lineto(3,40)
    expect(path.connect(path2).points()).to.eql([[0,0],[1,20],[2,20],[3,40]])
  })

  it('should leave first path as is', () => {
    let path = Path().moveto(0,0).lineto(2,20)
    let path2 = Path().moveto(2,20).lineto(3,40)
    let path3 = path.connect(path2).points()
    expect(path.points()).to.eql([[0,0],[2,20]])
  })

  it('should leave second path as is', () => {
    let path = Path().moveto(0,0).lineto(2,20)
    let path2 = Path().moveto(2,20).lineto(3,40)
    let path3 = path.connect(path2).points()
    expect(path2.points()).to.eql([[2,20],[3,40]])
  })

  it('should allow multiple closed subpaths to be connected', () => {
    let path = Path().moveto(0,0).lineto(100,0).lineto(100,100).closepath()
    let path2 = Path().moveto(10,70).lineto(30,40).lineto(30,70).closepath()
    let path3 = path.connect(path2)
    expect(path3.points()).to.eql([[0, 0], [100, 0], [100, 100], [10, 70], [30, 40], [30, 70]])
  })
})

describe('verbose api', () => {
  it('should work the same as the short one', () => {
    let path1 = Path().moveto(2, 10).lineto(3, 5)
    let path2 = Path().moveto({x: 2, y: 10}).lineto({x: 3, y: 5})
    expect(path1.print()).to.equal(path2.print())
  })

  it('should work for all path instructions', () => {
    let path1 = Path()
      .moveto(2, 10)
      .lineto(3, 5)
      .hlineto(4)
      .vlineto(3)
      .curveto(1, 1, 2, 5, 3, 1)
      .smoothcurveto(2, 5, 2, 6)
      .qcurveto(0, 1, 2, 3)
      .smoothqcurveto(6, -3)
      .arc(3, 3, 2, 0, 1, 6, -3)
      .closepath()
    let path2 = Path()
      .moveto({ x: 2, y: 10 })
      .lineto({ x: 3, y: 5 })
      .hlineto({ x: 4 })
      .vlineto({ y: 3 })
      .curveto({ x1: 1, y1: 1, x2: 2, y2: 5, x: 3, y:1 })
      .smoothcurveto({ x2: 2, y2: 5, x: 2, y: 6 })
      .qcurveto({ x1: 0, y1: 1, x: 2, y: 3 })
      .smoothqcurveto({ x: 6, y: -3 })
      .arc({ rx: 3, ry: 3, xrot: 2, largeArcFlag: 0, sweepFlag: 1, x: 6, y: -3 })
      .closepath()
    expect(path1.print()).to.equal(path2.print())
  })

  it('should be mixable with the short one', () => {
    let path1 = Path()
      .moveto(2, 10)
      .lineto(3, 5)
      .curveto({ x1: 1, y1: 1, x2: 2, y2: 5, x: 3, y:1 })
      .smoothcurveto(2, 5, 2, 6)
      .qcurveto({ x1: 0, y1: 1, x: 2, y: 3 })
    let path2 = Path()
      .moveto({ x: 2, y: 10 })
      .lineto({ x: 3, y: 5 })
      .curveto(1, 1, 2, 5, 3, 1)
      .smoothcurveto({ x2: 2, y2: 5, x: 2, y: 6 })
      .qcurveto(0, 1, 2, 3)
    expect(path1.print()).to.equal(path2.print())
  })
})