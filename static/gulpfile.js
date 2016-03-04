'use strict';

var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('gulp-browserify');
var aliasify = require('aliasify');
var twigify = require('twigify');
var minify = require('gulp-minify');

var browserifyOptions = {
    debug: true,

    paths: [
        './js',
        './node_modules'
    ],

    exclude: ['jquery'],

    shim: {
        underscore: {
            path: './node_modules/lodash',
            exports: '_'
        }
    },

    transform: [
        babelify.configure({
            presets: ['es2015']
        }),

        twigify.configure({
            extension: /\.(html)$/
        }),

        aliasify.configure({
            aliases: {
                //underscore: './node_modules/lodash/dist/lodash.underscore.js'
            },
            replacements: {
                '\\/base\\.html': '../templates/_base.html'
            }
        })
    ]
};

gulp.task('js', function () {
    return gulp.src(['js/main.js'])
        .pipe(browserify(browserifyOptions))
        .pipe(minify())
        .pipe(gulp.dest('dist'));
});

