const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');

gulp.task('default', ['nodemon'], function () {
});

gulp.watch(['./views/**/*.*','./public/**'],['move-views','move-public']);



gulp.task('move-views',()=>{
  gulp.src('./views/**').pipe(gulp.dest('dist/views'));
})

gulp.task('move-public',()=>{
  gulp.src('./public/**').pipe(gulp.dest('dist/public'));
})

gulp.task('babel-compile', () =>
    gulp.src('./src/**')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);
gulp.task('nodemon',['babel-compile','move-views','move-public'] ,function (cb) {

	var started = false;

	return nodemon({
		script: './dist/bin/www.js',
		ext:'js ejs css'
	}).on('start', function () {

		if (!started) {
			cb();
			started = true;
		}
	});
});
