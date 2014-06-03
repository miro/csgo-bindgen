module.exports = function(grunt) {

    grunt.initConfig({

        sass: {
            compile: {        
                files: {
                    'app/css/client.css': 'app/scss/styles.scss'
                }
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    'app/css/client.css': 'app/css/client.css'
                }
            }
        },

        watch: {
            scss: {
                files: 'app/scss/*.scss',
                tasks: ['sass', 'autoprefixer'],
                options: {
                    livereload: true
                }
            },

            uberwatch: {
                files: 'app/**/*',
                tasks: [],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    
};
