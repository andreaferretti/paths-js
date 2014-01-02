define [
  './polygon'
  './ops'
], (Polygon, O)->

  ({ center, radii }) ->
    angle = 2 * Math.PI / radii.length
    points = radii.map (r, i) ->
      O.plus(center, O.on_circle(r, i * angle))

    Polygon
      points: points
      closed: true