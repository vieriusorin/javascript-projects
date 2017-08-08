module.exports = function (gulp, $) {
	return function() {
		gulp.src(html.in)
	        .pipe($.inject(gulp.src([
	        	'./dist/assets/vendors/jquery/**/*.js',
	        	'./dist/assets/vendors/tether/**/*.js',
	        	'./dist/assets/vendors/bootstrap/**/*.js',
	        	'./dist/assets/vendors/owl.carousel/**/*.js',
	        	'./dist/assets/vendors/**/*.js',
	        	'./dist/assets/scripts/**/*.js',
	        	'./dist/assets/vendors/owl.carousel/**/*.css',
	        	'./dist/assets/stylesheets/**/*.css'], { read: false })
	        .pipe($.order([
	          	"jquery/**/*.js",
	          	"tether/**/*.js",
	          	"bootstrap/**/*.js",
	          	"owl.carousel/**/*.js"
	          ]), { read: false, relative: true, ignorePath: '../dist/' }
		    ), { relative: true, ignorePath: '../dist/' }))
	        .pipe(gulp.dest(html.out))
	}
}