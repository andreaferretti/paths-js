define [
], ()->
  min = (xs) -> xs.reduce (a, b) -> Math.min(a, b)

  max = (xs) -> xs.reduce (a, b) -> Math.max(a, b)

  plus = ([a, b], [c, d]) -> [a + c, b + d]

  minus = ([a, b], [c, d]) -> [a - c, b - d]

  times = (k, [a, b]) -> [k * a, k * b]
  
  average = (points) ->
    times (1 / points.length), points.reduce plus

  on_circle = (r, angle) ->
    times(r, [Math.sin(angle), -Math.cos(angle)])
  
  min: min
  max: max
  plus: plus
  minus: minus
  times: times
  average: average
  on_circle: on_circle
