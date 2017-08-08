module.exports = function (gulp, $) {
	w3cjs = require('gulp-w3cjs');
	return function() {
		const page = gulp.src(html.in)
					.pipe($.preprocess({ context: html.context }))
					.pipe(w3cjs())
        			.pipe(w3cjs.reporter());

	    if (!devBuild) {
	        page = page
	            .pipe($.size({ title: 'HTML in' }))
	            .pipe($.htmlclean())
	            .pipe($.size({ title: 'HTML out' }));
	    }
	    return page.pipe(gulp.dest(html.out)); 
	}
}