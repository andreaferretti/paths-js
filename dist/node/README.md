Paths.js
========

This library helps generating [SVG paths] [1] with a high level API. These paths can be then used together with a template engine such as [Mustache] [2] or [Handlebars] [3] to display SVG graphics in the browser. If instead of a static template engine, you use a data binding library, such as [Ractive.js] [4], [Angular] [5] or [Facebook React] [6], you get animated graphics for free.

Paths.js offers three APIs, of increasing abstraction. The lowest level is a chainable API to generate an arbitrary SVG path. On top of this, paths for simple geometric shapes such as polygons or circle sectors are defined. At the highest level, there is an API to generate some simple graphs (pie, line chart, radar...) for a collection of data, assembling the simple shapes.

Table of contents
-----------------

- [How does it look like?](#how-does-it-look-like)
- [Is it for me?](#is-it-for-me)
- [Installation and usage](#installation-and-usage)
- [Low level API](#low-level-api)
- [Mid level API (shapes)](#mid-level-api-shapes)
- [High level API (graphs)](#high-level-api-graphs)
- [Miscellaneous](#miscellaneous)
- [Browser support](#browser-support)

How does it look like?
----------------------

Well, it depends on how you style the graphics, because the actual drawing of the SVG is left to you. Anyway, [here] [7] is a demo application; a live version can be seen [here] [8].

Is it for me?
-------------

It depends. If what you need are some ready-made widgets and charts, probably not. In this case, libraries such as [Flotcharts] [9] or [Dimple] [10] may be a better fit. On the other hand, if you want to create your own charts, possibly with custom styling, interactions or animations, it may be a better idea to use a data-binding library and generate the SVG elements yourself. In this case, you will probably need to write some SVG paths, and Paths.js is designed to do exactly this. Another situation where you may want to deal directly with SVG elements is the case where you need to generate the graphics server side with Node.js. In this case you can couple Paths.js with any templating library of your choice, since Paths.js does not make use of any browser API (or any API outside the core ES5, actually).

The philosophy behind Paths.js is well explained in [this blog post](http://mlarocca.github.io/01-22-2014/pathsjs_ractive.html) by Marcello La Rocca. Also, check the slides from [my talk at MilanoJS user group](https://github.com/andreaferretti/paths-talk-slides), together with the [examples](https://github.com/andreaferretti/paths-talk-examples).

Installation and usage
----------------------

### Bower and RequireJS ###

Paths.js is distributed with [bower] [11], so you can install it with

    bower install paths-js

It is comprised of various AMD modules. If you use [RequireJS] [12], you can use a configuration such as

    require.config({
      'paths': 'components/paths-js/dist/amd'
    });

(the actual path will depend on your bower configuration). Then import the various modules like

    var Pie = require('paths/pie');

### Node.js ###

If you want to use it on the server, just do

    npm install paths-js

to install it and then

    var Pie = require('paths-js/pie');

### Standalone script ###

If you want to use Paths.js in the browser, but you do not want to use AMD modules, there is the possibility to include it in the global object. To do this, just include the file `dist/global/paths.js` in a page, and then access the various APIs globally as `paths.Pie`, `paths.Polygon` and so on. Paths.js at version 0.2.1 weighs only 10.8kB minified and 3.9kB minified and gzipped, but of course if you choose the AMD version, you get to include exactly the modules you need.

Low level API
-------------

At the heart of the library there is a very simple API to compose SVG paths by method chaining. At this level, we do not try to abstract away the specification of SVG paths, and the parameters mimic exactly the ones in the specification. An empty path object is created with the function `Path()` and complex path objects can be obtained from the empty one by chaining path methods. Thus, one can produce a path like

    var Path = require('paths/path');
    var path = Path()
      .moveto(10, 20)
      .lineto(30, 50)
      .lineto(25, 28)
      .qcurveto(27, 30, 32, 27)
      .closepath();

Other than methods to compose other paths, path objects have the methods `print` and `points`. The `print` method will give the textual representation of the path, that can be used inside an SVG figure like

    <!-- inside a template -->
    <svg width=300 height=300>
      <path d="{{ path.print() }}" fill="blue" />
    </svg>

The `points` method returns the array of points through which the path passes. This case be useful, for instance, to place labels near the endpoints.

The `instructions` method returns the array of instructions to build the path. This is used to access progammatically the single instructions and to join paths.

The `connect` method, applied to another path, adds the second path to the first one: if the end point of the first path is different from the start point of the second path, they are joined by a straight line.

All methods except `print` and `points` produce a new path (paths are immutable). These methods mimic the SVG path specification and are `moveto`, `lineto`, `hlineto`, `vlineto`, `curveto`, `qcurveto`, `smoothcurveto`, `smoothqcurveto` and `closepath`.

### Verbose API ###

It is also possible to use a more verbose API, where the parameters to the path methods are named. To do so, just pass an object to the path methods. The names of the parameters are the same as in the SVG specification. Hence

    Path()
      .moveto(2, 10)
      .lineto(3, 5)
      .hlineto(4)
      .vlineto(3)
      .curveto(1, 1, 2, 5, 3, 1)
      .smoothcurveto(2, 5, 2, 6)
      .qcurveto(0, 1, 2, 3)
      .smoothqcurveto(6, -3)
      .arc(3, 3, 2, 0, 1, 6, -3)
      .closepath()

is equivalent to

    Path()
      .moveto({x: 2, y: 10})
      .lineto({x: 3, y: 5})
      .hlineto({x: 4})
      .vlineto({y: 3})
      .curveto({x1: 1, y1: 1, x2: 2, y2: 5, x: 3, y:1})
      .smoothcurveto({x2: 2, y2: 5, x: 2, y: 6})
      .qcurveto({x1: 0, y1: 1, x: 2, y: 3})
      .smoothqcurveto({x: 6, y: -3})
      .arc({rx: 3, ry: 3, xrot: 2, large_arc_flag: 0, sweep_flag: 1, x: 6, y: -3})
      .closepath()

The verbose API can be freely mixed with the shorter one, so for instance

    Path()
      .moveto(2, 10)
      .lineto(3, 5)
      .curveto({x1: 1, y1: 1, x2: 2, y2: 5, x: 3, y:1})
      .smoothcurveto(2, 5, 2, 6)
      .qcurveto({x1: 0, y1: 1, x: 2, y: 3})

is perfectly valid.

Mid level API (shapes)
----------------------

At a higher level of abstraction, we have some simple shapes. A module for a shape defines a function that takes as input some geometric data and returns a shape object. Shape objects have the two properties `path` and `centroid`. The first one contains a `Path`, in the sense of the previous paragraph, while the second one is a point that is somehow central to the figure - for instance, it can be used to place a label. Thus a shape object has the structure

    {
      path: <path object>
      centroid: [<x>, <y>]
    }

### Polygon ###

The first shape is `paths.polygon`, and it can be used like:

    var Polygon = require('paths/polygon');
    var points = [[1, 3], [2, 5], [3, 4], [2, 0]];
    var polygon = Polygon({
      points: points,
      closed: true
    });

As shown in the example, it expects as input an object with the property `points`, which is an array of points. The optional property `closed` defined whether the polygon is closed (false by default).

### Semi-regular polygon ###

A special case of the above is a polygon whose points are placed on half-lines starting from a fixed center and forming constant angles between each other; we call these kinds of polygons semi-regular. In the even more special case where all points have the same distance from the center, the polygon is regular.

A semi-regular polygon is defined by its center and the distance of each of its points from the center, like

    var SemiRegularPolygon = require('paths/semi-regular-polygon');
    var polygon = SemiRegularPolygon({
      center: [0, 0],
      radii: [2, 3, 5, 7, 9, 12]
    });
    var regularPolygon = SemiRegularPolygon({
      center: [1, 2],
      radii: [3, 3, 3, 3, 3]
    });

In the above example, `polygon` is semi-regular and centered at the origin, while `regularPolygon` is a regular pentagon centered at `[1, 2]`.

### Rectangle ###

Another special case of `Polygon` is a rectangle having sides parallel to the axes. It can be generated with

    var Rectangle = require('paths/rectangle');
    var rectangle = Rectangle({
      top: 10,
      bottom: 3,
      left: -2,
      right: 5
    });

The SVG spec includes `<rect>` elements, so usually there is no need to use a `<path>` element to draw a rectangle, but it can be useful from time to time, in particular when generating bar charts.

### Bezier ###

Similar to `paths.polygon`, the module `paths.bezier` defines a curve that passes through a given list of vertices, but does so with a line that interpolates smoothly between the data points. Unlike polygons, curves produced in this way are always open.

An example is

    var Bezier = require('paths/bezier');
    var points = [[1, 3], [2, 5], [3, 4], [4, 0]];
    var curve = Bezier({
      points: points,
      tension: 0.4
    });

The parameter `tension` is optional and defaults to `0.3`; curves with smaller tension will look more pointy at the vertices.

### Sector ###

A circular sector can be defined with `paths.sector`:

    var Sector = require('paths/sector');
    var sector = Sector({
      center: [10, 20],
      r: 5,
      R: 15,
      start: 0,
      end: Math.PI / 2
    });

The `Sector` function takes as input an object having the following properties. `center` contains the coordinates of the center of the circles defining the sector; `r` and `R` are the internal and external radii; `start` and `end` are the start and end angle in radians. One can put `r = 0` to get a degenerate sector.

### Connector ###

A connector is an S-shaped path between two given points and lives in `paths.connector`:

    var Connector = require('paths/connector');
    var connector = Connector({
      start: [1, 12],
      end: [6, 3]
    });

The `Connector` function takes as input an object having the `start` and `end` properties, both of which are points in the plane.

High level API (graphs)
-----------------------

Based on the shapes above, we can construct more complex graphs. At this level, the API assume one has a collection of data that has to be shown on a graph, and take care of normalizing the data, so that for instance if you display multiple line graphs on the same chart, the scales are normalized.

All graph objects - that is, objects returned by some graph functions - have the field `curves` that contains an array, and possibly more fields, depending on the graph. Each element of `curves` has the properties `item`, which is a reference to the corresponding data item, `index`, and one or more field containing shape objects, for instance `sector` in the case of the pie graph, or `line` and `area` for the line charts. Thus, a graph object has the shape

    {
      curves: [
        {
          item: <datum>,
          index: <index>,
          <label>: <shape object>,
          ...
        },
        ...
      ],
      ...
    }

All of the following graph APIs accept a parameter named `compute` which is a hash table of functions that should be evaluated for each curve to be drawn. A typical use would be to compute a color based on the index or the data item, like

    {
      compute: {
        color: function(i, item) {
          ...
        }
      }
    }

All curves in the `curves` array will contain the corresponding properties in addition to `index` and `item`; for instance in the example above each curve will have the `color` property.

This feature is useful if the resulting graph will be rendered with a somewhat static template engine, such as Mustache, that needs to have all fields precomputed. More flexbile template engines, such as the one in Ractive, allow custom expressions to be evaluated in templates, so there will be generally no need for the `compute` parameter.

### Pie graph ###

The `Pie` graph can be used as follows:

    var Pie = require('paths/pie');
    var pie = Pie({
      data: [
        { name: 'Italy', population: 59859996 },
        { name: 'Mexico', population: 118395054 },
        { name: 'France', population: 65806000 },
        { name: 'Argentina', population: 40117096 },
        { name: 'Japan', population: 127290000 }
      ],
      accessor: function(x) { return x.population; },
      compute: {
        color: function(i) { return somePalette[i]; }
      },
      center: [20, 15],
      r: 30,
      R: 50
    });

Parameters:

* `center`, `r`, `R`: have the same geometric meaning as in the `Sector` function
* `data`: contains an array with the data to plot. The precise form of the data is not important, because the actual value of the data will be extracted by the `accessor` function.
* `accessor`: a function that is applied to each datum in `data` to extract a numeric value
* `compute` (optional): see the introduction.

The object returned by the `Pie` function contains the `curves` array, on which one can iterate to draw the sectors. Each member of this array has the properties `sector`, `index` and `item`, the latter containing the actual datum associated to the sector.

### Bar graph ###

The `Bar` graph can be used as follows:

    var Bar = require('paths/bar');
    var bar = Bar({
      data: [
        [
          { name: 'Italy', population: 59859996 },
          { name: 'Spain', population: 46704314 }
          { name: 'France', population: 65806000 },
          { name: 'Romania', population: 20121641 },
          { name: 'Greece', population: 10815197 }
        ],
        [
          { name: 'Zambia', population: 14580290 },
          { name: 'Cameroon', population: 20386799 }
          { name: 'Nigeria', population: 173615000 },
          { name: 'Ethiopia', population: 86613986 },
          { name: 'Ghana', population: 24658823 }
        ]
      ],
      accessor: function(x) { return x.population; },
      compute: {
        color: function(i) { return somePalette[i]; }
      },
      width: 500,
      height: 400,
      gutter: 10
    });

Parameters:

* `width`, `height`: have the obvious geometric meaning
* `data`: contains an array of arrays with the data to plot. The precise form of the data is not important, because the actual value of the data will be extracted by the `accessor` function. Each array will be represented by a series of bars with the same index.
* `accessor`: a function that is applied to each datum inside each item in `data` to extract a numeric value
* `gutter` (optional): the space to leave between each group of bars
* `compute` (optional): see the introduction.

The bar chart allows multiple histograms to be drawn side by side. If you just have one series to be plotted, put it inside an array of length one anyway, like this:

    Bar({
      data: [[2, 5, 3, 9, 7]],
      ...
    });

The object returned by the `Bar` function contains the `curves` array, on which one can iterate to draw the rectangles. Each member of this array has the properties `line`, `index` and `item`, the latter containing the actual datum associated to the rectangle.

### Stock graph ###

The `Stock` graph is used to represent one or more line charts. It can be used as follows:

    var Stock = require('paths/stock');
    var data = [
      [
        { year: 2012, month: 1, value: 13 },
        { year: 2012, month: 2, value: 12 },
        { year: 2012, month: 3, value: 15 }
      ],
      [
        { year: 2012, month: 1, value: 21 },
        { year: 2012, month: 2, value: 22 },
        { year: 2012, month: 3, value: 22 }
      ]
    ];

    function date(data) {
      var d = new Date();
      d.setYear(data.year);
      d.setMonth(data.month - 1);
      return d.getTime();
    }

    var stock = Stock({
      data: data,
      xaccessor: date,
      yaccessor: function(d) { return d.value; },
      width: 300,
      height: 200,
      compute: {
        color: function(i) { return somePalette[i]; }
      },
      closed: true
    });

Parameters:

* `width` and `height`: have the obvious geometric meaning; data will be rescaled to fit into a rectangle of these dimensions
* `data`: contains the actual data to plot. It should be an array of arrays, each internal array representing a time series to be plotted. The actual format of the data in the time series is not important; the actual abscissa and ordinate of the point are extracted by the `xaccessor` and `yaccessor` function.
* `xaccessor`, `yaccessor`: two functions that extract from each datum its x and y cordinates. They default to `function(d) { return d[0] }` and `function(d) { return d[1] }` respectively, so if `data` is passed as an array of arrays of arrays of 2 elements, the accessor functions are optional.
* `closed` (optional, default `false`): a boolean used to decide how to construct the paths for the area plots. If `closed` is set to true, these will be stretched to include part of the x axis, even if the data are not around 0. Use this if you want to be sure that the area paths touch the horizontal axis
* `compute` (optional): see the introduction.

The `Stock` function will then return an object with the properties `curves`, `xscale` and `yscale`. Under `curves` it contains an array of objects, each having the properties `line`, `area`, `item` and `index`. `line` and `area` are two polygon objects, as in the previous paragraph; the first one holds the polygon for the line chart, while the second one is a closed polygon that can be used to draw the area fill. Under `item` one finds the original element in the data.

Finally, `xscale` and `yscale` are the scales used to represent the data on the given width and height. They can be used to find the coordinates of the axis and draw them.

### Smooth line graph ###

The smooth line graph is used to represent one or more line charts; unlike `Stock` it interpolates between the data points with smooth Bézier curves. The API for `paths.smooth-line` is identical to `paths.stock`, so the two can be used interchangeably.

### Radar graph ###

The radar graph can be used as follows:

    var Radar = require('paths/radar');
    var data = [
      { hp: 45, attack: 49, defense: 49, sp_attack: 65, sp_defense: 65, speed: 45 },
      { hp: 60, attack: 62, defense: 63, sp_attack: 80, sp_defense: 80, speed: 60 },
      { hp: 80, attack: 82, defense: 83, sp_attack: 100, sp_defense: 100, speed: 80 },
      { hp: 45, attack: 25, defense: 50, sp_attack: 25, sp_defense: 25, speed: 35 }
    ]
    var radar = Radar({
      data: data,
      accessor: {
        attack: function(x) { return x.attack; },
        defense: function(x) { return x.defense; },
        speed: function(x) { return x.speed; }
      },
      compute: {
        color: function(i) { return somePalette[i]; }
      },
      max: 100,
      center: [20, 15],
      r: 30,
      rings: 5
    });

Parameters:

* `data`: contains an array of data to be plotted.
* `accessor`: an object that describes how to extract the various features from the data. The keys of this object correspond to the axes that are shown in the radar chart, and associated to each key is a function that maps a datum to its value along this axis. `accessor` is optional in the case where each datum is itself an object with numeric properties. For instance, if in the example above `accessor` was left out, we would obtain a radar graph of hexagons.
* `max`: represents the ideal maximum of each feature. `max` is optional; if it is left out, it is computed as the actual maximum of each feature, but one may want to override the computed value, for instance for constancy of scale during an animation.
* `r` and `center`: the radius and the center of the figure, respectively. So, the whole figure is scaled in such a way that a feature with value `max` will be sent to a distance `r` from the `center`.
* `rings` (optional, default `3`): the number of polygonal rings that shall appear in the chart.
* `compute` (optional): see the introduction.

The return value from `Radar` is an object with the properties `curves` and `rings`. `curves` is an array of objects, each one having the properties `polygon`, `item` and `index`, where `polygon` contains the actual path object. `rings` is an array of path objects, representing concentric regular polygons of increasing radius.

### Tree graph ###

The tree graph can be used as follows:

    var Tree = require('paths/tree');
    var data = {
      name: 1,
      descendants: [
        {
          name: 2,
          descendants: [
            {
              name: 4,
              descendants: [{
                name: 6,
                descendants: [{ name: 7 }]
              }]
            },
            { name: 5 }
          ]
        },
        {
          name: 3,
          descendants: [{ name: 8 }, { name: 9 }]
        }
      ]
    };
    var tree = Tree({
      data: data,
      children: function(x) { return x.descendants; },
      compute: {
        color: function(i) { return somePalette[i]; }
      },
      width: 400,
      height: 300
    });

Parameters:

* `data`: contains a tree-like structure with the data to be plotted.
* `width` and `height`: the dimensions of the graph
* `children` (optional): a function that returns the list of children of the given node. Defaults to `function(x) { return x.children; }`
* `compute` (optional): see the introduction.

The return value from `Tree` is an object with the properties `curves` and `nodes`. `curves` is an array of objects, each one having the properties `connector`, `item` and `index`, where `connector` contains the actual path object. `nodes` is an array of objects, each one having the properties `point` and `item`, representing the nodes of the tree.

### Waterfall graph ###

The `Waterfall` graph is a nice way to represent some values on a bar chart, together with other values that add up to their difference. A typical use would be breaking incomes or expenses into pieces. Since a picture is worth a thousand word, make sure to have a look at the demo. It can be used as follows:

    var Waterfall = require('paths/waterfall');
    var waterfall = Waterfall({
      data: [
        {
          name: 'Gross income',
          value: 30,
          absolute: true
        }
        {
          name: 'Transport',
          value: -6
        }
        {
          name: 'Distribution',
          value: -3
        }
        {
          name: 'Detail income'
          absolute: true
        }
        {
          name: 'Taxes',
          value: -8
        }
        {
          name: 'Net income'
          absolute: true
        }
      ],
      compute: {
        color: function(i, item) {
          if (item.absolute) return 'green';
          else return 'red';
        }
      },
      width: 500,
      height: 400,
      gutter: 10
    });

Parameters:

* `width`, `height`: have the obvious geometric meaning
* `data`: contains an array with the data to plot. The precise form of the data is not important, because the actual value of the data will be extracted by the `accessor` function.
* `accessor`: a function that is applied to each datum inside each item in `data` to extract its value. It should return an object with either the `absolute` or `value` property, or both. `value` represents the height of the current bar. `absolute` should be `true` if the bar should stand on its own, rather than appearing as the difference between consecutive bars.
* `max`, `min` (optional): maximum and minimum values represented on the chart. They are computed if they are not given explicitly, but setting them explicitly can be useful to draw more than one chart on the same scale.
* `gutter` (optional): the space to leave between each bar
* `compute` (optional): see the introduction.

The first item in the waterfall chart should have the `value` property and `absolute` set to `true`. The subsequent bars will usually have either `value` or `absolute` but not both. If they have `value`, this is considered relative to the previous bar. If they have `absolute` set to `true`, the value will be computed by summing all relative values up to that point.

For instance, the height of `Detail income` in the example is `21 = 30 - 6 - 3`, while the height of `Net income` is `13 = 21 - 8`.

The object returned by the `Waterfall` function contains the `curves` array, on which one can iterate to draw the rectangles. Each member of this array has the properties `line`, `index`, `value` and `item`, the latter containing the actual datum associated to the rectangle. `value` instead contains the height computed for this rectangle: it coincides with `item.value` whenever this is present, and otherwise it is equal to the cumulative value computed. For instance, `value` would be `21` for the `Detail Income` rectangle in the example above.

### Sankey Diagram ###

Sankey diagrams are a specific type of flow diagram, in which the arrows are proportional to the flow quantity. They are classically used to visualize energy accounts or material flow on a regional or national level, but they can represent any kind of quantitative flow, from source (to the left) to target (to the right). They are also closely related to "Alluvial diagrams". It can be used as follows:

    var Sankey = require('paths/sankey');
    var sankey = Sankey({
      data: {
        nodes:[
          [{id:"pippo"},{id:"pluto"},{id:"paperino"}]
          [{id:"qui"},{id:"quo"},{id:"qua"}]
          [{id:"nonna papera"},{id:"ciccio"}]
        ]
        links:[
          {start:"pippo", end:"quo", weight:10}
          {start:"pippo", end:"qua", weight:30}
          {start:"pluto", end:"nonna papera", weight:10}
          {start:"pluto", end:"qui", weight:10}
          {start:"pluto", end:"quo", weight:10}
          {start:"paperino", end:"ciccio", weight:100}
          {start:"qui", end:"ciccio", weight: 20}
          {start:"quo", end:"ciccio", weight: 10}
          {start:"qua", end:"nonna papera", weight: 30}
        ]
      }
      compute: {
        color: function(i, item) {
          return "red"
        }
      },
      node_accessor: function (x) { return x.id }
      width: 500,
      height: 400,
      gutter: 10,
      rect_width: 10
    });

Parameters:

* `width`, `height`: have the obvious geometric meaning
* `data`: contains an object with nodes and links. The precise form of the data is not important, because the actual value of the data will be extracted by the `accessor` function.
* `node_accessor`: a function that is applied to each datum inside each item in `data.nodes` to extract its id.
* `link_accessor`: a function that is applied to each datum inside each item in `data.links`.
* `gutter` (optional, default 10): the space to leave between each bar
* `rect_width` (optional, default 10): the widht of each bar
* `compute` (optional): see the introduction.

The `nodes` is a list of lists of objects. Each list represent a level of the diagram; each element in a list is an object which contains at least an id for the links. Id's should be unique to avoid wrong associations.

The `links` is a list of objects. Each object contains a `start` and an `end` (by id) and a weight, which represents how much flow is going from `start` to `end`; `start` should be on the left of `end` and you should avoid circles (which is automatic if you respect the previous rule!). You don't need to have `start` and `end` in two consecutive levels.

The object returned by the `Sankey` function contains the `curvedRectangles` array, on which one can iterate to draw the flows, and the `rectangles` array, on which one can iterate to draw the rectangles. Each member of this arrays has the properties `curve`, `index`, `item`, the latter containing the actual datum associated to the node/link. You can add more properties by passing them within the `compute` object.


Miscellaneous
-------------

Other than the modules mentioned above, Paths.js has the `linear` and `ops` modules. The `linear` module contains a function that can be used to generate linear scale, that is, functions that interpolate linearly a source interval on a target one (affine functions of one variable). An example of use to map the interval `[0, 3]` on the interval `[10, 40]` would be

    var Linear = require('paths/linear');
    var scale = Linear([0, 3], [10, 40]);
    var x = scale(2); // yields 30

The `ops` module contains various utility functions that are used internally. It is not meant for external use, hence it is not documented, but curious folks can have a look at its tests.

Browser support
---------------

Paths.js works in any environment that supports a modern version of Javascript, namely ES5. This includes any version of Node.js and all recent browsers. If you need support for older browsers, you can include an [ES5 polyfill] [13].

On the other hand, not every browser will be able to display the SVG graphics that you will generate. Usually, recent desktop browsers are ok, but mobile browser are slow in adopting the SVG specification. You can refer to [caniuse] [14] for more detailed information. Moreover, the [canvg] [15] project allows to draw SVG paths on a `<canvas>` element, and it seems that canvas [will be able] [16] to support SVG paths natively. Of course, this solutions limits the possibilities offered by data binding libraries for interaction, but they could be used as a fallback on less recent browsers.

[1]: http://www.w3.org/TR/SVG/paths.html
[2]: http://mustache.github.io/
[3]: http://handlebarsjs.com/
[4]: http://www.ractivejs.org/
[5]: http://angularjs.org/
[6]: http://facebook.github.io/react/
[7]: https://github.com/andreaferretti/paths-js-demo
[8]: http://andreaferretti.github.io/paths-js-demo/
[9]: http://www.flotcharts.org/
[10]: http://dimplejs.org/
[11]: http://bower.io/
[12]: http://requirejs.org/
[13]: https://github.com/kriskowal/es5-shim/
[14]: http://caniuse.com/#search=svg
[15]: http://code.google.com/p/canvg/
[16]: http://lists.w3.org/Archives/Public/public-whatwg-archive/2012Mar/0269.html
