import Linear from './linear'
import Rectangle from './rectangle'
import { enhance } from './ops'

export default function({data, accessor, width, height, gutter = 0, compute}) {
  if (accessor == null) {
    accessor = (x) => x
  }
  let groups = []
  let min = 0
  let max = 0

  for(let [i, d] of data.entries()) {
    for(let [j, el] of d.entries()) {
      let val = accessor(el)
      if(val < min) {
        min = val
      }
      if(val > max) {
        max = val
      }
      if (groups[j] == null) {
        groups[j] = []
      }
      groups[j][i] = val
    }
  }

  let n = groups.length
  let groupWidth = (width - gutter * (n - 1)) / n
  let curves = []
  let scale = Linear([min, max], [height, 0])

  for(let [i, g] of groups.entries()) {
    let w = groupWidth / g.length
    let shift = (groupWidth + gutter) * i
    for(let [j, el] of g.entries()) {
      let left = shift + w * j
      let right = left + w
      let bottom = scale(0)
      let top = scale(el)
      let line = Rectangle({left: left, right: right, bottom: bottom, top: top})
      curves.push(enhance(compute, {
        item: data[j][i],
        line: line,
        index: j
      }))
    }
  }

  return {
    curves: curves,
    scale: scale
  }
}