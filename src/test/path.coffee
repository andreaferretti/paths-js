path = require '../dist/node/path.js'
expect = require 'expect.js'
 
describe 'first test', ->
  it 'should work', ->
    expect(typeof path).to.be('function')
