module.exports = function (gulp, $) {
	return function() {
		gulp.src(imguri.in)
	        .pipe($.imagemin({
	            optimizationLevel: 3,
	            progressive: true,
	            interlaced: true
	        }))
	        .pipe($.imacss(imguri.filename, imguri.namespace))
	        .pipe(gulp.dest(imguri.out))
	        .pipe($.size());
	}
}