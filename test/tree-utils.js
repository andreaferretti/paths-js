import { treeHeight, buildTree, collect, setHeight } from '../dist/node/tree-utils.js'
import { range } from '../dist/node/ops.js'
import expect from 'expect.js'

let substrings = (word) => {
  let l = word.length
  if (l === 1) { return [] }
  else {
    return range(0, l).map((i) =>
    (i === 0) ?
      word.substring(1, l) :
      word.substring(0, i) + word.substring(i + 1, l)
    )
  }
}

describe('the tree height function', () => {
  it('should return 1 for a single node tree', () => {
    expect(treeHeight({ name: 'root' })).to.be(1)
  })

  it('should return the expected height', () => {
    let tree = {
      name: 1,
      children: [
        {
          name: 2,
          children: [
            {
              name: 4,
              children: [
                {
                  name: 6,
                  children: [
                    { name: 7 }
                  ]
                }
              ]
            },
            { name: 5 }
          ]
        },
        {
          name: 3,
          children: [
            { name: 8 },
            { name: 9 }
          ]
        }
      ]
    }

    expect(treeHeight(tree)).to.be(5)
  })
})


describe('the build tree function', () => {
  it('should return an object with the "children" property', () => {
    let data = {
      name: 'a',
      descendants: ['b', 'c']
    }
    let tree = buildTree(data, (x) => x.descendants)
    expect(tree).to.have.property('children')
  })

  it('should populate the "level" property', () => {
    let data = {
      name: 'a',
      descendants: ['b', 'c']
    }
    let tree = buildTree(data, (x) => x.descendants)
    expect(tree.level).to.be(0)
    expect(tree.children.map((c) => c.level)).to.eql([1, 1])
  })

  it('should take into account a function to compute the children', () => {
    let data = 'hello'
    let tree = buildTree(data, substrings)
    expect(treeHeight(tree)).to.be(5)
  })
})

describe('the collect function', () => {
  let tree = {
    name: 'a',
    children: [
      { name: 'b' },
      { name: 'c', children: [{name: 'd'}, {name: 'e'}]}
    ]
  }

  it('should accumulate a function along the edges', () => {
    let list = collect(tree, (p, c) => c)
    expect(list.map((x) => x.name)).to.eql(['b', 'c', 'd', 'e'])
  })

  it('take the parent into account', () => {
    let list = collect(tree, (p, c) => p)
    expect(list.map((x) => x.name)).to.eql(['a', 'a', 'c', 'c'])
  })
})

 describe('the set height function', () => {
   it('should assign distinct consecutive numbers on each level', () => {
     let tree = buildTree('hello', substrings)
     setHeight(tree)
     let pairs = collect(tree, (p, c) => [c.level, c.height])
     let heightsAtLevel2 = pairs.filter(([l, h]) => l === 2).map(([l, h]) => h)
     expect(heightsAtLevel2).to.eql(range(0, 20))
   })

   it('should return the maximum heights found on each level', () => {
     let tree = buildTree('hello', substrings)
     let heights = setHeight(tree)
     expect(heights).to.eql([1 - 1, 5 - 1, 20 - 1, 60 - 1, 120 - 1])
   })
 })