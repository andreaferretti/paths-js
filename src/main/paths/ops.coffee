define [
], ()->
  sum = (xs) -> xs.reduce ((a, b) -> a + b), 0

  min = (xs) -> xs.reduce (a, b) -> Math.min(a, b)

  max = (xs) -> xs.reduce (a, b) -> Math.max(a, b)

  plus = ([a, b], [c, d]) -> [a + c, b + d]

  minus = ([a, b], [c, d]) -> [a - c, b - d]

  times = (k, [a, b]) -> [k * a, k * b]

  length = ([a, b]) -> Math.sqrt(a * a + b * b)

  sum_vectors = (xs) -> xs.reduce ((v, w) -> plus(v, w)), [0, 0]

  average = (points) ->
    times (1 / points.length), points.reduce plus

  on_circle = (r, angle) ->
    times(r, [Math.sin(angle), -Math.cos(angle)])

  enhance = (compute, curve) ->
    for key, method of compute or {}
      curve[key] = method(curve.index, curve.item, curve.group)
    curve

  sum: sum
  min: min
  max: max
  plus: plus
  minus: minus
  times: times
  length: length
  sum_vectors: sum_vectors
  average: average
  on_circle: on_circle
  enhance: enhance