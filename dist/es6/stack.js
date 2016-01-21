import Linear from './linear'
import Rectangle from './rectangle'
import { id, enhance } from './ops'

export default function({data, accessor = id, width, height, min, max, gutter = 10, compute}){
  let groups = []
  let minUnset = false
  let maxUnset = false
  if (min == null) { min = 0; minUnset = true }
  if (max == null) { max = 0; maxUnset = true }

  for(let [i, d] of data.entries()) {
    for(let [j, el] of d.entries()) {
      if (groups[j] == null) { groups[j] = [] }
      let last = (i === 0) ? 0 : groups[j][i - 1]
      let val = accessor(el) + last
      if (minUnset && (val < min)) { min = val }
      if (maxUnset && (val > max)) { max = val }
      groups[j][i] = val
    }
  }

  let n = data[0].length
  let scale = Linear([min, max], [height, 0])
  let barWidth = (width - (n - 1) * gutter) / n
  let curves = []

  for (let [i, d] of data.entries()) {
    for (let [j, el] of d.entries()) {
      let curve = {
        line: Rectangle({
          top: scale(groups[j][i]),
          bottom: (i === 0) ? scale(0) : scale(groups[j][i - 1]),
          left: j * (barWidth + gutter),
          right: j * (barWidth + gutter) + barWidth
        }),
        index: j,
        group: i,
        item: el
      }
      curves.push(enhance(compute, curve))
    }
  }

  return { curves, scale }
}