const 
    gulp           = require('gulp'),
    browsersync    = require('browser-sync'),
    runSequence    = require('run-sequence'),
    config         = require('./gulp.config'),
    pkg            = require('./package.json'),
    $              = require('gulp-load-plugins')({ lazy: true });

// show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

function getTask(task) {
    return require('./lib/' + task)(gulp, $);
}

gulp.task('clean', getTask('clean'));

gulp.task('main-bower-files', ['clean'], getTask('main-bower-files'));

gulp.task('inject', ['html'], getTask('inject'));

gulp.task('html', getTask('html'));

gulp.task('sass', ['imguri'], getTask('sass'));

gulp.task('imguri', getTask('imguri'));

gulp.task('sass-lint', getTask('sass-lint'));

gulp.task('images', getTask('images'));

gulp.task('fonts', getTask('fonts'));

gulp.task('javascript', getTask('javascript'));


gulp.task('browsersync', function() {
    browsersync(syncOpts);
});

gulp.task('default', function() {

    // run in order the following tasks
    runSequence('default', 'main-bower-files', 'html', 'sass', 'javascript', 'inject', 'images', 'fonts', 'browsersync');

    // watch html files, reload browser if something is changed on the html file and inject css and js files 
    gulp.watch(html.watch, ['inject', 'sass', browsersync.reload]);

    // watch images 
    gulp.watch(images.in, ['images']);

    // watch fonts
    gulp.watch(fonts.in, ['fonts']);

    // watch sass files and images uri
    gulp.watch([css.watch, imguri.in], ['sass']);

    // watcj javascript files
    gulp.watch(js.in, ['javascript', browsersync.reload]);
});
