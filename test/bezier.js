import Bezier from '../dist/node/bezier.js'
import expect from 'expect.js'

describe('bézier function', () => {
  it('should start by moving to the first point of the curve', () => {
    let bezier = Bezier({
      points: [[1, 7], [2, 0], [4, 3], [2, 5], [7, 0], [-2, -1]]
    })
    let path = bezier.path.print()
    expect(path.substring(0, 5)).to.be('M 1 7')
  })

  it('should give the same points that are fed as input', () => {
    let points = [[1, 7], [2, 0], [4, 3], [2, 5], [7, 0], [-2, -1]]
    let bezier = Bezier({ points: points })
    expect(bezier.path.points()).to.eql(points)
  })

  it('should produce open curves', () => {
    let points = [[-1, 3], [2, 17], [3, 5], [4, 6]]
    let bezier = Bezier({ points: points })
    expect(bezier.path.print()).not.to.match(/Z/)
  })

  it('should compute the expected centroid of a square', () => {
    let bezier = Bezier({ points: [[-1, -1], [-1, 1], [1, 1], [1, -1]] })
    expect(bezier.centroid).to.eql([0, 0])
  })

  it('should compute the expected centroid of a rotated square', () => {
    let bezier = Bezier({ points: [[-1, 1], [0, 0], [1, 1], [0, 2]] })
    expect(bezier.centroid).to.eql([0, 1])
  })

  it('should compute the expected centroid of a triangle', () => {
    let bezier = Bezier({ points: [[0, 3], [0, 0], [-3, 0]] })
    expect(bezier.centroid).to.eql([-1, 1])
  })

  it('should not error out on few points', () => {
    let bezier = Bezier({ points: [[1, 7], [2, 0]] })
    let path = bezier.path.print()
    expect(path.substring(0, 5)).to.be('M 1 7')
  })
})