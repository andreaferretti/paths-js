import Linear from './linear'
import Rectangle from './rectangle'
import { id, enhance } from './ops'

export default function({data, accessor = id, width, height, min, max, gutter = 10, offset = [0, 0], compute}) {
  let groups = []
  let minUnset = false
  let maxUnset = false
  if (min == null) { min = 0; minUnset = true }
  if (max == null) { max = 0; maxUnset = true }
  let [offX, offY] = offset

  for(let [i, d] of data.entries()) {
    for(let [j, el] of d.entries()) {
      let val = accessor(el)
      if (minUnset && (val < min)) { min = val }
      if (maxUnset && (val > max)) { max = val }
      if (groups[j] == null) {
        groups[j] = []
      }
      groups[j][i] = val
    }
  }

  let n = groups.length
  let groupWidth = (width - gutter * (n - 1)) / n
  let curves = []
  let scale = Linear([min, max], [height + offY, offY])

  for(let [i, g] of groups.entries()) {
    let w = groupWidth / g.length
    let shift = (groupWidth + gutter) * i + offX
    for(let [j, el] of g.entries()) {
      let left = shift + w * j
      let right = left + w
      let bottom = scale(0)
      let top = scale(el)
      let line = Rectangle({left: left, right: right, bottom: bottom, top: top})
      curves.push(enhance(compute, {
        item: data[j][i],
        line: line,
        group: i,
        index: j
      }))
    }
  }

  return { curves, scale }
}