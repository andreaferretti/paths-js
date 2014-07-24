Path = require '../dist/node/path.js'
expect = require 'expect.js'

labels = (path) ->
  regex = /([A-Z])/g
  path.print().match regex

describe 'node module import', ->
  it 'should export the correct type', ->
    expect(Path).to.be.a('function')

describe 'path', ->
  it 'should have methods to get the points, the printed string, a copy of instructions and a method to connect paths', ->
    path = Path()
    expect(path).to.have.property('points')
    expect(path).to.have.property('print')
    expect(path).to.have.property('instructions')
    expect(path).to.have.property('connect')

  it 'should have methods corresponding the SVG path spec', ->
    path = Path()
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

  it 'should ignore constructor arguments', ->
    path = Path([{command: 'L', params: [2, 3]}])
    expect(path.points()).to.have.length(0)

  it 'should ignore malformed constructor arguments', ->
    path = Path([{garbage: 'L', random: [2, 3]}])
    expect(path.points()).to.have.length(0)

describe 'points method', ->
  it 'should report the expected point for a moveto command', ->
    path = Path().moveto(2, 10)
    expect(path.points()).to.eql([[2, 10]])

  it 'should report the expected points for lineto commands', ->
    path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]])

  it 'should report the expected points for horizontal line commands', ->
    path = Path().moveto(4, 5).hlineto(3).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [3, 5], [-1, 17]])

  it 'should report the expected points for vertical line commands', ->
    path = Path().moveto(4, 5).vlineto(3).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [4, 3], [-1, 17]])

  it 'should not add points when closing a path', ->
    path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17)
    expect(path.points()).to.eql(path.closepath().points())

  it 'should report the expected points for curveto commands', ->
    path = Path().moveto(4, 5).curveto(1, 1, 2, 6, 3, 1).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]])

  it 'should report the expected points for smoothcurveto commands', ->
    path = Path().moveto(4, 5).smoothcurveto(1, 1, 3, 1).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]])

  it 'should report the expected points for quadratic curveto commands', ->
    path = Path().moveto(4, 5).qcurveto(1, 1, 6, -3).curveto(2, 1, 3, -1, -1, 17)
    expect(path.points()).to.eql([[4, 5], [6, -3], [-1, 17]])

  it 'should report the expected points for smoothqcurveto commands', ->
    path = Path().moveto(4, 5).smoothqcurveto(1, 1).lineto(1, 6)
    expect(path.points()).to.eql([[4, 5], [1, 1], [1, 6]])

  it 'should report the expected points for arc commands', ->
    path = Path().moveto(0, 1).arc(3, 3, 2, 0, 1, 6, -3).curveto(2, 1, 3, 1, -1, 17)
    expect(path.points()).to.eql([[0, 1], [6, -3], [-1, 17]])

describe 'print method', ->
  it 'should report the expected labels for a moveto command', ->
    path = Path().moveto(2, 10)
    expect(labels path).to.eql(['M'])

  it 'should report the expected labels for lineto commands', ->
    path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17)
    expect(labels path).to.eql(['M', 'L', 'L'])

  it 'should report the expected labels for horizontal line commands', ->
    path = Path().moveto(4, 5).hlineto(3).lineto(-1, 17)
    expect(labels path).to.eql(['M', 'H', 'L'])

  it 'should report the expected labels for vertical line commands', ->
    path = Path().moveto(4, 5).vlineto(3).lineto(-1, 17)
    expect(labels path).to.eql(['M', 'V', 'L'])

  it 'should report the expected labels when closing a path', ->
    path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17).closepath()
    expect(labels path).to.eql(['M', 'L', 'L', 'Z'])

  it 'should report the expected labels for curveto commands', ->
    path = Path().moveto(4, 5).curveto(1, 1, 2, 5, 3, 1).lineto(-1, 17)
    expect(labels path).to.eql(['M', 'C', 'L'])

  it 'should report the expected labels for smoothcurveto commands', ->
    path = Path().moveto(4, 5).smoothcurveto(2, 5, 2, 6).lineto(-1, 17)
    expect(labels path).to.eql(['M', 'S', 'L'])

  it 'should report the expected points for quadratic curveto commands', ->
    path = Path().moveto(4, 5).qcurveto(0, 1, 2, 3).curveto(2, 1, 0, -1, -1, 17)
    expect(labels path).to.eql(['M', 'Q', 'C'])

  it 'should report the expected points for smooth quadratic curveto commands', ->
    path = Path().moveto(4, 5).smoothqcurveto(6, -3).curveto(2, 1, 0, -1, -1, 17)
    expect(labels path).to.eql(['M', 'T', 'C'])

  it 'should report the expected points for arc commands', ->
    path = Path().moveto(0, 1).arc(3, 3, 2, 0, 1, 6, -3).curveto(2, 1, 3, 1, -1, 17)
    expect(labels path).to.eql(['M', 'A', 'C'])

describe 'points method', ->
  it 'should skip the move instruction in the second path if the end point of the first path is first point of second one', ->
    path = Path().moveto(0,0).lineto(2,20)
    path2 = Path().moveto(2,20).lineto(3,40)
    expect(path.connect(path2).points()).to.eql([[0,0],[2,20],[3,40]])

  it 'should connect the end point with the first point of next path', ->
    path = Path().moveto(0,0).lineto(1,20)
    path2 = Path().moveto(2,20).lineto(3,40)
    expect(path.connect(path2).points()).to.eql([[0,0],[1,20],[2,20],[3,40]])

  it 'should leave first path as is', ->
    path = Path().moveto(0,0).lineto(2,20)
    path2 = Path().moveto(2,20).lineto(3,40)
    path3 = path.connect(path2).points()
    expect(path.points()).to.eql([[0,0],[2,20]])

  it 'should leave second path as is', ->
    path = Path().moveto(0,0).lineto(2,20)
    path2 = Path().moveto(2,20).lineto(3,40)
    path3 = path.connect(path2).points()
    expect(path2.points()).to.eql([[2,20],[3,40]])

describe 'verbose api', ->
  it 'should work the same as the short one', ->
    path1 = Path().moveto(2, 10).lineto(3, 5)
    path2 = Path().moveto({x: 2, y: 10}).lineto({x: 3, y: 5})
    expect(path1.print()).to.equal(path2.print())

  it 'should work for all path instructions', ->
    path1 = Path()
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
    path2 = Path()
      .moveto(x: 2, y: 10)
      .lineto(x: 3, y: 5)
      .hlineto(x: 4)
      .vlineto(y: 3)
      .curveto(x1: 1, y1: 1, x2: 2, y2: 5, x: 3, y:1)
      .smoothcurveto(x2: 2, y2: 5, x: 2, y: 6)
      .qcurveto(x1: 0, y1: 1, x: 2, y: 3)
      .smoothqcurveto(x: 6, y: -3)
      .arc(rx: 3, ry: 3, xrot: 2, large_arc_flag: 0, sweep_flag: 1, x: 6, y: -3)
      .closepath()
    expect(path1.print()).to.equal(path2.print())

  it 'should be mixable with the short one', ->
    path1 = Path()
      .moveto(2, 10)
      .lineto(3, 5)
      .curveto(x1: 1, y1: 1, x2: 2, y2: 5, x: 3, y:1)
      .smoothcurveto(2, 5, 2, 6)
      .qcurveto(x1: 0, y1: 1, x: 2, y: 3)
    path2 = Path()
      .moveto(x: 2, y: 10)
      .lineto(x: 3, y: 5)
      .curveto(1, 1, 2, 5, 3, 1)
      .smoothcurveto(x2: 2, y2: 5, x: 2, y: 6)
      .qcurveto(0, 1, 2, 3)
    expect(path1.print()).to.equal(path2.print())