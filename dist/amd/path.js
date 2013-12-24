(function() {
  define([], function() {
    var Path;
    Path = function(init) {
      var instructions, plus, point, printInstrunction, push;
      instructions = init || [];
      push = function(arr, el) {
        var copy;
        copy = arr.slice(0, arr.length);
        copy.push(el);
        return copy;
      };
      printInstrunction = function(_arg) {
        var command, params;
        command = _arg.command, params = _arg.params;
        return "" + command + " " + (params.join(' '));
      };
      point = function(_arg) {
        var command, params;
        command = _arg.command, params = _arg.params;
        switch (command) {
          case 'M':
            return params;
          case 'L':
            return params;
          case 'Z':
            return [];
          case 'Q':
            return [params[2], params[3]];
          case 'A':
            return [params[5], params[6]];
        }
      };
      plus = function(instruction) {
        return Path(push(instructions, instruction));
      };
      return {
        moveto: function(x, y) {
          return plus({
            command: 'M',
            params: [x, y]
          });
        },
        lineto: function(x, y) {
          return plus({
            command: 'L',
            params: [x, y]
          });
        },
        closepath: function() {
          return plus({
            command: 'Z',
            params: []
          });
        },
        curveto: function(x2, y2, x, y) {
          return plus({
            command: 'S',
            params: [x2, y2, x, y]
          });
        },
        qcurveto: function(x, y) {
          return plus({
            command: 'Q',
            params: [x, y]
          });
        },
        arc: function(rx, ry, xrot, large_arc_flag, sweep_flag, x, y) {
          return plus({
            command: 'A',
            params: [rx, ry, xrot, large_arc_flag, sweep_flag, x, y]
          });
        },
        print: function() {
          return instructions.map(printInstrunction).join(' ');
        },
        points: function() {
          var instruction, ps, _i, _len;
          ps = [];
          for (_i = 0, _len = instructions.length; _i < _len; _i++) {
            instruction = instructions[_i];
            ps.push(point(instruction));
          }
          return ps;
        }
      };
    };
    return Path;
  });

}).call(this);
