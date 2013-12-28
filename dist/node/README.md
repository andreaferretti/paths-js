Paths.js
========

This library helps generating [SVG paths] [1] with a high level API. These paths can be then used together with a template engine such as [Mustache] [2] or [Handlebars] [3] to display SVG graphics in the browser. If instead of a static template engine, you use a data binding library, such as [Ractive.js] [4], [Angular] [5] or [Facebook React] [6], you get animated graphics for free.

Paths.js offers three APIs, of increasing abstraction. The lowest level is a chainable API to generate an arbitrary SVG path. On top of this, paths for simple geometric shapes such as polygons or circle sectors are defined. At the highest level, there is an API to generate some simple graphs (pie, line chart, radar...) for a collection of data, assembling the simple shapes.

> Note that the API is still in flux and may not stabilize until version 0.1.0.

How does it look like?
----------------------

Well, it depends on how you style the graphics, because the actual drawing of the SVG is left to you. Anyway, [here] [7] is a demo application; a live version can be seen [here] [8].

Is it for me?
-------------

It depends. If what you need are some ready-made widgets and charts, probably not. In this case, libraries such as jquery.flot of vivagraph may be a better fit. On the other hand, if you want to create your own charts, possibly with custom styling, interactions or animations, it may be a better idea to use a data-binding library and generate the SVG elements yourself. In this case, you will probably need to write some SVG paths, and Paths.js is designed to do exactly this. Another situation where you may want to deal directly with SVG elements is the case where you need to generate the graphics server side with Node.js. In this case you can couple Paths.js with any templating library of your choice, since Paths.js does not make use of any browser API (or any API outside the core ES5, actually).

Installation and usage
----------------------

Paths.js is distributed with [bower] [9], so you can install it like

    bower install paths-js

It is distributed as an AMD module. If you use [RequireJS] [10], you can use a configuration such as

    require.config({
      'paths': 'components/paths-js/dist/amd'
    });

(the actual path will depend on your bower configuration). Then import the various modules like

    var Pie = require('paths/pie');

If you want to use it on the server, just do

    npm install paths-js

to install it and then

    var Pie = require('paths-js/pie');
    
Finally, if you want to use Paths.js in the browser, but you do not want to use AMD modules, there is the possibility to include it in the global object. To do this, just include the file `dist/global/paths.js` in a page, and then access the various APIs globally as `paths.Pie`, `paths.Polygon` and so on.

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
    
Path objects also have a `points` method that return the array of points through which the path passes. This case be useful, for instance, to place labels near the endpoints.

Path objects are created with the `Path` function. All methods except `print` and `points` produce a new path (paths are immutable). These methods mimic the SVG path specification and are `moveto`, `lineto`, `hlineto`, `vlineto`, `curveto`, `qcurveto`, `smoothcurveto`, `smoothqcurveto` and `closepath`.


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

Browser support
---------------

Paths.js works in any environment that supports a modern version of Javascript, namely ES5. This includes any version of Node.js and all recent browsers. If you need support for older browsers, you can include an [ES5 polyfill] [11].

On the other hand, not every browser will be able to display the SVG graphics that you will generate. Usually, recent desktop browsers are ok, but mobile browser are slow in adopting the SVG specification. You can refer to [caniuse] [12] for more detailed information. Moreover, the [canvg] [13] project allows to draw SVG paths on a `<canvas>` element, and it seems that canvas [will be able] [14] to support SVG paths natively. Of course, this solutions limits the possibilities offered by data binding libraries for interaction, but they could be used as a fallback on less recent browsers.

[1]: http://www.w3.org/TR/SVG/paths.html
[2]: http://mustache.github.io/
[3]: http://handlebarsjs.com/
[4]: http://www.ractivejs.org/
[5]: http://angularjs.org/
[6]: http://facebook.github.io/react/
[7]: https://github.com/andreaferretti/paths-js-demo
[8]: http://andreaferretti.github.io/paths-js-demo/
[9]: http://bower.io/
[10]: http://requirejs.org/
[11]: https://github.com/kriskowal/es5-shim/
[12]: http://caniuse.com/#search=svg
[13]: http://code.google.com/p/canvg/
[14]: http://lists.w3.org/Archives/Public/public-whatwg-archive/2012Mar/0269.html
