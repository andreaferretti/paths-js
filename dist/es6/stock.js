import Polygon from './polygon'
import comp from './line-chart-comp'
import { enhance } from './ops'


export default function(options) {
  let { arranged, scale, xscale, yscale, base } = comp(options)
  let i = -1

  let polygons = arranged.map(({ points, xmin, xmax }) => {
    let scaledPoints = points.map(scale)
    points.push([xmax, base])
    points.push([xmin, base])
    let scaledPointsClosed = points.map(scale)
    i += 1

    return enhance(options.compute, {
      item: options.data[i],
      line: Polygon({
        points: scaledPoints,
        closed: false
      }),
      area: Polygon({
        points: scaledPointsClosed,
        closed: true
      }),
      index: i
    })
  })

  return {
    curves: polygons,
    xscale: xscale,
    yscale: yscale
  }
}