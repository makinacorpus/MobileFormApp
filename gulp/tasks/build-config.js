var gulp = require("gulp");
var jeditor = require("gulp-json-editor");

var config = require("../config").MobileFormApp.config;

gulp.task("build-config", function() {
	var url = "";

	if(process.argv.indexOf("--url") > 0) {
		url = process.argv[process.argv.indexOf("--url")+1];
	} else {
		url = config.default_url;
	}

	return gulp
		.src(config.src)
		.pipe(jeditor({'url': url}))
		.pipe(gulp.dest(config.dest));
});