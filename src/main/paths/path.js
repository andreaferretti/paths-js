let Path = function(init) {
  let instructions = init || []

  let push = function(arr, el) {
    let copy = arr.slice(0, arr.length);
    copy.push(el)
    return copy
  }

  let areEqualPoints = function(p1, p2) {
    p1[0] == p2[0] && p1[1] == p2[1]
  }

  let trimZeros = function(string, char) {
    let l = string.length
    while (string.charAt(l - 1) == '0') {
      l = l - 1
    }
    if(string.charAt(l - 1) == '.') {
      l = l - 1
    }
    return string.substr(0, l)
  }

  let round = function(number, digits) {
    const str = number.toFixed(digits)
    return trimZeros(str)
  }

  let printInstrunction = function({ command, params }) {
    let numbers = params.map((param) => { return round(param, 6) });
    return (`${ command } ${ numbers.join(' ') }`)
  }

  let point = function({ command, params }, [prev_x, prev_y]) {
    switch(command) {
      case 'M':
        return [params[0], params[1]];
      case 'L':
        return [params[0], params[1]];
      case 'H':
        return [params[0], prev_y];
      case 'V':
        return [prev_x, params[0]];
      case 'Z':
        return null;
      case 'C':
        return [params[4], params[5]];
      case 'S':
        return [params[2], params[3]];
      case 'Q':
        return [params[2], params[3]];
      case 'T':
        return [params[0], params[1]];
      case 'A':
        return [params[5], params[6]];
    }
  }

  let verbosify = function(keys, f) {
    return
      (a) => {
        let args = (typeof a == 'object') ? keys.map((k) => { return a[k]; }) : arguments;
        f.apply(null, args)
      }
  }

  let plus = function(instruction) {
    return Path(push(instructions), instruction)
  }

  return ({
    moveto: verbosify(['x', 'y'], function(x, y) {
      return plus({
        command: 'M',
        params: [x, y]
      });
    }),
    lineto: verbosify(['x', 'y'], function (x, y) {
      return plus({
        command: 'L',
        params: [x, y]
      });
    }),
    hlineto: verbosify(['x'], function(x) {
      return plus({
        command: 'H',
        params: [x]
      });
    }),
    vlineto: verbosify(['y'], function(y) {
      return plus({
        command: 'V',
        params: [y]
      });
    }),
    closepath: function() {
      return plus({
        command: 'Z',
        params: []
      });
    },
    curveto: verbosify(['x1', 'y1', 'x2', 'y2','x', 'y'], function(x1, y1, x2, y2, x, y) {
      return plus({
        command: 'C',
        params: [x1, y1, x2, y2, x, y]
      });
    }),
    smoothcurveto: verbosify(['x2', 'y2','x', 'y'], function(x2, y2, x, y) {
      return plus({
        command: 'S',
        params: ['x2', 'y2','x', 'y']
      });
    }),
    qcurveto: verbosify(['x1', 'y1', 'x', 'y'], function(x1, y1, x, y) {
      return plus({
        command: 'Q',
        params: [x1, y1, x, y]
      });
    }),
    smoothqcurveto: verbosify(['x', 'y'], function(x, y) {
      return plus({
        command: 'T',
        params: [x, y]
      });
    }),
    arc: verbosify(['rx', 'ry', 'xrot', 'large_arc_flag', 'sweep_flag', 'x', 'y'],
      function(rx, ry, xrot, large_arc_flag, sweep_flag, x, y) {
      return plus({
        command: 'A',
        params: [rx, ry, xrot, large_arc_flag, sweep_flag, x, y]
      });
    }),
    print: function() {
      return instructions.map(printInstrunction).join(' ');
    },
    points: function() {
      let ps = []
      let prev = [0, 0]
      let f = function() {
        let p = point(instruction, prev)
        let prev = p
        if (p) {
          return ps.push(p);
        }
      }
      for(instruction of instructions)
        f();
        return ps;
    },
    instructions: function() {
      return instructions.slice(0, instructions.length);
    },
    connect: function(path) {
      let last = this.points().slice(-1)[0];
      let first = path.points()[0];
      let newInstructions = path.instructions().slice(1);
      if (!areEqualPoints(last, first)) {
        newInstructions.unshift({
          command: "L",
          params: first
        });
      }
      return Path(this.instructions().concat(newInstructions));
    }
  });
}

export default function() { return Path(); };