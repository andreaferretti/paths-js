import Sector from '../dist/node/sector.js'
import expect from 'expect.js'

let round = (x, digits = 5) => {
  let a = Math.pow(10, digits)
  return Math.round(a * x) / a
}

let roundVector = (v, digits = 5) => {
  return v.map((x) => round(x, digits))
}

describe('sector function', () => {
  it('should pass through the expected points', () => {
    let sector = Sector({
      r: 2,
      R: 4,
      center: [1, 1],
      start: 0,
      end: Math.PI / 2
    })
    let points = sector.path.points().map(roundVector)
    let expected = [[1, -3], [5, 1], [3, 1], [1, -1]]
    expect(points).to.eql(expected)
  })

  it('should have the expected centroid', () => {
    let sector = Sector({
      r: 2,
      R: 6,
      center: [0, 0],
      start: 0,
      end: Math.PI
    })
    expect(roundVector(sector.centroid)).to.eql([4, 0])
  })

  it('should be closed', () => {
    let sector = Sector({
      r: 2,
      R: 4,
      center: [1, 1],
      start: 0,
      end: 1
    })
    expect(sector.path.print()).to.match(/Z/)
  })

  it('should pass through the center when r = 0', () => {
    let sector = Sector({
      r: 0,
      R: 3,
      center: [3, 16],
      start: 1,
      end: 2
    })
    expect(sector.path.points().filter((x) =>
      (x[0] === 3) && (x[1] === 16)
    )).to.have.length(2)
  })

  it('should have the expected large arc flag', () => {
    let sector = Sector({
      r: 0,
      R: 3,
      center: [0, 0],
      start: 0,
      end: 3 / 2 * Math.PI
    })
    expect(sector.path.print()).to.match(/A 3 3 0 1 1 -3/)
  })

  it('should be slightly smaller than a full circle when the angle is 2pi (issue #47)', () => {
    let sector = Sector({
      r: 0,
      R: 3,
      center: [0, 0],
      start: 0,
      end: 2 * Math.PI
    })
    expect(sector.path.print()).to.equal('M 0 -3 A 3 3 0 1 1 -0.0003 -3 L 0 0 A 0 0 0 1 0 0 0 Z ')
  })
})