var gulp  = require('gulp');
var shell = require('gulp-shell');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var replace = require('gulp-replace');
var es = require('event-stream');

var buildDir = 'dist/';
var srcDir = 'src/';

gulp.task('develop', function () {
    runSequence(
        'build',
        'dev-server'
    );
});

gulp.task('build', function(callback) {
    runSequence(
        ['es6'],
        callback
    );
});

gulp.task('es6', () => {
    gulp.src('src/**/*.js')
        .pipe(babel({
            ignore: 'gulpfile.js'
        }))
        .pipe(gulp.dest(buildDir));
});

gulp.task('dev-server', function() {
    gulp.watch(srcDir + '**/*.js', ['es6']);

    nodemon({
        script: 'dist/index.js',
        ext: 'js'
    })
        .on('restart', function () {
            console.log('Restarting Node...');
        });
});