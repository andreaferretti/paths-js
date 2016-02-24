import Path from './path2'
import { plus, onCircle } from './ops'

export default function({center, r, R, start, end}) {
  let a = plus(center, onCircle(R, start))
  let b = plus(center, onCircle(R, end))
  let c = plus(center, onCircle(r, end))
  let d = plus(center, onCircle(r, start))

  let large = (end - start > Math.PI) ? 1 : 0

  let path = Path()
    .moveto({x: a[0], y: a[1]}, true)
    .arc({rx: R, ry: R, xrot: 0, largeArcFlag: large, sweepFlag: 1, x: b[0], y: b[1]}, true)
    .lineto({x: c[0], y: c[1]}, true)
    .arc({rx: r, ry: r, xrot: 0, largeArcFlag: large, sweepFlag: 0, x: d[0], y: d[1]}, true)
    .closepath(null, true)

  let midAngle = (start + end) / 2
  let midRadius = (r + R) / 2
  let centroid = plus(center, onCircle(midRadius, midAngle))

  return {
    path: path,
    centroid: centroid
  }
}