define [
  './path'
  './ops'
], (Path, O)->

  ({start, end, tension}) ->
    tension ?= 0.05
    [a, b] = start
    [c, d] = end
    length = (c - a) * tension
    mid1 = [a + length, b]
    mid2 = [c - length, d]

    path: Path().moveto(start...)
      .lineto(mid1...)
      .curveto(a + 5 * length, b, c - 5 * length, d, c - length, d)
      .lineto(end...)
    centroid: O.average([start, end])