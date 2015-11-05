  let sum = function(xs) {
    return xs.reduce(function(a, b) {
      return a + b
    }, 0)
  }

  let min = function(xs) {
    return xs.reduce(function(a, b) {
      return Math.min(a, b)
    })
  }

  let max = function(xs) {
    return xs.reduce(function(a, b) {
      return Math.max(a, b)
    })
  }

  let plus = function([a, b], [c, d]) { return [a + c, b + d] }

  let minus = function([a, b], [c, d]) { return [a - c, b - d] }

  let times = function(k, [a, b]) { return [k * a, k * b] }

  let length = function([a, b]) { return Math.sqrt(a * a + b * b) }

  let sum_vectors = function(xs) {
    return xs.reduce(function(v, w) {
      return plus(v, w)
    }, [0, 0])
  }

  let average = function(points) {
    return times((1 / points.length), points.reduce(plus))
  }

  let on_circle = function(r, angle) {
    return times(r, [Math.sin(angle), -Math.cos(angle)])
  }

  let enhance = function(compute, curve) {
    let obj = (compute || {})
    for(let key in obj) {
      let method = obj[key]
      curve[key] = method(curve.index, curve.item, curve.group)
    }
    return curve
  }

export { sum, min, max, plus, minus, times, length, sum_vectors, average, on_circle, enhance }