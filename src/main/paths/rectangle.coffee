define [
  './polygon'
], (Polygon)->
  ({left, right, top, bottom}) ->
    Polygon
      points: [
          [right, top]
          [right, bottom]
          [left, bottom]
          [left, top]
        ]
      closed: true
