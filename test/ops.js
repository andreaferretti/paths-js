import O from '../dist/node/ops.js'
import expect from 'expect.js'

let round = (x, digits = 5) => {
  let a = Math.pow(10, digits)
  return Math.round(a * x) / a
}

let roundVector = (v, digits = 5) => {
  return v.map((x) => round(x, digits))
}

describe('sum function', () => {
  it('should sum the given elements', () => {
    expect(O.sum([1, 2, 3, 4])).to.be(10)
    expect(O.sum([0, -1, 1, 3])).to.be(3)
  })

  it('should work when only one element is given', () => {
    expect(O.sum([13])).to.be(13)
  })

  it('should return 0 on an empty array', () => {
    expect(O.sum([])).to.be(0)
  })
})

describe('min function', () => {
  it('should yield the minimum of the given elements', () => {
    expect(O.min([1, 2, 3, 4])).to.be(1)
    expect(O.min([0, -1, 1, 3])).to.be(-1)
  })

  it('should work when only one element is given', () => {
    expect(O.min([13])).to.be(13)
  })
})

describe('max function', () => {
  it('should yield the maximum of the given elements', () => {
    expect(O.max([1, 2, 3, 4])).to.be(4)
    expect(O.max([0, -1, 1, 3])).to.be(3)
  })

  it('should work when only one element is given', () => {
    expect(O.max([13])).to.be(13)
  })
})

describe('sumBy function', () => {
  it('should sum the function of the given elements', () => {
    expect(O.sumBy([1, 2, 3, 4], (x) => 2 * x)).to.be(20)
    expect(O.sumBy([0, -1, 1, 3], (x) => x - 1)).to.be(-1)
  })

  it('should work when only one element is given', () => {
    expect(O.sumBy([13], (x) => 2 * x)).to.be(26)
  })

  it('should return 0 on an empty array', () => {
    expect(O.sumBy([], (x) => 1 - x)).to.be(0)
  })
})

describe('minBy function', () => {
  it('should yield the minimum of the given elements by f', () => {
    expect(O.minBy(["1", "2", "3", "4"], parseInt)).to.be(1)
    expect(O.minBy(["0", "-1", "1", "3"], parseInt)).to.be(-1)
  })

  it('should work when only one element is given', () => {
    expect(O.minBy(["13"], parseInt)).to.be(13)
  })
})

describe('maxBy function', () => {
  it('should yield the maximum of the given elements by f', () => {
    expect(O.maxBy(["1", "2", "3", "4"], parseInt)).to.be(4)
    expect(O.maxBy(["0", "-1", "1", "3"], parseInt)).to.be(3)
  })

  it('should work when only one element is given', () => {
    expect(O.maxBy(["13"], parseInt)).to.be(13)
  })
})

describe('vector sum', () => {
  it('should yield the sum of the given vectors', () => {
    expect(O.plus([1, 2], [3, 4])).to.eql([4, 6])
    expect(O.plus([0, -1], [1, 3])).to.eql([1, 2])
  })
})

describe('vector difference', () => {
  it('should yield the difference of the given vectors', () => {
    expect(O.minus([1, 2], [3, 4])).to.eql([-2, -2])
    expect(O.minus([0, -1], [1, 3])).to.eql([-1, -4])
  })
})

describe('scalar product', () => {
  it('should yield the rescaled vector', () => {
    expect(O.times(5, [3, 4])).to.eql([15, 20])
    expect(O.times(-1, [1, 3])).to.eql([-1, -3])
  })
})

describe('vector average', () => {
  it('should yield the central point of the given vectors', () => {
    expect(O.average([[3, 4], [-1, -2], [3, 5], [-5, -7]])).to.eql([0, 0])
    expect(O.average([[5, 4], [-1, 0], [3, 6], [-3, -6]])).to.eql([1, 1])
  })
})

describe('onCircle function', () => {
  it('should yield the top point when the angle is 0', () => {
    expect(O.onCircle(3, 0)).to.eql([0, -3])
  })

  it('should yield the leftmost point when the angle is pi / 2', () => {
    let point = O.onCircle(3, 3 * Math.PI / 2)
    expect(roundVector(point)).to.eql([-3, 0])
  })
})

describe('mapping objects', () => {
  it('should allow access to both keys and values', () => {
    let obj = { a: 1, b: 2 }
    expect(O.mapObject(obj, (k, v) => `${k}${v}`)).to.eql(["a1", "b2"])
  })
})

describe('object pairs', () => {
  it('should transform objects into their key/value pairs list', () => {
    let obj = { a: 1, b: 2 }
    expect(O.pairs(obj)).to.eql([["a", 1], ["b", 2]])
  })
})