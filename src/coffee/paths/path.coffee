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
  
    point = ({ command, params }) ->
      switch command
        when 'M' then params
        when 'L' then params
        when 'Z' then []
        when 'Q' then [params[2], params[3]]
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

    closepath: -> plus
      command: 'Z'
      params: []

    curveto: (x2, y2, x, y) -> plus
      command: 'S'
      params: [x2, y2, x, y]

    qcurveto: (x, y) -> plus
      command: 'Q'
      params: [x, y]

    arc: (rx, ry, xrot, large_arc_flag, sweep_flag, x, y) -> plus
      command: 'A'
      params: [rx, ry, xrot, large_arc_flag, sweep_flag, x, y]

    print: ->
      instructions.map(printInstrunction).join(' ')
    
    points: ->
      ps = []
      for instruction in instructions
        ps.push point(instruction)
      ps

  Path
