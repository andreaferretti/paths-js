import Path from './path2'
import { average } from './ops'

export default function({points, closed}) {
  let l = points.length
  let [a, b] = points[0]
  let tail = points.slice(1, l + 1)
  let path = tail.reduce(
    (pt, [c, d]) => pt.lineto({x: c, y: d}, true),
    Path().moveto({x: a, y: b}, true)
  )

  return {
    path: closed ? path.closepath(null, true) : path,
    centroid: average(points)
  }
}
