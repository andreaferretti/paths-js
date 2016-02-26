Contributions to Paths.js are always welcome! If you feel like helping, be sure
to contact me through Github, so that efforts are not duplicated.

The library is currently written in Javascript, using the ES2015 standard. This
is then compiled with [Babel](https://babeljs.io/) to run into today's browsers.

If you do not feel like contributing to the library directly, you can always help
by spreading the word, or by improving the [demo](https://github.com/andreaferretti/paths-js-demo).
I am also developing [another demo](https://github.com/andreaferretti/paths-js-react-demo),
based on React.

How can I help?
---------------

There are a few things that Paths.js still needs; I will try to keep an updated
list here. Of course, other contributions are also welcome - this is just the
list of the stuff that I have in mind.

### Improve an existing chart

First, there are improvements to be made to existing charts. In particular, the
`Graph` chart is currently pretty slow and unoptimized. [This chapter](http://cs.brown.edu/~rt/gdhandbook/chapters/force-directed.pdf)
has an overview of existing algorithms for force-directed networks layout, and
it would be nice to try out some of the ideas in there. The tree layout algorithm
is also quite simplistic in its current implementation, and [this chapter](http://cs.brown.edu/~rt/gdhandbook/chapters/trees.pdf)
features a few possible improvements.

### Create a new chart

There are some charts that are still missing from Paths.js, in particular
[circle packings](http://mathworld.wolfram.com/CirclePacking.html) and the
[Circos diagram](http://circos.ca/).

### Improve testing and documentations

This does not need much explanation. :-) In particular, I would be happy to receive
feedback on how the documentation can be improved. As the author of the library,
I happen to understand how to use it fairly well, but I am sure there are pitfalls
for beginners.

### New general features

I have been tinkering with the idea of allowing arbitrary 2d transformations to
be applied to points just before computing the paths. This would allow, for instance,
to add a fisheye effect to existing graphs.

### Porting to other languages

There are [bindings](https://github.com/andreaferretti/paths-scala-js) to use
Paths.js with [Scala.js](http://www.scala-js.org/). A nice contribution would be
to create bindings for other languages, such as [ClojureScript](https://github.com/clojure/clojurescript)
or [TypeScript](http://www.typescriptlang.org/).

Workflow
--------

The simplest way to develop in Paths.js right now is to use the
[React demo](https://github.com/andreaferretti/paths-js-react-demo)
together with [NPM links](https://docs.npmjs.com/cli/link).

As a preliminary, clone both the library and the demo:

```bash
git clone https://github.com/andreaferretti/paths-js.git paths-js
git clone https://github.com/andreaferretti/paths-js-react-demo.git react-demo
```

Install their dependencies:

```bash
cd paths-js
npm install
cd ../react-demo
npm install
```

Make the library globally available:

```bash
cd ../paths-js/dist/node
npm link
```

Then link it from the demo:

```bash
cd ../../../react-demo
npm link paths-js
```

Whenever you want to work on the library, tell NPM to compile it in background:

```bash
cd ../paths-js
npm run watch
```

In another shell, start the demo application with live reloading:

```bash
cd ../react-demo
npm start
```

Now, whenever you make a modification, either to the library or the demo, everything
will be recompiled in background and the page will refresh to show the effect.

Guidelines
----------

There are not many restrictions on how to contribute. Just be sure to follow the
[general philosophy](Philosophy) and add tests for your work (see the existing
tests as an example).

Paths.js does not currently depend on external libraries, and it will remain so.
There are a couple of reasons for this:

- it is currently very hard to provide a library that depends on third-party
  libraries in a Javascript environment, while still making sure that this will
  work with both AMD or Common.js modules, and also as a standalone script
- it helps to keep the size of the library reasonable

Personally, I would have benefited from a collection library, such as Ramda or
Lodash, but ES2015 new style of iteration and ES5 `Array` methods make this more
tolerable.

Cloning everything
------------------

If you want to clone all repositories related to Paths.js (this is actually more
of a reminder to myself), just issue the command

```bash
git clone git@github.com:andreaferretti/paths-js.git paths
git clone https://github.com/andreaferretti/paths-js.wiki.git wiki
git clone git@github.com:andreaferretti/paths-js-demo.git demo
git clone -b gh-pages git@github.com:andreaferretti/paths-js-demo.git demo-page
git clone git@github.com:andreaferretti/paths-js-react-demo.git react-demo
git clone -b gh-pages git@github.com:andreaferretti/paths-js-react-demo.git react-demo-page
git clone git@github.com:andreaferretti/paths-scala-js.git scala-js
git clone -b gh-pages git@github.com:andreaferretti/paths-scala-js.git scala-js-docs
git clone git@github.com:andreaferretti/paths-scala-js-demo.git scala-js-demo
git clone -b gh-pages git@github.com:andreaferretti/paths-scala-js-demo.git scala-js-page
```