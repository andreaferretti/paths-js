module.exports = (grunt)->
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-urequire')
  grunt.loadNpmTasks('grunt-mocha-cli')

  grunt.initConfig
    config:
      src: 'src/main/paths'
      dist: 'dist'
      test: 'src/test'
      test_dist: 'test'

    clean:
      dist: ['<%= config.dist %>']

    coffee:
      dist:
        expand: true
        cwd: '<%= config.src %>'
        src: ['**/*.coffee']
        dest: '<%= config.dist %>/amd'
        ext: '.js'
      test:
        expand: true
        cwd: '<%= config.test %>'
        src: ['**/*.coffee']
        dest: '<%= config.test_dist %>'
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

    mochacli:
      options:
        reporter: 'nyan'
        bail: true
      all: ['<%= config.test %>/*.js']

  grunt.registerTask 'test', [
    'coffee:test'
    'mochacli'
  ]

  grunt.registerTask 'default', [
    'clean:dist'
    'coffee:dist'
    'urequire:dist'
    'copy:dist'
  ]
