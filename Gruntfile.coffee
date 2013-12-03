mountFolder = (connect, dir)->
	return connect.static(require('path').resolve(dir))

fileHTMLRewriter = ({regex, snippet})->
	excludeList = [".woff", ".js", ".css", ".ico"]

	acceptsHtmlExplicit = (req)->
		accept = req.headers["accept"]
		return false unless accept
		return (~accept.indexOf("html"))

	isExcluded = (req)->
		url = req.url
		excluded = false
		return true unless url

		excludeList.forEach (exclude)->
			if ~url.indexOf(exclude)
				excluded = true
		return excluded

	return (req, res, next)->
		write = res.write

		# Select just html file
		if !acceptsHtmlExplicit(req) or isExcluded(req)
      		return next()

		res.write = (string, encoding)->
			body = if string instanceof Buffer then string.toString() else string
			body = body.replace regex, snippet

			if string instanceof Buffer
				string = new Buffer(body)
			else
				string = body

			unless this.headerSent
				this.setHeader 'content-length', Buffer.byteLength(body)+snippet.lenght
				this._implicitHeader()

			write.call(res, string, encoding)

		next()

module.exports = (grunt)->

	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-coffee')

	# configurable paths
	yeomanConfig = {
		src: 'src'
		dist: 'dist'
		test: 'test'
	}

	try
		yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app
	catch e
	
	#
	# Grunt configuration:
	#
	# https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
	#
	grunt.initConfig

		# Project configuration
		# ---------------------
		yeoman: yeomanConfig

		clean:
			dist: ['<%= yeoman.dist %>']

		coffee:
			dist:
				expand: true
				cwd: 'src/coffee/'
				src: ['**/*.coffee']
				dest: '<%= yeoman.dist %>'
				ext: '.js'

	grunt.registerTask('default', ['clean:dist', 'coffee:dist'])
