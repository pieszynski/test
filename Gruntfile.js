
module.exports = function(grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json')
    });

    grunt.loadTasks('gruntTasks');

    grunt.registerTask('default', ['makeHomepage']);
}
