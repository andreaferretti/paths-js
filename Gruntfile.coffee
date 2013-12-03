module.exports = (grunt)->
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-coffee')

	grunt.initConfig
		yeoman:
		  src: 'src'
		  dist: 'dist'
		  test: 'test'

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
