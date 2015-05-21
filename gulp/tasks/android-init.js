var gulp = require("gulp");
var sh = require("shelljs");

gulp.task("android-init", function() {
	sh.exec("ionic platform add android");
	sh.exec("ionic plugin add https://github.com/apache/cordova-plugin-whitelist");
});