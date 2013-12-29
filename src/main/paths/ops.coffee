define [
], ()->
  sum = (xs) -> xs.reduce ((a, b) -> a + b), 0

  min = (xs) -> xs.reduce (a, b) -> Math.min(a, b)

  max = (xs) -> xs.reduce (a, b) -> Math.max(a, b)

  plus = ([a, b], [c, d]) -> [a + c, b + d]

  minus = ([a, b], [c, d]) -> [a - c, b - d]

  times = (k, [a, b]) -> [k * a, k * b]
  
  average = (points) ->
    times (1 / points.length), points.reduce plus

  on_circle = (r, angle) ->
    times(r, [Math.sin(angle), -Math.cos(angle)])

  random_int = (max) ->
    Math.floor(Math.random() * max)
    
  random_colors = ->
    "rgb(#{ random_int(256) }, #{ random_int(256) }, #{ random_int(256) })"
  
  sum: sum
  min: min
  max: max
  plus: plus
  minus: minus
  times: times
  average: average
  on_circle: on_circle
  random_int: random_int
  random_colors: random_colors
