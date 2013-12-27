define [
], ()->
  Path = (init) ->
    instructions = init || []

    push = (arr, el) ->
      copy = arr[0...arr.length]
      copy.push el
      copy

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
        when 'Q' then [params[0], params[1]]
        when 'T' then [params[0], params[1]]
        when 'A' then [params[5], params[6]]

    plus = (instruction) ->
      Path(push instructions, instruction)

    # Returned instance
    moveto: (x, y) -> plus
      command: 'M'
      params: [x, y]

    lineto: (x, y) -> plus
      command: 'L'
      params: [x, y]

    hlineto: (x) -> plus
      command: 'H'
      params: [x]

    vlineto: (y) -> plus
      command: 'V'
      params: [y]

    closepath: -> plus
      command: 'Z'
      params: []

    curveto: (x1, y1, x2, y2, x, y) -> plus
      command: 'C'
      params: [x1, y1, x2, y2, x, y]

    smoothcurveto: (x2, y2, x, y) -> plus
      command: 'S'
      params: [x2, y2, x, y]

    qcurveto: (x, y) -> plus
      command: 'Q'
      params: [x, y]

    smoothqcurveto: (x, y) -> plus
      command: 'T'
      params: [x, y]

    arc: (rx, ry, xrot, large_arc_flag, sweep_flag, x, y) -> plus
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

  -> Path()
