import Linear from './linear'
import { minBy, maxBy } from './ops'

const epsilon = 1e-5

let box = (datum, accessor, sort) => {
  let points = datum.map(accessor)
  let sorted = sort ? points.sort(([a, b], [c, d]) => a - c) : points
  let l = sorted.length
  let xmin = sorted[0][0]
  let xmax = sorted[l - 1][0]
  let ymin = minBy(sorted, (p) => p[1])
  let ymax = maxBy(sorted, (p) => p[1])
  if (xmin == xmax) { xmax += epsilon }
  if (ymin == ymax) { ymax += epsilon }

  return {
    points: sorted,
    xmin: xmin,
    xmax: xmax,
    ymin: ymin,
    ymax: ymax
  }
}

export default function({data, xaccessor, yaccessor, width, height, closed, min, max, sort = true}) {
  if (! xaccessor) { xaccessor = ([x, y]) => x }
  if (! yaccessor) { yaccessor = ([x, y]) => y }
  let f = (i) => [xaccessor(i), yaccessor(i)]
  let arranged = data.map((datum) => box(datum, f, sort))

  let xmin = minBy(arranged, (d) => d.xmin)
  let xmax = maxBy(arranged, (d) => d.xmax)
  let ymin = (min == null) ? minBy(arranged, (d) => d.ymin) : min
  let ymax = (max == null) ? maxBy(arranged, (d) => d.ymax) : max
  if (closed) {
    ymin = Math.min(ymin, 0)
    ymax = Math.max(ymax, 0)
  }
  let base = closed ? 0 : ymin
  let xscale = Linear([xmin, xmax], [0, width])
  let yscale = Linear([ymin, ymax], [height, 0])
  let scale = ([x, y]) => [xscale(x), yscale(y)]

  return {
    arranged: arranged,
    scale: scale,
    xscale: xscale,
    yscale: yscale,
    base: base
  }
}
