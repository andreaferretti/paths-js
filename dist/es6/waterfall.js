import Linear from './linear'
import Rectangle from './rectangle'
import { enhance } from './ops'


export default function({data, accessor, width, height, gutter = 10, compute, min = 0, max = 0}) {
  if (!accessor) { accessor = (x) => x }
  let last = 0
  let data_ = []

  for (let d of data) {
    let { value, absolute } = accessor(d)
    let [ low, high ] = absolute ? [0, value || last] : [last, last + value]

    let m = Math.min(low, high)
    let M = Math.max(low, high)
    min = Math.min(min, m)
    max = Math.max(max, M)
    last = high

    data_.push({
      item: d,
      low: low,
      high: high,
      value: ((value != null) ? value : high)
    })
  }

  let n = data_.length
  let barWidth = (width - gutter * (n - 1)) / n
  let curves = []
  let scale = Linear([min, max], [height, 0])

  for (let [i, d] of data_.entries()) {
    let left = i * (barWidth + gutter)
    let right = left + barWidth
    let bottom = scale(d.low)
    let top = scale(d.high)
    let line = Rectangle({ left: left, right: right, bottom: bottom, top: top })
    curves.push(enhance(compute, {
      item: d.item,
      line: line,
      value: d.value,
      index: i
    }))
  }

  return {
    curves: curves,
    scale: scale
  }
}