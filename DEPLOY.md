Steps to deploy
===============

* Try a new feature in the demo application
* Copy it to the main repository and fix paths
* Commit and tag it (locally) to check it still works on the demo
* Remove local tag
* Update `bower.json` and `package.json` version number
* Add tests
* Commit again and add tag
* Push to Github for bower
* Publish on NPM  with `npm publish` inside `dist/node`
* Make a PR to update the WebJars repository
* Wrap the feature inside a Scala.js façade
* Publish a new version of Paths.scala.js on Maven central