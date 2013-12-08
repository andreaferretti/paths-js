define [
], ()->
  plus = ([a, b], [c, d]) -> [a + c, b + d]

  minus = ([a, b], [c, d]) -> [a - c, b - d]

  times = (k, [a, b]) -> [k * a, k * b]
  
  average = (points) ->
    times (1 / points.length), points.reduce plus
  
  plus: plus
  minus: minus
  times: times
  average: average
