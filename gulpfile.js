var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat');

var coffeeSources = ['builds/production/coffee/*.coffee'];
var jsSources = [
	'builds/production/scripts/rclick.js',
	'builds/production/scripts/pixgrid.js',
	'builds/production/scripts/tagline.js',
	'builds/production/scripts/template.js'
];

gulp.task('coffee', function() {
	gulp.src(coffeeSources)
		.pipe(coffee({ bare: true})
			.on('error', gutil.log))
		.pipe(gulp.dest('builds/production/scripts'))
});

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulp.dest('builds/development/js'))
});