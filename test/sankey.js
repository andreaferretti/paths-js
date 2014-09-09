(function() {
  var CurvedRectangle, Sankey, c_rect, curv_rect_data, data, expect, height, rect_width, sankey, width;

  Sankey = require('../dist/node/sankey.js');

  CurvedRectangle = require('../dist/node/curved-rectangle.js');

  expect = require('expect.js');

  data = {
    nodes: [["pippo", "paperino"], ["pluto", "ciccio", "nonna papera"], ["minnie", "gastone"]],
    links: [
      {
        start: "pippo",
        end: "pluto",
        weight: 100
      }, {
        start: "pippo",
        end: "minnie",
        weight: 50
      }, {
        start: "paperino",
        end: "gastone",
        weight: 60
      }
    ]
  };

  width = 300;

  height = 400;

  rect_width = 10;

  curv_rect_data = {
    topleft: [rect_width, 0],
    topright: [width - rect_width, 0],
    bottomleft: [rect_width, height],
    bottomright: [width - rect_width, height]
  };

  c_rect = CurvedRectangle(curv_rect_data);

  sankey = Sankey({
    data: data,
    width: width,
    height: height,
    rect_width: rect_width,
    gutter: 10,
    compute: {
      myitem: function(i, d) {
        return d;
      },
      myindex: function(i) {
        return i;
      },
      mygroup: function(i, d, g) {
        return g;
      }
    }
  });

  describe('sankey diagram', function() {
    it('should generate as many rectangles as data nodes', function() {
      return expect(sankey.rectangles).to.have.length(7);
    });
    it('should generate as many curved rectangles as data links', function() {
      return expect(sankey.curvedRectangles).to.have.length(3);
    });
    it('should include the group number', function() {
      return expect(sankey.rectangles[4].group).to.be(1);
    });
    return it('should allow custom computations', function() {
      expect(sankey.rectangles[2].myitem).to.be(sankey.rectangles[2].item);
      expect(sankey.curvedRectangles[2].myindex).to.be(sankey.curvedRectangles[2].index);
      return expect(sankey.rectangles[5].mygroup).to.be(sankey.rectangles[5].group);
    });
  });

}).call(this);
