module.exports = function (gulp, $) {
	mainBowerFiles = require('gulp-main-bower-files');
	gulpFilter     = require('gulp-filter');

	return function() {
		const filterJS = gulpFilter('**/*.js', { restore: true });
	    if (devBuild) {
	        return gulp.src('./bower.json')
	        .pipe(mainBowerFiles())
	        .pipe(filterJS)
	        .pipe($.uglify())
	        .pipe(filterJS.restore)
	        .pipe(gulp.dest('./dist/assets/vendors'));
	    } else {
	        return gulp.src('./bower.json')
	            .pipe(mainBowerFiles())
	            .pipe(filterJS)
	            .pipe($.uglify())
	            .pipe($.concat('vendors.js'))
	            .pipe(filterJS.restore)
	            .pipe(gulp.dest('./dist/assets/vendors'));
	    }
	}
}