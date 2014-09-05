(function() {
  var CurvedRectangle, Sankey, c_rect, curv_rect_data, data, expect, height, rect_width, sankey, width;

  Sankey = require('../dist/node/sankey.js');

  CurvedRectangle = require('../dist/node/curved-rectangle.js');

  expect = require('expect.js');

  data = {
    nodes: [["pippo"], ["pluto"]],
    links: [
      {
        start: "pippo",
        end: "pluto",
        weight: 100
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
      myindex: function(i, d) {
        return i;
      }
    }
  });

  describe('sankey diagram', function() {
    it('should generate as many rectangles as data nodes', function() {
      return expect(sankey.rectangles).to.have.length(2);
    });
    it('should generate as many curved rectangles as data links', function() {
      return expect(sankey.curvedRectangles).to.have.length(1);
    });
    return it('coincide with a single curved rect if there is only one link', function() {
      return expect(sankey.curvedRectangles[0].curve.path.print()).to.be(c_rect.path.print());
    });
  });

}).call(this);
