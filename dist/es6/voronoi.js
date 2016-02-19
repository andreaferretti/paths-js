import Polygon from './polygon'
import Fortune from './fortune'
import Linear from './linear'
import { enhance } from './ops'

export default function Voronoi({ data, accessor, width, height, xrange, yrange, compute }) { //data, accessor, width, height, xrange, yrange, compute
  if (typeof accessor !== 'function') {
    accessor = (x) => x
  }
  xrange = xrange || [-1,1]
  yrange = yrange || [-1,1]
  let sites = data.map(accessor)
  let sq = (x) => x * x
  let xm = (xrange[0] + xrange[1]) / 2
  let ym = (yrange[0] + yrange[1]) / 2
  let diag = Math.sqrt(sq(xrange[0] - xrange[1]) + sq(yrange[0] - yrange[1]))
  let xscale = Linear(xrange, [0, width])
  let yscale = Linear(yrange, [height, 0])
  let k = 10
  let closingPoints=[
    [k * (xrange[0] - diag), k * ym],
    [k * (xrange[1] + diag), k * ym],
    [k * xm, k * (yrange[0] - diag)],
    [k * xm, k * (yrange[1] + diag)]
  ]
  let points = closingPoints.concat(sites)
  let fortune = new Fortune(points)
  let patches = fortune.getPatches()
  let nodes = []
  let curves = []

  sites.forEach((site, i) => {
    let scaledPatch = patches[site].map(([x, y]) => [xscale(x), yscale(y)])

    nodes.push({
      point: [xscale(site[0]), yscale(site[1])],
      item: data[i]
    })
    curves.push(enhance(compute, {
      line: Polygon({
          points: scaledPatch,
          closed: true,
        }),
      index: i,
      item: data[i],
    }))
  })

  return { curves, nodes, xscale, yscale }
}