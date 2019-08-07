import Linear from './linear'
import Sector from './sector'
import { sum, enhance } from './ops'

export default function({data, accessor, center, r, R, compute}) {
  let values = data.map(accessor)
  let s = sum(values)
  s = (s === 0) ? 1 : s;
  let scale = Linear([0, s], [0, 2 * Math.PI])
  let curves = []
  let t = 0
  for (let [i, item] of data.entries()) {
    let value = values[i]
    curves.push(enhance(compute, {
      item: item,
      index: i,
      sector: Sector({
        center: center,
        r: r,
        R: R,
        start: scale(t),
        end: scale(t + value)
      })
    }))
    t += value
  }

  return { curves }
}