'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
// const cleanCSS = require('gulp-clean-styles');

// Компилируем LESS в CSS
gulp.task('less', function () {
    // Основной файл LESS
    return gulp.src('src/styles/style.less')
        // Преобразование LESS в CSS
        .pipe(less())
        // Выходная директория
        .pipe(gulp.dest('dist/styles'));
});

// Задача для минимизации CSS
gulp.task('minify-styles', function () {
    // Исходный CSS файл
    return gulp.src('dist/css/style.css')
        // Минимизация CSS
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        // Выходная директория для минимизированного CSS
        .pipe(gulp.dest('dist/styles'));
});

// Задача для наблюдения за изменениями в файлах LESS
gulp.task('watch', function () {
    // Наблюдение за изменениями и выполнение задач
    gulp.watch('src/styles/**/*.less', gulp.series('less', 'minify-styles'));
});

// Задача по умолчанию
gulp.task('default', gulp.series('less', 'minify-styles', 'watch'));
