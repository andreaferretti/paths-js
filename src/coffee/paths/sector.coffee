define [
  './path'
], (Path)->
  plus = ([a, b], [c, d]) -> [a + c, b + d]

  minus = ([a, b], [c, d]) -> [a - c, b - d]

  times = (k, [a, b]) -> [k * a, k * b]
  
  on_circle = (r, angle) ->
    times(r, [Math.sin(angle), -Math.cos(angle)])

  ({center, r, R, start, end}) ->
    path: ->
      a = plus(center, on_circle(R, start))
      b = plus(center, on_circle(R, end))
      c = plus(center, on_circle(r, end))
      d = plus(center, on_circle(r, start))
        
      Path()
        .moveto(a...)
        .arc(R, R, 0, 0, 1, b...)
        .lineto(c...)
        .arc(r, r, 0, 0, 0, d...)
        .closepath()
        
    centroid: -> 
      mid_angle = (start + end) / 2
      mid_radius = (r + R) / 2
      plus(center, on_circle(mid_radius, mid_angle))
