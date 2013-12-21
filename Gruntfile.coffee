module.exports = (grunt)->
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-urequire')

  grunt.initConfig
    yeoman:
      src: 'src/coffee/paths'
      dist: 'dist'
      test: 'test'

    clean:
      dist: ['<%= yeoman.dist %>']

    coffee:
      dist:
        expand: true
        cwd: '<%= yeoman.src %>'
        src: ['**/*.coffee']
        dest: '<%= yeoman.dist %>/amd'
        ext: '.js'

    urequire:
      dist:
        template: 'nodejs'
        path: "<%= yeoman.dist %>/amd"
        dstPath: "<%= yeoman.dist %>/node"

    copy:
      dist:
        files: [
          { expand: true, cwd: '.', src: ['package.json'], dest: '<%= yeoman.dist %>/node' }
        ]

  grunt.registerTask 'default', [
    'clean:dist'
    'coffee:dist'
    'urequire:dist'
    'copy:dist'
  ]
