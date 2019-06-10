import Path from './path'
import { plus, onCircle } from './ops'

export default function({center, r, R, start, end}) {
  const epsilon = 10e-5
  if (Math.abs(end - 2 * Math.PI) < epsilon) {
    end = 2 * Math.PI - epsilon
  }

  let a = plus(center, onCircle(R, start))
  let b = plus(center, onCircle(R, end))
  let c = plus(center, onCircle(r, end))
  let d = plus(center, onCircle(r, start))

  let large = (end - start > Math.PI) ? 1 : 0

  let path = Path()
    .moveto(...a)
    .arc(R, R, 0, large, 1, ...b)
    .lineto(...c)
    .arc(r, r, 0, large, 0, ...d)
    .closepath()

  let midAngle = (start + end) / 2
  let midRadius = (r + R) / 2
  let centroid = plus(center, onCircle(midRadius, midAngle))

  return {
    path: path,
    centroid: centroid
  }
}