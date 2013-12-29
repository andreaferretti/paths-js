define [
  './linear'
  './ops'
  './sector'
], (Linear, O, Sector)->

  ({data, accessor, center, r, R, colors}) ->
    colors ?= O.random_colors
    values = (accessor item for item in data)
    s = O.sum values
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
