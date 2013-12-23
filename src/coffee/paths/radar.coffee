define [
  './polygon'
  './ops'
], (Polygon, O)->
  collect_keys = (objects) ->
    keys = []
    keysets = (Object.keys o for o in objects)
    for object in objects
      for key in Object.keys object
        if keys.indexOf(key) == -1
          keys.push key
    keys
    
  key_accessor = (keys) ->
    a = {}
    for key in keys
      ((k) -> (a[k] = (o) -> o[k]))(key)
    a

  global_max = (data, accessor) ->
    keys = Object.keys accessor
    maxs = data.map (d) ->
      vals = keys.map (k) -> accessor[k](d)
      O.max(vals)
    O.max(maxs)

  ({data, accessor, center, r, max, colors}) ->
    accessor ?= key_accessor(collect_keys(data))
    keys = Object.keys accessor
    sides = keys.length
    angle = 2 * Math.PI / sides
    i = -1
    max ?= global_max(data, accessor)

    polygons = data.map (d) ->
      i += 1
      points = [0..sides - 1].map (n) ->
        key = keys[n]
        O.plus(center, O.on_circle(r * accessor[key](d) / max, n * angle))
    
      polygon: Polygon
        points: points
        closed: true
      color: colors(i)

    polygons: polygons
