var gulp = require("gulp");
var sh = require("shelljs");

gulp.task("ionic", ["bower-install"], function() {
	// Plugins
	sh.exec("ionic state reset");

  // Platform
  if(process.argv.indexOf("--os") > 0) {
    var os = process.argv[process.argv.indexOf("--os")+1]
    if(os == "all") {
      sh.exec("ionic resources android");
      sh.exec("ionic platform add android --nosave");
      sh.exec("ionic resources ios");
      sh.exec("ionic platform add ios --nosave");
    } else {
      sh.exec("ionic resources "+ os);
      sh.exec("ionic platform add "+ os +" --nosave");
    }
  } else {
    sh.exec("ionic resources android");
    sh.exec("ionic platform add android --nosave");
  }
});