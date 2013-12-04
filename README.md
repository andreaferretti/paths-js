Paths.js
========

This library helps generating [SVG paths] [1] with a high level API. These paths can be then used together with a template engine such as [Mustache] [2] or [Handlebars] [3] to display SVG graphics in the browser. If instead of a static template engine, you use a data binding library, such as [Ractive.js] [4] or [Angular] [5], you get animated graphics for free.

Paths.js offers three APIs, of increasing abstraction. The lowest level is a chainable API to generate an arbitrary SVG path. On top of this, paths for simple geometric shapes such as rectangles or circle sectors are defined. At the highest level, there is an API to generate some simple graphs (pie, bar chart, lines...) for a collection of data, assembling the simples shapes.

Installation and usage
----------------------

Paths.js is distributed with [bower] [6], so you can install it like

    bower install paths-js

It is distributed as an AMD module. If you use [RequireJS] [7], you can use a configuration such as

    require.config({
      'paths': 'components/paths-js/dist/paths'
    });

(the actual path will depend on your bower configuration). Then import the various modules like

    var pie = require('paths/pie');

In the future, I will provide other ways to leverage Paths.js, either as a CommonJS module for use in node, or as a global.

Low level API
-------------

Mid level API (shapes)
----------------------

High level API (graphs)
-----------------------

[1]: http://www.w3.org/TR/SVG/paths.html
[2]: http://mustache.github.io/
[3]: http://handlebarsjs.com/
[4]: http://www.ractivejs.org/
[5]: http://angularjs.org/
[6]: http://bower.io/
[7]: http://requirejs.org/
