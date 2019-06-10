import { matrixTransform, transformEllipse } from './geom'

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

  let point = ({ command, params }, prev) => {
    switch(command) {
      case 'M':
        return [params[0], params[1]]
      case 'L':
        return [params[0], params[1]]
      case 'H':
        return [params[0], prev[1]]
      case 'V':
        return [prev[0], params[0]]
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

  let transformParams = (instruction, matrix, prev) => {
    let p = instruction.params

    let transformer = {
      'V': function (instruction, matrix, prev) {
        let pts = [{x: prev[0], y: p[0]}]
        let newPts = matrixTransform(pts, matrix)
        if (newPts[0].x === matrixTransform([{x: prev[0], y: prev[1]}], matrix)[0].x) {
          return {
            command: 'V',
            params: [newPts[0].y]
          }
        } else {
          return {
            command: 'L',
            params: [newPts[0].x, newPts[0].y]
          }
        }
      },
      'H': function (instruction, matrix, prev) {
        let pts = [{x: p[0], y: prev[1]}]
        let newPts = matrixTransform(pts, matrix)
        if (newPts[0].y === matrixTransform([{ x: prev[0], y: prev[1] }], matrix)[0].y) {
          return {
            command: 'H',
            params: [newPts[0].x]
          }
        } else {
          return {
            command: 'L',
            params: [newPts[0].x, newPts[0].y]
          }
        }
      },
      'A': function (instruction, matrix, prev) {
        // transform rx, ry, and x-axis rotation
        let r = transformEllipse(p[0], p[1], p[2], matrix)

        let sweepFlag = p[4]
        if (matrix[0] * matrix[3] - matrix[1] * matrix[2] < 0) {
          sweepFlag = sweepFlag ? '0' : '1'
        }

        // transform endpoint
        let pts = [{x: p[5], y: p[6]}]
        let newPts = matrixTransform(pts, matrix)

        if (r.isDegenerate) {
          return {
            command: 'L',
            params: [newPts[0].x, newPts[0].y]
          }
        } else {
          return {
            command: 'A',
            params: [r.rx, r.ry, r.ax, p[3], sweepFlag, newPts[0].x, newPts[0].y]
          }
        }
      },
      'C': function (instruction, matrix, prev) {
        let pts = [
          {x: p[0], y: p[1]},
          {x: p[2], y: p[3]},
          {x: p[4], y: p[5]}
        ]
        let newPts = matrixTransform(pts, matrix)
        return {
          command: 'C',
          params: [newPts[0].x, newPts[0].y, newPts[1].x, newPts[1].y, newPts[2].x, newPts[2].y]
        }
      },
      'Z': function (instruction, matrix, prev) {
        return {
          command: 'Z',
          params: []
        }
      },
      'default': function (instruction, matrix, prev) {
        let pts = [{x: p[0], y: p[1]}]
        let newPts = matrixTransform(pts, matrix)
        let newParams = instruction.params.slice(0, instruction.params.length)
        newParams.splice(0, 2, newPts[0].x, newPts[0].y)
        return {
          command: instruction.command,
          params: newParams
        }
      }
    }

    if (transformer[instruction.command]) {
      return transformer[instruction.command](instruction, matrix, prev)
    } else {
      return transformer['default'](instruction, matrix, prev)
    }
  }

  let verbosify = (keys, f) =>
    function(a) {
      let args = (typeof a === 'object') ? keys.map((k) => a[k]) : arguments
      return f.apply(null, args)
    }

  let plus = (instruction) =>
    Path(push(instructions, instruction))

  return ({
    moveto: verbosify(['x', 'y'], (x, y) =>
      plus({
        command: 'M',
        params: [x, y]
      })
    ),
    lineto: verbosify(['x', 'y'], (x, y) =>
      plus({
        command: 'L',
        params: [x, y]
      })
    ),
    hlineto: verbosify(['x'], (x) =>
      plus({
        command: 'H',
        params: [x]
      })
    ),
    vlineto: verbosify(['y'], (y) =>
      plus({
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
      plus({
        command: 'C',
        params: [x1, y1, x2, y2, x, y]
      })
    ),
    smoothcurveto: verbosify(['x2', 'y2','x', 'y'], (x2, y2, x, y) =>
      plus({
        command: 'S',
        params: [x2, y2,x, y]
      })
    ),
    qcurveto: verbosify(['x1', 'y1', 'x', 'y'], (x1, y1, x, y) =>
      plus({
        command: 'Q',
        params: [x1, y1, x, y]
      })
    ),
    smoothqcurveto: verbosify(['x', 'y'], (x, y) =>
      plus({
        command: 'T',
        params: [x, y]
      })
    ),
    arc: verbosify(['rx', 'ry', 'xrot', 'largeArcFlag', 'sweepFlag', 'x', 'y'],
      (rx, ry, xrot, largeArcFlag, sweepFlag, x, y) =>
      plus({
        command: 'A',
        params: [rx, ry, xrot, largeArcFlag, sweepFlag, x, y]
      })
    ),
    translate: verbosify(['dx', 'dy'], (dx = 0, dy = 0) => {
      if (dx !== 0 || dy !== 0) {
        let prev = [0, 0]
        let matrix = [1, 0, 0, 1, dx, dy]
        let newInstructions = instructions.map(instruction => {
          let p = transformParams(instruction, matrix, prev)
          prev = point(instruction, prev)
          return p
        })
        return Path(newInstructions)
      } else {
        return Path(instructions)
      }
    }),
    rotate: verbosify(['angle', 'rx', 'ry'], (angle, rx = 0, ry = 0) => {
      if (angle !== 0) {
        let prev
        let matrix
        let newInstructions = instructions

        if (rx !== 0 && ry !== 0) {
          prev = [0, 0]
          matrix = [1, 0, 0, 1, -rx, -ry]
          newInstructions = newInstructions.map(instruction => {
            let p = transformParams(instruction, matrix, prev)
            prev = point(instruction, prev)
            return p
          })
        }

        let rad = angle * Math.PI / 180
        let cos = Math.cos(rad)
        let sin = Math.sin(rad)

        prev = [0, 0]
        matrix = [cos, sin, -sin, cos, 0, 0]
        newInstructions = newInstructions.map(instruction => {
          let p = transformParams(instruction, matrix, prev)
          prev = point(instruction, prev)
          return p
        })

        if (rx !== 0 && ry !== 0) {
          prev = [0, 0]
          matrix = [1, 0, 0, 1, rx, ry]
          newInstructions = newInstructions.map(instruction => {
            let p = transformParams(instruction, matrix, prev)
            prev = point(instruction, prev)
            return p
          })
        }

        return Path(newInstructions)
      } else {
        return Path(instructions)
      }
    }),
    scale: verbosify(['sx', 'sy'], (sx = 1, sy = sx) => {
      if (sx !== 1 || sy !== 1) {
        let prev = [0, 0]
        let matrix = [sx, 0, 0, sy, 0, 0]
        let newInstructions = instructions.map(instruction => {
          let p = transformParams(instruction, matrix, prev)
          prev = point(instruction, prev)
          return p
        })
        return Path(newInstructions)
      } else {
        return Path(instructions)
      }
    }),
    shearX: verbosify(['angle'], (angle = 0) => {
      if (angle !== 0) {
        let prev = [0, 0]
        let matrix = [1, 0, Math.tan(angle * Math.PI / 180), 1, 0, 0]
        let newInstructions = instructions.map(instruction => {
          let p = transformParams(instruction, matrix, prev)
          prev = point(instruction, prev)
          return p
        })
        return Path(newInstructions)
      } else {
        return Path(instructions)
      }
    }),
    shearY: verbosify(['angle'], (angle = 0) => {
      if (angle !== 0) {
        let prev = [0, 0]
        let matrix = [1, Math.tan(angle * Math.PI / 180), 0, 1, 0, 0]
        let newInstructions = instructions.map(instruction => {
          let p = transformParams(instruction, matrix, prev)
          prev = point(instruction, prev)
          return p
        })
        return Path(newInstructions)
      } else {
        return Path(instructions)
      }
    }),
    print: () =>
      instructions.map(printInstrunction).join(' '),
    toString: () =>
      this.print(),
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
      let newInstructions
      if (instructions[instructions.length - 1].command !== 'Z') {
        newInstructions = path.instructions().slice(1)
        if (!areEqualPoints(last, first)) {
          newInstructions.unshift({
            command: "L",
            params: first
          })
        }
      } else {
        newInstructions = path.instructions()
      }
      return Path(this.instructions().concat(newInstructions))
    }
  })
}

export default function() { return Path() }
