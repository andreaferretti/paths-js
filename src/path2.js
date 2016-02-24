let Path = (string = "", points = []) => {
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

  let round = (number, digits = 6) => {
    const str = number.toFixed(digits)
    return trimZeros(str)
  }

  let printInstrunction = (command, params) => {
    let numbers = Array.prototype.map.call(params, (param) => round(param, 6))
    return `${ command } ${ numbers.join(' ') }`
  }

  let last = () => points[points.length - 1]

  let svg = (letter, keys, f) =>
    function(a, mutable = false) {
      let args = (typeof a === 'object') ? keys.map((k) => a[k]) : arguments
      let p = f.apply(null, args)
      let s = printInstrunction(letter, args)

      if (mutable) {
        string += (' ' + s)
        if (p) {
          points += p
        }
        return Path(string, points)
      }
      else {
        let string_ = string + ' ' + s
        let points_ = p ? push(points, p) : points
        return Path(string_, points_)
      }
    }

  return ({
    moveto: svg('M', ['x', 'y'],
      (x, y) => [x, y]
    ),
    lineto: svg('L', ['x', 'y'],
      (x, y) => [x, y]
    ),
    hlineto: svg('H', ['x'],
      (x) => [x, last()[1]]
    ),
    vlineto: svg('V', ['y'],
      (y) => [last()[0], y]
    ),
    closepath: svg('Z', [],
      () => null
    ),
    curveto: svg('C', ['x1', 'y1', 'x2', 'y2','x', 'y'],
      (x1, y1, x2, y2, x, y) => [x, y]
    ),
    smoothcurveto: svg('S', ['x2', 'y2','x', 'y'],
      (x2, y2, x, y) => [x, y]
    ),
    qcurveto: svg('Q', ['x1', 'y1', 'x', 'y'],
      (x1, y1, x, y) => [x, y]
    ),
    smoothqcurveto: svg('T', ['x', 'y'],
      (x, y) => [x, y]
    ),
    arc: svg('A', ['rx', 'ry', 'xrot', 'largeArcFlag', 'sweepFlag', 'x', 'y'],
      (rx, ry, xrot, largeArcFlag, sweepFlag, x, y) => [x, y]
    ),
    print: () => '' + string,
    points: () => points.slice(0),
    connect: function(path) {
      let ps = path.points()
      let newS = path.print()
      if (areEqualPoints(last(), ps[0])) {
        ps.shift()
      }
      return Path(string + ' ' + s, points.concat(ps))
    }
  })
}

export default function() { return Path() }