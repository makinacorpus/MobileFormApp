var gulp = require("gulp");
var sh = require("shelljs");

gulp.task("ios-init", function() {
	sh.exec("ionic platform add ios");
	sh.exec("ionic plugin add https://github.com/apache/cordova-plugin-whitelist");
});