Steps to deploy
===============

* Try a new feature in the demo application, using [this workflow](https://github.com/andreaferretti/paths-js/wiki/Contributing#workflow)
* If it is a new chart, remember to expose it in [all.js](https://github.com/andreaferretti/paths-js/blob/master/src/all.js)
* Add tests
* Update `bower.json` and `package.json` version number
* Build (to generate new `package.json` for NPM), commit again and add a version tag
* Push to Github for bower
* Publish on NPM  with `npm publish` inside `dist/node`
* Update the WebJars repository from [here](http://www.webjars.org/bower)
* Wrap the feature inside a Scala.js façade
* Publish a new version of Paths.scala.js on Maven central