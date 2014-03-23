{ tree_height, build_tree } = require '../dist/node/tree_utils.js'
expect = require 'expect.js'

describe 'the tree height function', ->
  it 'should return 1 for a single node tree', ->
    expect(tree_height(name: 'root')).to.be(1)

  it 'should return the expected height', ->
    tree =
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

    expect(tree_height(tree)).to.be(5)


describe 'the build tree function', ->
  it 'should return an object with the "children" property', ->
    data =
      name: 'a'
      descendants: ['b', 'c']
    tree = build_tree data, (x) -> x.descendants
    expect(tree).to.have.property('children')

  it 'should populate the "level" property', ->
    data =
      name: 'a'
      descendants: ['b', 'c']
    tree = build_tree data, (x) -> x.descendants
    expect(tree.level).to.be(0)
    expect(tree.children.map (c) -> c.level).to.eql([1, 1])

  it 'should take into account a function to compute the children', ->
    data = 'hello'
    children = (word) ->
      l = word.length - 1
      if l == 0
        []
      else [0..l].map (i) ->
        if i == 0
          word[1..]
        else
          word[0..i-1] + word[i+1..l]
    tree = build_tree data, children
    expect(tree_height(tree)).to.be(5)