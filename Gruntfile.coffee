module.exports = (grunt)->
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-urequire')

  grunt.initConfig
    config:
      src: 'src/coffee/paths'
      dist: 'dist'
      test: 'test'

    clean:
      dist: ['<%= config.dist %>']

    coffee:
      dist:
        expand: true
        cwd: '<%= config.src %>'
        src: ['**/*.coffee']
        dest: '<%= config.dist %>/amd'
        ext: '.js'

    urequire:
      dist:
        template: 'nodejs'
        path: "<%= config.dist %>/amd"
        dstPath: "<%= config.dist %>/node"

    copy:
      dist:
        files: [
          { expand: true, cwd: '.', src: ['package.json'], dest: '<%= config.dist %>/node' }
        ]

  grunt.registerTask 'default', [
    'clean:dist'
    'coffee:dist'
    'urequire:dist'
    'copy:dist'
  ]
