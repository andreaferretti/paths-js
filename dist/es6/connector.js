import Path from './path'
import { average } from './ops'

export default function({start, end, tension}) {
  if(tension == null) {
    tension = 0.05
  }
  let [a, b] = start
  let [c, d] = end
  let length = (c - a) * tension
  let mid1 = [a + length, b]
  let mid2 = [c - length, d]

  return {
    path: Path().moveto(...start)
      .lineto(...mid1)
      .curveto(a + 5 * length, b, c - 5 * length, d, c - length, d)
      .lineto(...end),
    centroid: average([start, end])
  }
}