var gulp = require("gulp");
var sh = require("shelljs");
var SimpleFileWriter = require('simple-file-writer');
var jeditor = require("gulp-json-editor");

var config = require("../config").MobileFormApp.config;

gulp.task("build-json-config", function() {
	// json config file
	sh.exec("rm "+ config.src);
	var writer = new SimpleFileWriter(config.src);
	writer.write("{\n	\n}");

	// url param
	var url = "";
	if(process.argv.indexOf("--url") > 0) {
		url = process.argv[process.argv.indexOf("--url")+1];
	} else {
		url = config.default_url;
	}

	// json data
	return gulp
		.src(config.src)
		.pipe(jeditor({'url': url}))
		.pipe(jeditor({'definitionSuffix': config.definition_suffix}))
		.pipe(jeditor({'recordsSuffix': config.records_suffix}))
		.pipe(gulp.dest(config.dest));
});