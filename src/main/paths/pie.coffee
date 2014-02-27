define [
  './linear'
  './ops'
  './sector'
], (Linear, O, Sector)->

  ({data, accessor, center, r, R, compute}) ->
    values = (accessor item for item in data)
    s = O.sum values
    scale = Linear [0, s], [0, 2 * Math.PI]
    curves = []
    t = 0
    for item, i in data
      value = values[i]
      curves.push O.enhance compute,
        item: item
        index: i
        sector: Sector
          center: center
          r: r
          R: R
          start: scale(t)
          end: scale(t + value)
      t += value

    curves: curves