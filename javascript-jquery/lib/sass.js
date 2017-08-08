module.exports = function (gulp, $) {
	 browsersync    = require('browser-sync')
	 sourcemaps     = require('gulp-sourcemaps');

	return function() {
		return gulp.src(css.in)
	        .pipe(sourcemaps.init())
	        .pipe($.plumber())
	        .pipe($.sass(css.sassOpts))
	        .pipe($.size({ title: 'CSS in ' }))
	        .pipe($.pleeease(css.pleeeaseOpts))
	        .pipe(sourcemaps.write({includeContent: false, sourceRoot: '.'}))
	        .pipe(sourcemaps.init({loadMaps: true}))
	        .pipe($.size({ title: 'CSS out ' }))
	        .pipe(gulp.dest(css.out))
	        .pipe(browsersync.reload({ stream: true }));
	}
}