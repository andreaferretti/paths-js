define [
  './path'
], (Path)->

  ({points, closed}) ->
    l = points.length
    head = points[0]
    tail = points[1..l]
    path = tail.reduce ((pt, p) ->
      pt.lineto(p...)), Path().moveto(head)
      
    if closed path.closepath() else path
