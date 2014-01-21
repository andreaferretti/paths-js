module.exports = (grunt)->
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-requirejs')
  grunt.loadNpmTasks('grunt-urequire')
  grunt.loadNpmTasks('grunt-mocha-cli')

  grunt.initConfig
    config:
      src: 'src/main/paths'
      helpers: 'src/main/helpers'
      dist: 'dist'
      test: 'src/test'
      test_dist: 'test'

    clean:
      dist: ['<%= config.dist %>']
      test: ['<%= config.test_dist %>']
      global: [
        '<%= config.dist %>/helpers',
        '<%= config.dist %>/temp',
        '<%= config.dist %>/amd/all.js',
        '<%= config.dist %>/amd/almond.js',
        '<%= config.dist %>/node/all.js',
        '<%= config.dist %>/node/almond.js'
      ]

    coffee:
#      options:
#        bare: true
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
          { expand: true, cwd: '.', src: ['README.md'], dest: '<%= config.dist %>/node' }
          {
              expand: false,
              cwd: '.',
              src: ['<%= config.dist %>/temp/almond.js'],
              dest: '<%= config.dist %>/global/paths.js'
          }
        ]
      almond:
        files:[
          {
              expand: false,
              cwd: '.',
              src: ['bower_components/almond/almond.js'],
              dest: '<%= config.dist %>/amd/almond.js'
          }
        ]

    requirejs:
      compile:
        options:
          baseUrl: '.'
          appDir: '<%= config.dist %>/amd'
          dir: '<%= config.dist %>/temp'
          skipDirOptimize: true
          deps: ['all']
          insertRequire: ['all']
          name: 'almond'
          wrap: true

    watch:
      dist:
        files: ['<%= config.src %>/{,**/}*.coffee']
        tasks: ['coffee:dist', 'urequire:dist', 'clean:global']
      test:
        files: ['<%= config.test %>/{,**/}*.coffee']
        tasks: ['coffee:test', 'mochacli']

    mochacli:
      options:
        reporter: 'nyan'
      all: ['<%= config.test %>/*.js']

  grunt.registerTask 'test', [
    'build'
    'clean:test'
    'coffee:test'
    'mochacli'
    'watch'
  ]

  grunt.registerTask 'build', [
    'clean:dist'
    'coffee:dist'
    'copy:almond'
    'requirejs:compile'
    'urequire:dist'
    'copy:dist'
    'clean:global'
  ]

  grunt.registerTask 'default', ['test']
