import SemiRegularPolygon from '../dist/node/semi-regular-polygon.js'
import { range } from '../dist/node/ops.js'
import expect from 'expect.js'

let length = ([x, y]) => Math.sqrt(x * x + y * y)

let angle = ([x, y]) => {
  let a = Math.atan2(x, -y)
  return a < 0 ? a + 2 * Math.PI : a
}

let round = (x, digits = 5) => {
  let a = Math.pow(10, digits)
  return Math.round(a * x) / a
}

let roundVector = (v, digits = 5) =>
  v.map((x) => round(x, digits))


describe('semi regular polygon', () => {
  it('should place points at the right radii', () => {
    let radii = [2, 3, 5, 7]
    let polygon = SemiRegularPolygon({
      center: [0, 0],
      radii: radii
    })
    expect(polygon.path.points().map(length)).to.eql(radii)
  })

  it('should place points at the right angles', () => {
    let radii = [2, 3, 5, 7, 9]
    let a = 2 * Math.PI / radii.length
    let angles = range(0, radii.length).map((i) => a * i)
    let polygon = SemiRegularPolygon({
      center: [0, 0],
      radii: radii
    })
    expect(roundVector(polygon.path.points().map(angle))).to.eql(roundVector(angles))
  })

  it('should take the center into account', () => {
    let radii = [1, 3, 4, 2, 6]
    let polygon1 = SemiRegularPolygon({
      center: [1, 3],
      radii: radii
    })
    let polygon2 = SemiRegularPolygon({
      center: [0, 0],
      radii: radii
    })
    let shift = ([x, y]) => [x + 1, y + 3]
    expect(polygon1.path.points()).to.eql(polygon2.path.points().map(shift))
  })
})