import { times, plus, minus, length, mapObject, sumVectors } from './ops'

let average = (body1, body2) => {
  let mass = body1.mass + body2.mass
  let point = times(1 / mass, plus(
    times(body1.mass, body1.point),
    times(body2.mass, body2.point)
  ))
  return [point, mass]
}

let locate = ([x, y], quadrants) => {
  for (let q of quadrants) {
    let { top, bottom, left, right } = q.box
    if ((left <= x) && (x <= right) && (bottom <= y) && (y <= top)) {
      return q
    }
  }
}

let makeQuadrant = ({ top, bottom, left, right }, [a, b]) => {
  let halfwayV = (left + right) / 2
  let halfwayH = (top + bottom) / 2

  return {
    box: {
      top: b ? halfwayH : top,
      bottom: b ? bottom : halfwayH,
      left: a ? halfwayV : left,
      right: a ? right : halfwayV
    }
  }
}

let subdivide = ({ box }) => [
  makeQuadrant(box, [0, 0]),
  makeQuadrant(box, [1, 0]),
  makeQuadrant(box, [0, 1]),
  makeQuadrant(box, [1, 1])
]

let addBody = (root, body) => {
  if (root.body) {
    let oldBody = root.body
    delete root.body
    root.children = subdivide(root)
    addBody(root, oldBody)
    addBody(root, body)
  } else {
    if (root.children) {
      let child = locate(body.point, root.children)
      let [p, m] =
        root.point ? average(root, body) : [body.point, body.mass]
      root.point = p
      root.mass = m
      addBody(child, body)
    } else {
      root.body = body
    }
  }
}

let makeTree = (bodies, root) => {
  if (bodies.length === 0) { return root }
  else {
    let body = bodies.shift()
    addBody(root, body)
    return makeTree(bodies, root)
  }
}

let makeBodies = (positions) => {
  return mapObject(positions, (id, position) =>
    ({ id: id, point: position, mass: 1 })
  )
}

let makeRoot = (width, height) => ({
  box: {
    top: height,
    bottom: 0,
    left: 0,
    right: width
  }
})

let walkLeaves = (tree, f) => {
  if (tree.body) { f(tree) }
  else {
    if (tree.children) {
      for (let child of tree.children) {
        walkLeaves(child, f)
      }
    }
  }
}

let bodyForceOn = (b1, b2, repulsion) => {
  let segment = minus(b1.point, b2.point)
  let d = length(segment)
  return times(repulsion * b1.mass * b2.mass / (d * d * d), segment)
}

let boxWidth = ({ top, bottom, left, right }) =>
  length([top - bottom, right - left])

let forceOn = (leaf, tree, repulsion, threshold) => {
  if (tree === leaf) { return [0, 0] }
  else if (tree.body) { return bodyForceOn(leaf.body, tree.body, repulsion) }
  else if (tree.point) {
    let s = boxWidth(tree.box)
    let d = length(minus(leaf.body.point, tree.point))

    if (s / d < threshold) { return bodyForceOn(leaf.body, tree, repulsion) }
    else return sumVectors(
      tree.children.map((c) => { return forceOn(leaf, c, repulsion, threshold) })
    )
  }
  else return [0, 0]
}

let repulsiveForces = (tree, repulsion, threshold) => {
  let forces = {}
  walkLeaves(tree, (leaf) => {
    forces[leaf.body.id] = forceOn(leaf, tree, repulsion, threshold)
  })
  return forces
}

export {
  makeTree as tree,
  makeBodies as bodies,
  makeRoot as root,
  repulsiveForces as forces
}

export default {
  tree: makeTree,
  bodies: makeBodies,
  root: makeRoot,
  forces: repulsiveForces
}