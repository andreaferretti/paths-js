define [
  './path'
  './ops'
], (Path, O)->
  on_circle = (r, angle) ->
    O.times(r, [Math.sin(angle), -Math.cos(angle)])

  ({center, r, R, start, end}) ->

    a = O.plus(center, on_circle(R, start))
    b = O.plus(center, on_circle(R, end))
    c = O.plus(center, on_circle(r, end))
    d = O.plus(center, on_circle(r, start))
      
    path = Path()
      .moveto(a...)
      .arc(R, R, 0, 0, 1, b...)
      .lineto(c...)
      .arc(r, r, 0, 0, 0, d...)
      .closepath()

    mid_angle = (start + end) / 2
    mid_radius = (r + R) / 2
    centroid = O.plus(center, on_circle(mid_radius, mid_angle))
    
    path: path
    centroid: centroid
