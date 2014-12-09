var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

var env,
	coffeeSources,
	jsSources,
	sassSources,
	htmlSources,
	jsonSources,
	outputDir;

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

coffeeSources = ['builds/production/coffee/*.coffee'];

jsSources = [
	'builds/production/scripts/rclick.js',
	'builds/production/scripts/pixgrid.js',
	'builds/production/scripts/tagline.js',
	'builds/production/scripts/template.js'
];

sassSources = ['builds/production/sass/style.scss']

htmlSources = [outputDir + '*.html'];

jsonSources = [outputDir + '*.json'];

gulp.task('coffee', function() {
	gulp.src(coffeeSources)
		.pipe(coffee({ bare: true})
			.on('error', gutil.log))
		.pipe(gulp.dest('builds/production/scripts'))
});

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'builds/production/sass',
			image: outputDir + 'images',
			style: sassStyle  
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(connect.reload())
});
gulp.task('watch', function() {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('builds/production/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	})
});

gulp.task('html', function() {
	gulp.src(htmlSources)
		.pipe(connect.reload())
});

gulp.task('json', function() {
	gulp.src(jsonSources)
		.pipe(connect.reload())
});

gulp.task('default', ['html','json','coffee', 'js','compass','connect','watch']);