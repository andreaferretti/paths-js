import Polygon from './polygon'
import { times, minus, plus, mapObject } from './ops'
import bh from './barnes-hut'


let randomPosition = (w, h) => {
  return [ Math.random() * w, Math.random() * h ]
}

let cap = (bound, x) => {
  return Math.min(Math.max(x, 0), bound)
}

let inside = (w, h) => (
  ([x, y]) => [cap(w, x), cap(h, y)]
)

let attractiveForces = (links, positions, attraction) => {
  let forces = {}
  for (let id of Object.keys(links)) {
    let { start, end, weight } = links[id]
    let pos1 = positions[start]
    let pos2 = positions[end]
    let force = times(attraction  * weight, minus(pos1, pos2))
    if (!forces[start]) { forces[start] = [0, 0] }
    if (!forces[end]) { forces[end] = [0, 0] }
    forces[start] = minus(forces[start], force)
    forces[end] = plus(forces[end], force)
  }
  return forces
}


export default function({ data, nodeaccessor, linkaccessor,
  width, height, attraction, repulsion, threshold }) {

  let identity = (x) => { return x }
  if (!nodeaccessor) { nodeaccessor = identity }
  if (!linkaccessor) { linkaccessor = identity }
  attraction = attraction || 1
  repulsion = repulsion || 1
  threshold = threshold || 0.5
  let bound = inside(width, height)

  let { nodes, links, constraints } = data
  if (!constraints) { constraints = {} }
  let nodesPositions = {}
  let nodes_ = {}
  for (let node of nodes) {
    let id = nodeaccessor(node)
    nodesPositions[id] = constraints[id] || randomPosition(width, height)
    nodes_[id] = node
  }

  let links_ = {}

  for (let link of links) {
    let { start, end, weight } = linkaccessor(link)
    links_[`${ start }|${ end }`] = { weight, start, end, link }
  }

  let tick = () => {
    let bodies = bh.bodies(nodesPositions)
    let root = bh.root(width, height)
    let tree = bh.tree(bodies, root)
    let attractions = attractiveForces(links_, nodesPositions, attraction / 1000)
    let repulsions = bh.forces(tree, repulsion * 1000, threshold)
    for (let id of Object.keys(nodesPositions)) {
      let position = nodesPositions[id]
      if (constraints[id]) {
        nodesPositions[id] = constraints[id]
      } else {
        let f1 = attractions[id] || [0, 0]
        let f2 = repulsions[id] || [0, 0]
        let f = plus(f1, f2)
        nodesPositions[id] = bound(plus(position, f))
      }
    }
    return recompute()
  }

  let constrain = (id, position) => { constraints[id] = position }

  let unconstrain = (id) => { delete constraints[id] }

  let graph = { tick, constrain, unconstrain }

  let recompute = () => {
    let i = -1
    graph.curves = mapObject(links_, (id, { start, end, link }) => {
      i += 1
      let p = nodesPositions[start]
      let q = nodesPositions[end]

      return {
        link: Polygon({ points: [p, q], closed: false }),
        item: link,
        index: i
      }
    })

    graph.nodes = mapObject(nodes_, (id, node) =>
      ({
        point: nodesPositions[id],
        item: node
      })
    )

    return graph
  }

  return recompute()
}