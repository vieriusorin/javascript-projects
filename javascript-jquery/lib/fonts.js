module.exports = function (gulp, $) {
	return function() {
		gulp.src(fonts.in)
	        .pipe($.newer(fonts.out))
	        .pipe(gulp.dest(fonts.out));
	}
}