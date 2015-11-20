import Path from './path'
import Polygon from './polygon'
import { minus, times, plus, range, average } from './ops'

let reflect = (p, q) =>
  minus(times(2, p), q)

export default function({points, tension}) {
  tension = tension || 0.3
  let diffs = []
  let l = points.length
  if (l <= 2) {
    return Polygon({points})
  }
  for (let i = 1; i <= l - 1; i++) {
    diffs.push(times(tension, minus(points[i], points[i - 1])))
  }
  let controlPoints = [plus(points[0], reflect(diffs[0], diffs[1]))]
  for (let i = 1; i <= l - 2; i++) {
    controlPoints.push(minus(points[i], average([diffs[i], diffs[i - 1]])))
  }
  controlPoints.push(minus(points[l - 1], reflect(diffs[l - 2], diffs[l - 3])))
  let c0 = controlPoints[0]
  let c1 = controlPoints[1]
  let p0 = points[0]
  let p1 = points[1]
  let path = Path()
    .moveto(...p0)
    .curveto(c0[0], c0[1], c1[0], c1[1], p1[0], p1[1])

  return {
    path: range(2, l).reduce((pt, i) => {
      let c = controlPoints[i]
      let p = points[i]
      return pt.smoothcurveto(c[0], c[1], p[0], p[1])
    }, path),
    centroid: average(points)
  }
}