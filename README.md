Paths.js
========

This library helps generating [SVG paths] [1] with a high level API. These paths can be then used together with a template engine such as [Mustache] [2] or [Handlebars] [3] to display SVG graphics in the browser. If instead of a static template engine, you use a data binding library, such as [Ractive.js] [4] or [Angular] [5], you get animated graphics for free.

Paths.js offers three APIs, of increasing abstraction. The lowest level is a chainable API to generate an arbitrary SVG path. On top of this, paths for simple geometric shapes such as rectangles or circle sectors are defined. At the highest level, there is an API to generate some simple graphs (pie, bar chart, lines...) for a collection of data, assembling the simple shapes.

> Note that the API is still in flux and may not stabilize until version 0.1.0.

How does it look like?
----------------------

Well, it depends on how you style the graphics, because the actual drawing of the SVG is left to you. Anyway, [here] [6] is an example demo application.

Installation and usage
----------------------

Paths.js is distributed with [bower] [7], so you can install it like

    bower install paths-js

It is distributed as an AMD module. If you use [RequireJS] [8], you can use a configuration such as

    require.config({
      'paths': 'components/paths-js/dist/paths'
    });

(the actual path will depend on your bower configuration). Then import the various modules like

    var Pie = require('paths/pie');

In the future, I will provide other ways to leverage Paths.js, either as a CommonJS module for use in node, or as a global.

Low level API
-------------

At the heart of the library there is a very simple API to compose SVG paths by method chaining. At this level, we do not try to abstract away the specification of SVG paths, and the parameters mimic exactly the ones in the specification. You can produce a path like

    var Path = require('paths/path');
    var path = Path()
      .moveto(10, 20)
      .lineto(30, 50)
      .lineto(25, 28)
      .qcurveto(32, 27)
      .closepath();

When one is satisfied with the path, the `print` method will give the textual representation of the path, that can be used inside an SVG figure like

    <!-- inside a template -->
    <svg width=300 height=300>
      <path d="{{ path.print() }}" fill="blue" />
    </svg>

Path objects can be create with the `Path` function. All methods except `print` produce a new path (paths are immutable). These methods mimic the SVG path specification and are, until now, `moveto`, `lineto`, `curveto`, `qcurveto` and `closepath`. The missing methods - `hlineto`, `vlineto`, `smoothcurveto` and `smoothqcurveto` - will be added soon.


Mid level API (shapes)
----------------------

At a higher level of abstraction, we have some simple shapes. A module for a shape defines a function that takes as input some geometric data and returns a shape object. Shape objects have the two properties `path` and `centroid`. The first one contains a `Path`, in the sense of the previous paragraph, while the second one is a point that is somehow central to the figure - for instance, it can be used to place a label.

The first shape is `paths.polygon`, and it can be used like:

    var Polygon = require('paths/polygon');
    var points = [[1, 3], [2, 5], [3, 4], [2, 0]];
    var polygon = Polygon({
      points: points,
      closed: true
    });

As shown in the example, it expects as input an object with the property `points`, which is an array of points. The optional property `closed` defined whether the polygon is closed (false by default).

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

High level API (graphs)
-----------------------

Based on the shapes above, we can construct more complex graphs. At this level, the API assume one has a collection of data that has to be shown on a graph, and take care of normalizing the data, so that for instance if you display multiple line graphs on the same chart, the scales are normalized.

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
      colors: function(i) { return somePalette[i]; },
      center: [20, 15],
      r: 30,
      R: 50
    });

The parameters `center`, `r`, `R` have the same geometric meaning as in the `Sector` function. The parameter `data` should contain an array with the data to plot. The precise form of the data is not important, because the actual value of the data will be extracted by the `accessor` function. Finally `colors` is an optional parameter, holding a function that assign to a sector index its color.

The `Pie` function will then return an array on which one can iterate to draw the sectors. Each member of this array has the properties `sector`, `color` and `item`, the latter containing the actual datum associated to the sector.

[1]: http://www.w3.org/TR/SVG/paths.html
[2]: http://mustache.github.io/
[3]: http://handlebarsjs.com/
[4]: http://www.ractivejs.org/
[5]: http://angularjs.org/
[6]: https://github.com/andreaferretti/paths-js-demo
[7]: http://bower.io/
[8]: http://requirejs.org/