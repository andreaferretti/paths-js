import Polygon from './polygon'
import Fortune from './fortune'
import Linear from './linear'
import { enhance } from './ops'

export default function Voronoi(args) { //data, accessor, width, height, xrange, yrange, compute
  if (typeof args.accessor !== "function"){
    args.accessor = (x) => x
  }
  let xrange = args.xrange || [-1,1]
  let yrange = args.yrange || [-1,1]

  // function scale(iIn, iOut) {
  //   return function(x){
  //     return iOut[0] + (iOut[1] - iOut[0]) * (x - iIn[0]) / (iIn[1] - iIn[0]);
  //   }
  // }
  let sites = args.data.map(args.accessor)
  let sq = (x) => x * x
  let xm = (xrange[0] + xrange[1]) / 2
  let ym = (yrange[0] + yrange[1]) / 2
  let diag = Math.sqrt(sq(xrange[0] - xrange[1]) + sq(yrange[0] - yrange[1]))
  let xscale = Linear(xrange, [0, args.width])
  let yscale = Linear(yrange, [args.height, 0])
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
      item: args.data[i]
    })
    curves.push(enhance(args.compute, {
      line: Polygon({
          points: scaledPatch,
          closed: true,
        }),
      index: i,
      item: args.data[i],
    }))
  })

  return { curves, nodes, xscale, yscale }
}