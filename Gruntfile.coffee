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
      global: ['<%= config.dist %>/helpers', '<%= config.dist %>/temp', '<%= config.dist %>/amd/all.js', '<%= config.dist %>/node/all.js']

    coffee:
      dist:
        expand: true
        cwd: '<%= config.src %>'
        src: ['**/*.coffee']
        dest: '<%= config.dist %>/amd'
        ext: '.js'
      help:
        expand: true
        cwd: '<%= config.helpers %>'
        src: ['**/*.coffee']
        dest: '<%= config.dist %>/helpers'
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
        ]

    concat:
      options:
        separator: ";"

      global:
        src: [
          '<%= config.dist %>/helpers/simple-require.js'
          '<%= config.dist %>/temp/all.js'
        ]
        dest: '<%= config.dist %>/global/paths.js'

    requirejs:
      compile:
        options:
          baseUrl: '.'
          appDir: '<%= config.dist %>/amd'
          dir: '<%= config.dist %>/temp'
          skipDirOptimize: true
          modules: [{ name: 'all' }]

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
        bail: true
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
    'coffee:help'
    'coffee:dist'
    'requirejs:compile'
    'urequire:dist'
    'copy:dist'
    'concat:global'
    'clean:global'
  ]
  
  grunt.registerTask 'default', ['test']
