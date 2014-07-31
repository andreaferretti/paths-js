define [
  './path'
  './connector'
  './ops'
], (Path, Connector, O)->
  ({point1, point2, point3, point4}) ->
    topCurve = Connector({start: point1, end: point2}).path
    bottomCurve  = Connector({start: point4, end: point3}).path
    path = topCurve.connect(bottomCurve).closepath()
    centroid = O.average [point1, point2, point3, point4]

    path: path
    centroid: centroid