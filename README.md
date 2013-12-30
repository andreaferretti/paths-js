Paths.js
========

This library helps generating [SVG paths] [1] with a high level API. These paths can be then used together with a template engine such as [Mustache] [2] or [Handlebars] [3] to display SVG graphics in the browser. If instead of a static template engine, you use a data binding library, such as [Ractive.js] [4], [Angular] [5] or [Facebook React] [6], you get animated graphics for free.

Paths.js offers three APIs, of increasing abstraction. The lowest level is a chainable API to generate an arbitrary SVG path. On top of this, paths for simple geometric shapes such as polygons or circle sectors are defined. At the highest level, there is an API to generate some simple graphs (pie, line chart, radar...) for a collection of data, assembling the simple shapes.

> Note that the API is still in flux and may not stabilize until version 0.1.0.

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

Installation and usage
----------------------

Paths.js is distributed with [bower] [11], so you can install it like

    bower install paths-js

It is distributed as an AMD module. If you use [RequireJS] [12], you can use a configuration such as

    require.config({
      'paths': 'components/paths-js/dist/amd'
    });

(the actual path will depend on your bower configuration). Then import the various modules like

    var Pie = require('paths/pie');

If you want to use it on the server, just do

    npm install paths-js

to install it and then

    var Pie = require('paths-js/pie');
    
Finally, if you want to use Paths.js in the browser, but you do not want to use AMD modules, there is the possibility to include it in the global object. To do this, just include the file `dist/global/paths.js` in a page, and then access the various APIs globally as `paths.Pie`, `paths.Polygon` and so on. Paths.js at version 0.14 weighs only 7.3kB minified and 2.5kB minified and gzipped, but of course if you choose the AMD version, you get to include exactly the modules you need.

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

All methods except `print` and `points` produce a new path (paths are immutable). These methods mimic the SVG path specification and are `moveto`, `lineto`, `hlineto`, `vlineto`, `curveto`, `qcurveto`, `smoothcurveto`, `smoothqcurveto` and `closepath`.


Mid level API (shapes)
----------------------

At a higher level of abstraction, we have some simple shapes. A module for a shape defines a function that takes as input some geometric data and returns a shape object. Shape objects have the two properties `path` and `centroid`. The first one contains a `Path`, in the sense of the previous paragraph, while the second one is a point that is somehow central to the figure - for instance, it can be used to place a label.

### Polygon ###

The first shape is `paths.polygon`, and it can be used like:

    var Polygon = require('paths/polygon');
    var points = [[1, 3], [2, 5], [3, 4], [2, 0]];
    var polygon = Polygon({
      points: points,
      closed: true
    });

As shown in the example, it expects as input an object with the property `points`, which is an array of points. The optional property `closed` defined whether the polygon is closed (false by default).

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

High level API (graphs)
-----------------------

Based on the shapes above, we can construct more complex graphs. At this level, the API assume one has a collection of data that has to be shown on a graph, and take care of normalizing the data, so that for instance if you display multiple line graphs on the same chart, the scales are normalized.

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
      colors: function(i) { return somePalette[i]; },
      center: [20, 15],
      r: 30,
      R: 50
    });

Parameters: 

* `center`, `r`, `R`: have the same geometric meaning as in the `Sector` function
* `data`: contains an array with the data to plot. The precise form of the data is not important, because the actual value of the data will be extracted by the `accessor` function.
* `accessor`: a function that is applied to each datum in `data` to extract a numeric value
* `colors` (optional): a function that assign to a sector index its color.

The `Pie` function will then return an array on which one can iterate to draw the sectors. Each member of this array has the properties `sector`, `color` and `item`, the latter containing the actual datum associated to the sector.

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
      colors: function(i) { return somePalette[i]; },
      closed: true
    });

Parameters:
    
* `width` and `height`: have the obvious geometric meaning; data will be rescaled to fit into a rectangle of these dimensions
* `data`: contains the actual data to plot. It should be an array of arrays, each internal array representing a time series to be plotted. The actual format of the data in the time series is not important; the actual abscissa and ordinate of the point are extracted by the `xaccessor` and `yaccessor` function.
* `xaccessor`, `yaccessor`: two functions that extract from each datum its x and y cordinates. They default to `function(d) { return d[0] }` and `function(d) { return d[1] }` respectively, so if `data` is passed as an array of arrays of arrays of 2 elements, the accessor functions are optional.
* `closed` (optional, default `false`): a boolean used to decide how to construct the paths for the area plots. If `closed` is set to true, these will be stretched to include part of the x axis, even if the data are not around 0. Use this if you want to be sure that the area paths touch the horizontal axis
* `colors` (optional): a function that assign to a line index its color.

The `Stock` function will then return an object with the properties `polygons`, `xscale` and `yscale`. Under `polygons` it contains an array of objects, each having the properties `line`, `area`, `item` and `color`. `line` and `area` are two polygon objects, as in the previous paragraph; the first one holds the polygon for the line chart, while the second one is a closed polygon that can be used to draw the area fill. Under `item` one finds the original element in the data.

Finally, `xscale` and `yscale` are the scales used to represent the data on the given width and height. They can be used to find the coordinates of the axis and draw them.

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
