{ tree_height } = require '../dist/node/tree_utils.js'
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