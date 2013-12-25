define [
  './path'
  './ops'
], (Path, O)->
  ({center, r, R, start, end}) ->

    a = O.plus(center, O.on_circle(R, start))
    b = O.plus(center, O.on_circle(R, end))
    c = O.plus(center, O.on_circle(r, end))
    d = O.plus(center, O.on_circle(r, start))
      
    path = Path()
      .moveto(a...)
      .arc(R, R, 0, 0, 1, b...)
      .lineto(c...)
      .arc(r, r, 0, 0, 0, d...)
      .closepath()

    mid_angle = (start + end) / 2
    mid_radius = (r + R) / 2
    centroid = O.plus(center, O.on_circle(mid_radius, mid_angle))
    
    path: path
    centroid: centroid
