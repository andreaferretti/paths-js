{ tree_height, build_tree, collect, set_height } = require '../dist/node/tree_utils.js'
expect = require 'expect.js'

substrings = (word) ->
  l = word.length - 1
  if l == 0
    []
  else [0..l].map (i) ->
    if i == 0
      word[1..]
    else
      word[0..i-1] + word[i+1..l]

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
    tree = build_tree data, substrings
    expect(tree_height(tree)).to.be(5)

describe 'the collect function', ->
  tree =
    name: 'a'
    children: [
      { name: 'b' }
      { name: 'c', children: [{name: 'd'}, {name: 'e'}]}
    ]

  it 'should accumulate a function along the edges', ->
    list = collect tree, (p, c) -> c
    expect(list.map (x) -> x.name).to.eql(['b', 'c', 'd', 'e'])

  it 'take the parent into account', ->
    list = collect tree, (p, c) -> p
    expect(list.map (x) -> x.name).to.eql(['a', 'a', 'c', 'c'])

describe 'the set height function', ->
  it 'should assign distinct consecutive numbers on each level', ->
    tree = build_tree 'hello', substrings
    set_height(tree)
    pairs = collect tree, (p, c) -> [c.level, c.height]
    heights_at_level_2 = pairs.filter(([l, h]) -> l == 2).map(([l, h]) -> h)
    expect(heights_at_level_2).to.eql([0..19])

  it 'should return the maximum heights found on each level', ->
    tree = build_tree 'hello', substrings
    heights = set_height(tree)
    expect(heights).to.eql([1 - 1, 5 - 1, 20 - 1, 60 - 1, 120 - 1])