'use strict';

module.exports = function (grunt) {
    // Конфигурация проекта.
    grunt.initConfig({
        // Компиляция LESS в CSS
        less: {
            development: {
                files: {
                    'dist/css/style.css': 'src/styles/grunt/style.less' // 'назначение': 'источник'
                }
            }
        },
        // Минимизация CSS файлов
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/styles',
                    src: ['style.styles'],
                    dest: 'dist/styles',
                    ext: '.min.styles'
                }]
            }
        },
        // Наблюдение за изменениями в LESS файлах
        watch: {
            styles: {
                files: ['src/styles/**/*.less'],
                tasks: ['less', 'cssmin'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    // Загрузка плагинов
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Задача по умолчанию
    grunt.registerTask('default', ['less', 'cssmin', 'watch']);
};
