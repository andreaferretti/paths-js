(function() {
  var Path, expect, labels;

  Path = require('../dist/node/path.js');

  expect = require('expect.js');

  labels = function(path) {
    var regex;
    regex = /([A-Z])/g;
    return path.print().match(regex);
  };

  describe('node module import', function() {
    return it('should export the correct type', function() {
      return expect(Path).to.be.a('function');
    });
  });

  describe('path', function() {
    it('should have methods to get the points and the printed string', function() {
      var path;
      path = Path();
      expect(path).to.have.property('points');
      return expect(path).to.have.property('print');
    });
    it('should have methods corresponding the SVG path spec', function() {
      var path;
      path = Path();
      expect(path).to.have.property('moveto');
      expect(path).to.have.property('lineto');
      expect(path).to.have.property('hlineto');
      expect(path).to.have.property('vlineto');
      expect(path).to.have.property('closepath');
      expect(path).to.have.property('curveto');
      expect(path).to.have.property('qcurveto');
      expect(path).to.have.property('smoothcurveto');
      expect(path).to.have.property('smoothqcurveto');
      return expect(path).to.have.property('arc');
    });
    it('should ignore constructor arguments', function() {
      var path;
      path = Path([
        {
          command: 'L',
          params: [2, 3]
        }
      ]);
      return expect(path.points()).to.have.length(0);
    });
    return it('should ignore malformed constructor arguments', function() {
      var path;
      path = Path([
        {
          garbage: 'L',
          random: [2, 3]
        }
      ]);
      return expect(path.points()).to.have.length(0);
    });
  });

  describe('points method', function() {
    it('should report the expected point for a moveto command', function() {
      var path;
      path = Path().moveto(2, 10);
      return expect(path.points()).to.eql([[2, 10]]);
    });
    it('should report the expected points for lineto commands', function() {
      var path;
      path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17);
      return expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]]);
    });
    it('should report the expected points for horizontal line commands', function() {
      var path;
      path = Path().moveto(4, 5).hlineto(3).lineto(-1, 17);
      return expect(path.points()).to.eql([[4, 5], [3, 5], [-1, 17]]);
    });
    it('should report the expected points for vertical line commands', function() {
      var path;
      path = Path().moveto(4, 5).vlineto(3).lineto(-1, 17);
      return expect(path.points()).to.eql([[4, 5], [4, 3], [-1, 17]]);
    });
    it('should not add points when closing a path', function() {
      var path;
      path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17);
      return expect(path.points()).to.eql(path.closepath().points());
    });
    it('should report the expected points for curveto commands', function() {
      var path;
      path = Path().moveto(4, 5).curveto(1, 1, 2, 6, 3, 1).lineto(-1, 17);
      return expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]]);
    });
    it('should report the expected points for smoothcurveto commands', function() {
      var path;
      path = Path().moveto(4, 5).smoothcurveto(1, 1, 3, 1).lineto(-1, 17);
      return expect(path.points()).to.eql([[4, 5], [3, 1], [-1, 17]]);
    });
    it('should report the expected points for quadratic curveto commands', function() {
      var path;
      path = Path().moveto(4, 5).qcurveto(6, -3).curveto(2, 1, 3, -1, -1, 17);
      return expect(path.points()).to.eql([[4, 5], [6, -3], [-1, 17]]);
    });
    it('should report the expected points for smoothqcurveto commands', function() {
      var path;
      path = Path().moveto(4, 5).smoothqcurveto(1, 1).lineto(1, 6);
      return expect(path.points()).to.eql([[4, 5], [1, 1], [1, 6]]);
    });
    return it('should report the expected points for arc commands', function() {
      var path;
      path = Path().moveto(0, 1).arc(3, 3, 2, 0, 1, 6, -3).curveto(2, 1, 3, 1, -1, 17);
      return expect(path.points()).to.eql([[0, 1], [6, -3], [-1, 17]]);
    });
  });

  describe('print method', function() {
    it('should report the expected labels for a moveto command', function() {
      var path;
      path = Path().moveto(2, 10);
      return expect(labels(path)).to.eql(['M']);
    });
    it('should report the expected labels for lineto commands', function() {
      var path;
      path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17);
      return expect(labels(path)).to.eql(['M', 'L', 'L']);
    });
    it('should report the expected labels for horizontal line commands', function() {
      var path;
      path = Path().moveto(4, 5).hlineto(3).lineto(-1, 17);
      return expect(labels(path)).to.eql(['M', 'H', 'L']);
    });
    it('should report the expected labels for vertical line commands', function() {
      var path;
      path = Path().moveto(4, 5).vlineto(3).lineto(-1, 17);
      return expect(labels(path)).to.eql(['M', 'V', 'L']);
    });
    it('should report the expected labels when closing a path', function() {
      var path;
      path = Path().moveto(4, 5).lineto(3, 1).lineto(-1, 17).closepath();
      return expect(labels(path)).to.eql(['M', 'L', 'L', 'Z']);
    });
    it('should report the expected labels for curveto commands', function() {
      var path;
      path = Path().moveto(4, 5).curveto(1, 1, 3, 1).lineto(-1, 17);
      return expect(labels(path)).to.eql(['M', 'C', 'L']);
    });
    it('should report the expected points for quadratic curveto commands', function() {
      var path;
      path = Path().moveto(4, 5).qcurveto(6, -3).curveto(2, 1, -1, 17);
      return expect(labels(path)).to.eql(['M', 'Q', 'C']);
    });
    return it('should report the expected points for arc commands', function() {
      var path;
      path = Path().moveto(0, 1).arc(3, 3, 2, 0, 1, 6, -3).curveto(2, 1, -1, 17);
      return expect(labels(path)).to.eql(['M', 'A', 'C']);
    });
  });

}).call(this);
