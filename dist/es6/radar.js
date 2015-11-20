import SemiRegularPolygon from './semi-regular-polygon'
import { max, maxBy, range, enhance } from './ops'


let collectKeys = (objects) => {
  let keys = []
  let keysets = objects.map(Object.keys)
  for (let object of objects) {
    for (let key of Object.keys(object)) {
      if (keys.indexOf(key) == -1) {
        keys.push(key)
      }
    }
  }
  return keys
}

let keyAccessor = (keys) => {
  let a = {}
  for (let key of keys) {
    (function(k) { a[k] = (o) => o[k] })(key)
  }
  return a
}

let globalMax = (data, accessor) => {
  let keys = Object.keys(accessor)
  let maxs = data.map((d) => maxBy(keys, (k) => accessor[k](d)))
  return max(maxs)
}

export default function({data, accessor, center, r, max, rings = 3, compute = {}}) {
  if (! accessor) {
    accessor = keyAccessor(collectKeys(data))
  }
  let keys = Object.keys(accessor)
  let sides = keys.length
  let angle = 2 * Math.PI / sides
  let i = -1
  if (max == null) { max = globalMax(data, accessor) }

  let ringPaths = range(1, rings, true).map((n) => {
    let radius = r * n / rings
    return SemiRegularPolygon({
      center: center,
      radii: range(0, sides).map((s) => radius)
    })
  })

  let polygons = data.map((d) => {
    i += 1

    return enhance(compute, {
      polygon: SemiRegularPolygon({
        center: center,
        radii: keys.map((k) => r * accessor[k](d) / max)
      }),
      item: d,
      index: i
    })
  })

  return {
    curves: polygons,
    rings: ringPaths
  }
}