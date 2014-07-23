define [
], ()->
  Path = (init) ->
    instructions = init || []

    push = (arr, el) ->
      copy = arr[0...arr.length]
      copy.push el
      copy

    areEqualPoints = (p1, p2) ->
      p1[0] == p2[0] and p1[1] == p2[1]

    printInstrunction = ({ command, params }) ->
      "#{ command } #{ params.join ' ' }"

    point = ({ command, params }, [prev_x, prev_y]) ->
      switch command
        when 'M' then [params[0], params[1]]
        when 'L' then [params[0], params[1]]
        when 'H' then [params[0], prev_y]
        when 'V' then [prev_x, params[0]]
        when 'Z' then null
        when 'C' then [params[4], params[5]]
        when 'S' then [params[2], params[3]]
        when 'Q' then [params[2], params[3]]
        when 'T' then [params[0], params[1]]
        when 'A' then [params[5], params[6]]

    verbosify = (keys, f) ->
      (a) ->
        args = if typeof a == 'object' then keys.map (k) -> a[k] else arguments
        f.apply(null, args)

    plus = (instruction) ->
      Path(push instructions, instruction)

    # Returned instance
    moveto: verbosify ['x', 'y'], (x, y) -> plus
      command: 'M'
      params: [x, y]

    lineto: verbosify ['x', 'y'], (x, y) -> plus
      command: 'L'
      params: [x, y]

    hlineto: verbosify ['x'], (x) -> plus
      command: 'H'
      params: [x]

    vlineto: verbosify ['y'], (y) -> plus
      command: 'V'
      params: [y]

    closepath: -> plus
      command: 'Z'
      params: []

    curveto: verbosify ['x1', 'y1', 'x2', 'y2','x', 'y'], (x1, y1, x2, y2, x, y) -> plus
      command: 'C'
      params: [x1, y1, x2, y2, x, y]

    smoothcurveto: verbosify ['x2', 'y2','x', 'y'], (x2, y2, x, y) -> plus
      command: 'S'
      params: [x2, y2, x, y]

    qcurveto: verbosify ['x1', 'y1', 'x', 'y'], (x1, y1, x, y) -> plus
      command: 'Q'
      params: [x1, y1, x, y]

    smoothqcurveto: verbosify ['x', 'y'], (x, y) -> plus
      command: 'T'
      params: [x, y]

    arc: verbosify ['rx', 'ry', 'xrot', 'large_arc_flag', 'sweep_flag', 'x', 'y'],
      (rx, ry, xrot, large_arc_flag, sweep_flag, x, y) -> plus
        command: 'A'
        params: [rx, ry, xrot, large_arc_flag, sweep_flag, x, y]

    print: ->
      instructions.map(printInstrunction).join(' ')

    points: ->
      ps = []
      prev = [0, 0]
      for instruction in instructions
        do ->
          p = point(instruction, prev)
          prev = p
          if p then ps.push p
      ps

    instructions: ->
      instructions[0...instructions.length]

    connect: (path) ->
      last = @points()[-1..][0]
      first = path.points()[0]
      if not areEqualPoints(last,first)
        p = @lineto(first[0],first[1])
        oldInstructions = p.instructions()
      else
        oldInstructions = @instructions()

      newInstructions = path.instructions()[1..]

      newInstructions.forEach((instruction) ->
        oldInstructions.push(instruction)
      )
      Path(oldInstructions)

  -> Path()
