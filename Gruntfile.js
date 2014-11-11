
module.exports = function(grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        clean: {
            production : {
                force : true,
                src : ["./app/js/pack/**"]
            }
        },
        copy : {
            production : {
                files : [
                    {
                        expand: false,
                        src: ['bower_components/jquery/dist/jquery.min.js'],
                        dest: 'app/js/pack/jquery.min.js'
                    },
                    {
                        expand: false,
                        src: ['bower_components/angular/angular.min.js'],
                        dest: 'app/js/pack/angular.min.js'
                    },
                    {
                        expand: false,
                        src: ['bower_components/underscore/underscore-min.js'],
                        dest: 'app/js/pack/underscore.min.js'
                    },
                    {
                        expand: false,
                        src: ['bower_components/underscore.string/dist/underscore.string.min.js'],
                        dest: 'app/js/pack/underscore.string.min.js'
                    }
                ]
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['window','jQuery', 'Backbone', 'angular', 'underscore', 'underscore.string', 'DI']
                }
            },
            production: {
                files: {
                    'app/js/pack/mainTemplate.min.js': ['app/js/mainTemplate.js']
                }
            }
        },
        concat : {
            options : {
                stripBanners : true
            },
            productionJs : {
                src : [
                    'app/js/pack/jquery.min.js',
                    'app/js/pack/angular.min.js',
                    'app/js/pack/underscore.min.js',
                    'app/js/pack/underscore.string.min.js',
                    'app/js/pack/mainTemplate.min.js'
                ],
                dest : 'app/js/pack/mainTemplate.pack.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadTasks('gruntTasks');

    grunt.registerTask('default', ['clean','copy','uglify','concat','makeHomepage']);
}
