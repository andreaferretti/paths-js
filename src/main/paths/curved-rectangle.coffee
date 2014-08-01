define [
  './path'
  './connector'
  './ops'
], (Path, Connector, O)->
  ({topleft, topright, bottomleft, bottomright}) ->
    topCurve = Connector({start: topleft, end: topright}).path
    bottomCurve  = Connector({start: bottomright, end: bottomleft}).path
    path = topCurve.connect(bottomCurve).closepath()
    centroid = O.average [topleft, topright, bottomleft, bottomright]

    path: path
    centroid: centroid