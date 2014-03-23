Tree = require '../dist/node/tree.js'
expect = require 'expect.js'


data =
  name: 1
  children: [
    {
      name: 2
      children: [
        {
          name: 4
          children: [
            {
              name: 6
              children: [
                { name: 7 }
              ]
            }
          ]
        }
        { name: 5 }
      ]
    }
    {
      name: 3
      children: [
        { name: 8 }
        { name: 9 }
      ]
    }
  ]

substrings = (word) ->
  l = word.length - 1
  if l == 0
    []
  else [0..l].map (i) ->
    if i == 0
      word[1..]
    else
      word[0..i-1] + word[i+1..l]

describe 'the tree chart', ->
  tree = Tree
    data: data
    width: 300
    height: 300

  it 'should generate the right number of connectors', ->
    expect(tree.curves).to.have.length(8)

  it 'should generate open curves', ->
    expect(tree.curves[2].connector.path.print()).not.to.match(/Z/)

  it 'should give access to the original items', ->
    expect(tree.nodes[7].item).to.eql(name: 8)

  it 'should allow a custom function to compute the children', ->
    tree1 = Tree
      data: 'hello'
      children: substrings
      width: 300
      height: 300
    expect(tree1.curves).to.have.length(205)
    expect(tree1.nodes).to.have.length(206)