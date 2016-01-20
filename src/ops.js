let sum = (xs) =>
  xs.reduce((a, b) => a + b, 0)

let min = (xs) => xs.reduce((a, b) => Math.min(a, b))

let max = (xs) => xs.reduce((a, b) => Math.max(a, b))

let sumBy = (xs, f) =>
  xs.reduce((a, b) => a + f(b), 0)

let minBy = (xs, f) =>
  xs.reduce((a, b) => Math.min(a, f(b)), Infinity)

let maxBy = (xs, f) =>
  xs.reduce((a, b) => Math.max(a, f(b)), -Infinity)

let plus = ([a, b], [c, d]) => [a + c, b + d]

let minus = ([a, b], [c, d]) => [a - c, b - d]

let times = (k, [a, b]) => [k * a, k * b]

let length = ([a, b]) => Math.sqrt(a * a + b * b)

let sumVectors = (xs) => xs.reduce(plus, [0, 0])

let average = (points) =>
  times((1 / points.length), points.reduce(plus))

let onCircle = (r, angle) =>
  times(r, [Math.sin(angle), -Math.cos(angle)])

let enhance = (compute, curve) => {
  let obj = (compute || {})
  for(let key in obj) {
    let method = obj[key]
    curve[key] = method(curve.index, curve.item, curve.group)
  }
  return curve
}

let range = (a, b, inclusive) => {
  let result = []
  for (let i = a; i < b; i++) {
    result.push(i)
  }
  if (inclusive) { result.push(b) }
  return result
}

let mapObject = (obj, f) => {
  let result = []
  for (let k of Object.keys(obj)) {
    let v = obj[k]
    result.push(f(k, v))
  }
  return result
}

let pairs = (obj) =>
  mapObject(obj, (k, v) => [k, v])

let id = (x) => x

export { sum, min, max, sumBy, minBy, maxBy, plus, minus, times, id,
  length, sumVectors, average, onCircle, enhance, range, mapObject, pairs }

export default { sum, min, max, sumBy, minBy, maxBy, plus, minus, times, id,
  length, sumVectors, average, onCircle, enhance, range, mapObject, pairs }