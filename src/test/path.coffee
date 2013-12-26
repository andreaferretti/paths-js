Path = require '../dist/node/path.js'
expect = require 'expect.js'

console.log expect
 
describe 'node module import', ->
  it 'should export the correct type', ->
    expect(Path).to.be.a('function')
  
describe 'path', ->
  it 'should have methods to get the points and the printed string', ->
    path = Path()
    expect(path).to.have.property('points')
    expect(path).to.have.property('print')

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
    path = Path().moveto(4, 5).curveto(1, 1, 3, 1).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]])

  it 'should report the expected points for quadratic curveto commands', ->
    path = Path().moveto(4, 5).qcurveto(6, -3).curveto(2, 1, -1, 17)
    expect(path.points()).to.eql([[4, 5], [6, -3], [-1, 17]])
    
  it 'should report the expected points for arc commands', ->
    path = Path().moveto(0, 1).arc(3, 3, 2, 0, 1, 6, -3).curveto(2, 1, -1, 17)
    expect(path.points()).to.eql([[0, 1], [6, -3], [-1, 17]])
