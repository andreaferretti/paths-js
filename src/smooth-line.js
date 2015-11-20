import Bezier from './bezier'
import comp from './line-chart-comp'
import { average, enhance } from './ops'


export default function(options) {
  let { arranged, scale, xscale, yscale, base } = comp(options)
  let i = -1

  let lines = arranged.map(({ points, xmin, xmax }) => {
    let scaledPoints = points.map(scale)
    i += 1
    let line = Bezier({ points: scaledPoints })
    let area = {
      path: line.path
        .lineto(...scale([xmax, base]))
        .lineto(...scale([xmin, base]))
        .closepath(),
      centroid: average([
        line.centroid,
        scale([xmin, base]),
        scale([xmax, base])
      ])
    }

    return enhance(options.compute, {
      item: options.data[i],
      line: line,
      area: area,
      index: i
    })
  })

  return {
    curves: lines,
    xscale: xscale,
    yscale: yscale
  }
}