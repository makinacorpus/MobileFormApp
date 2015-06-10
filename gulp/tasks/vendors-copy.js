var gulp = require("gulp");
var config = require("../config").vendors.copy;

gulp.task("vendors-copy", ["bower-install"], function(done) {
	config.forEach(function(file) {
		gulp.src(file.src)
			.pipe(gulp.dest(file.dest));
	});
	done();
});