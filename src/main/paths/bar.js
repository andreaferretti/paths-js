import O from './ops'
import Linear from './linear'
import Rectangle from './rectangle'

export default function({data, accessor, width, height, gutter, compute}) {
  if (accessor == null) {
    accessor = (x) => { return x }
  }
  if (gutter == null) {
    gutter = 0
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
  let group_width = (width - gutter * (n - 1)) / n
  let curves = []
  let scale = Linear([min, max], [height, 0])

  for(let [i, g] of groups.entries()) {
    let w = group_width / g.length
    let shift = (group_width + gutter) * i
    for(let [j, el] of g.entries()) {
      let left = shift + w * j
      let right = left + w
      let bottom = scale(0)
      let top = scale(el)
      let line = Rectangle({left: left, right: right, bottom: bottom, top: top})
      curves.push(O.enhance(compute, {
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