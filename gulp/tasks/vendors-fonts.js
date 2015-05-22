var gulp = require("gulp");
var config = require("../config").vendors.fonts;

gulp.task("vendors-fonts", ["bower-install"], function() {
	return gulp
		.src(config.src)
		.pipe(gulp.dest(config.dest));
});