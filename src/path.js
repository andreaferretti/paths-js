let Path = (init) => {
  let instructions = init || []

  let push = (arr, el) => {
    let copy = arr.slice(0, arr.length)
    copy.push(el)
    return copy
  }

  let areEqualPoints = ([a1, b1], [a2, b2]) =>
    (a1 === a2) && (b1 === b2)

  let trimZeros = (string, char) => {
    let l = string.length
    while (string.charAt(l - 1) === '0') {
      l = l - 1
    }
    if(string.charAt(l - 1) === '.') {
      l = l - 1
    }
    return string.substr(0, l)
  }

  let round = (number, digits) => {
    const str = number.toFixed(digits)
    return trimZeros(str)
  }

  let printInstrunction = ({ command, params }) => {
    let numbers = params.map((param) => round(param, 6))
    return `${ command } ${ numbers.join(' ') }`
  }

  let point = ({ command, params }, [prevX, prevY]) => {
    switch(command) {
      case 'M':
        return [params[0], params[1]]
      case 'L':
        return [params[0], params[1]]
      case 'H':
        return [params[0], prevY]
      case 'V':
        return [prevX, params[0]]
      case 'Z':
        return null
      case 'C':
        return [params[4], params[5]]
      case 'S':
        return [params[2], params[3]]
      case 'Q':
        return [params[2], params[3]]
      case 'T':
        return [params[0], params[1]]
      case 'A':
        return [params[5], params[6]]
    }
  }

  let verbosify = (keys, f) =>
    function(a, mutable = false) {
      let args = (typeof a === 'object') ? keys.map((k) => a[k]) : arguments
      return plus(f.apply(null, args), mutable)
    }

  let plus = (instruction, mutable = false) => {
    if (mutable) {
      instructions.push(instruction)
      return Path(instructions)
    }
    else return Path(push(instructions, instruction))
  }

  return ({
    moveto: verbosify(['x', 'y'], (x, y) =>
      ({
        command: 'M',
        params: [x, y]
      })
    ),
    lineto: verbosify(['x', 'y'], (x, y) =>
      ({
        command: 'L',
        params: [x, y]
      })
    ),
    hlineto: verbosify(['x'], (x) =>
      ({
        command: 'H',
        params: [x]
      })
    ),
    vlineto: verbosify(['y'], (y) =>
      ({
        command: 'V',
        params: [y]
      })
    ),
    closepath: () =>
      plus({
        command: 'Z',
        params: []
      }),
    curveto: verbosify(['x1', 'y1', 'x2', 'y2','x', 'y'], (x1, y1, x2, y2, x, y) =>
      ({
        command: 'C',
        params: [x1, y1, x2, y2, x, y]
      })
    ),
    smoothcurveto: verbosify(['x2', 'y2','x', 'y'], (x2, y2, x, y) =>
      ({
        command: 'S',
        params: [x2, y2,x, y]
      })
    ),
    qcurveto: verbosify(['x1', 'y1', 'x', 'y'], (x1, y1, x, y) =>
      ({
        command: 'Q',
        params: [x1, y1, x, y]
      })
    ),
    smoothqcurveto: verbosify(['x', 'y'], (x, y) =>
      ({
        command: 'T',
        params: [x, y]
      })
    ),
    arc: verbosify(['rx', 'ry', 'xrot', 'largeArcFlag', 'sweepFlag', 'x', 'y'],
      (rx, ry, xrot, largeArcFlag, sweepFlag, x, y) =>
      ({
        command: 'A',
        params: [rx, ry, xrot, largeArcFlag, sweepFlag, x, y]
      })
    ),
    print: () =>
      instructions.map(printInstrunction).join(' '),
    points: () => {
      let ps = []
      let prev = [0, 0]
      for(let instruction of instructions) {
        let p = point(instruction, prev)
        prev = p
        if(p) {
          ps.push(p)
        }
      }
      return ps
    },
    instructions: () =>
      instructions.slice(0, instructions.length),
    connect: function(path) {
      let ps = this.points()
      let last = ps[ps.length - 1]
      let first = path.points()[0]
      let newInstructions = path.instructions().slice(1)
      if (!areEqualPoints(last, first)) {
        newInstructions.unshift({
          command: "L",
          params: first
        })
      }
      return Path(this.instructions().concat(newInstructions))
    }
  })
}

export default function() { return Path() }