define [
  './path'
  './ops'
], (Path, O)->
  ({points, closed}) ->
    l = points.length
    head = points[0]
    tail = points[1..l]
    path = tail.reduce ((pt, p) ->
      pt.lineto(p...)), Path().moveto(head)
      
    path: if closed then path.closepath() else path
    centroid: O.average points
