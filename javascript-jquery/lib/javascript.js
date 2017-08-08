module.exports = function (gulp, $) {
	jshint         = require('gulp-jshint');
	stripdebug     = require('gulp-strip-debug');

	return function(imguri) {
		if (devBuild) {
	        return gulp.src(js.in)
	            .pipe($.newer(js.out))
	            .pipe($.jshint())
	            .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
	            // .pipe($.jshint.reporter('fail'))
	            .pipe(gulp.dest(js.out));
	    }
	    else {
	        del([
	             dest + 'assets/scripts/**/*'
	        ]);
	        return gulp.src(js.in)
	            .pipe($.deporder())
	            .pipe($.concat(js.filename))
	            .pipe($.size({ title: 'JS in '}))
	            .pipe(stripdebug())
	            .pipe($.uglify())
	            .pipe($.size({ title: 'JS out '}))
	            .pipe(gulp.dest(js.out));
	    }
	}
}