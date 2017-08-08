module.exports = function (gulp, $) {
	return function() {
		gulp.src(images.in)
	        .pipe($.newer(images.out))
	        .pipe($.imagemin())
	        .pipe(gulp.dest(images.out));
	}
}