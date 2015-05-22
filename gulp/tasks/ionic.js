var gulp = require("gulp");
var sh = require("shelljs");

gulp.task("ionic", ["bower-install"], function() {
	// Platform
	var os = process.argv[process.argv.indexOf("--os")+1]
	if(os == "all") {
		sh.exec("ionic platform add andoid");
		sh.exec("ionic platform add ios");
	} else {
		sh.exec("ionic platform add "+ os);
	}

	// Plugins
	sh.exec("ionic state reset");
});