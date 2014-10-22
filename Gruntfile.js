module.exports = function (grunt) {
    grunt.initConfig({
        protractor: {
            options: {
                keepAlive: true,
                singleRun: false,
                configFile: "protractorConf.js"
            },
            run: {

            }
        },
        concurrent: {
            protractor_test: ['protractor:run']
        }
    });

    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('default', ['concurrent:protractor_test']);

};