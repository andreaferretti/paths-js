module.exports = (grunt)->
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-urequire')

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
    
    urequire:
      dist:
        template: 'nodejs'
        path: "<%= yeoman.dist %>"
        main: 'paths/path'
        dstPath: "<%= yeoman.dist %>/node"

  grunt.registerTask('default', ['clean:dist', 'coffee:dist', 'urequire:dist'])
