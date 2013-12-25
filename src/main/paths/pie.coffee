define [
  './linear'
  './sector'
], (Linear, Sector)->

  sum = (values) ->
    values.reduce (a, b) -> a + b
    
  rand_int = (max) ->
    Math.floor(Math.random() * max)
    
  random_colors = ->
    "rgb(#{ rand_int(256) }, #{ rand_int(256) }, #{ rand_int(256) })"

  ({data, accessor, center, r, R, colors}) ->
    colors ?= random_colors
    values = (accessor item for item in data)
    s = sum values
    scale = Linear [0, s], [0, 2 * Math.PI]
    pie = []
    t = 0
    for item, i in data
      value = values[i]
      pie.push
        item: item
        color: colors(i)
        sector: Sector
          center: center
          r: r
          R: R
          start: scale(t)
          end: scale(t + value)
      t += value
    pie
