Path = require '../dist/node/path.js'
expect = require 'expect.js'
 
describe 'node module import', ->
  it 'should export the correct type', ->
    expect(Path).to.be.a('function')
  
describe 'path', ->
  it 'should have methods to get the points and the printed string', ->
    path = Path()
    expect(path).to.have.property('points')
    expect(path).to.have.property('print')

  it 'should report the expected point for a moveto command', ->
    path = Path().moveto(2, 10)
    expect(path.points()).to.eql([[2, 10]])

  it 'should report the expected points for lineto commands', ->
    path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17)
    expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]])
