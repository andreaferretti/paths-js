import Polygon from '../dist/node/polygon.js'
import expect from 'expect.js'

describe('polygon function', () => {
  it('should start by moving to the first point of the polygon', () => {
    let polygon = Polygon({
      points: [[1, 6], [3, 1], [7, 5], [7, 2], [3, -1]],
      closed: true
    })
    let path = polygon.path.print()
    expect(path.substring(0, 5)).to.be('M 1 6')
  })

  it('should give the same points that are fed as input', () => {
    let points = [[1, 6], [3, 1], [7, 5], [7, 2], [3, -1]]
    let polygon = Polygon({
      points: points,
      closed: true
    })
    expect(polygon.path.points()).to.eql(points)
  })

  it('should correctly handle closed and open polygons', () => {
    let points = [[-1, 3], [2, 17], [3, 5], [4, 6]]
    let polygon1 = Polygon({
      points: points,
      closed: true
    })
    let polygon2 = Polygon({
      points: points,
      closed: false
    })
    expect(polygon1.path.print()).to.match(/Z/)
    expect(polygon2.path.print()).not.to.match(/Z/)
  })

  it('should compute the expected centroid of a square', () => {
    let square = Polygon({
      points: [[-1, -1], [-1, 1], [1, 1], [1, -1]],
      closed: true
    })
    expect(square.centroid).to.eql([0, 0])
  })

  it('should compute the expected centroid of a rotated square', () => {
    let square = Polygon({
      points: [[-1, 1], [0, 0], [1, 1], [0, 2]],
      closed: true
    })
    expect(square.centroid).to.eql([0, 1])
  })

  it('should compute the expected centroid of a triangle', () => {
    let triangle = Polygon({
      points: [[0, 3], [0, 0], [-3, 0]],
      closed: true
    })
    expect(triangle.centroid).to.eql([-1, 1])
  })
})