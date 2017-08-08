module.exports = function (gulp, $) {
	scsslint  = require('gulp-scss-lint');

	return function() {
		gulp.src(sasslint.in)
        	.pipe(scsslint())
	}
}