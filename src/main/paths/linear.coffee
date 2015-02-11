define [], ()->
  linear = ([a, b], [c, d]) ->
    f = (x) ->
      c + (d - c) * (x - a) / (b - a)

    f.inverse = () -> linear([c, d], [a, b])
    f

  linear