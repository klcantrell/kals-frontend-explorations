const gulp = require('gulp'),
			gm = require('gulp-gm'),
			// newer = require('gulp-newer'),
			rename = require('gulp-rename'),
			del = require('del');

function clean() {
	return del('src/portfolios/imgs/resized');
}

function resizeImage(width) {
	return gulp.src('src/portfolios/imgs/background/*.*')
	  // .pipe(newer('resized'))
	  .pipe(gm((gmfile) => {
	    return gmfile.resize(width);
	  }))
	  .pipe(rename({
	  	suffix: `_${width}`
	  }))
	  .pipe(gulp.dest('src/portfolios/imgs/background/resized'));
}

function resizeToWidths(widths = [400, 200]) {
	widths.forEach((width) => {
		resizeImage(width);
	});
}


gulp.task('resize-background-images', gulp.series(
	clean, 
	function _resizeToWidths(done) {
		resizeToWidths();
		done();
	})
);