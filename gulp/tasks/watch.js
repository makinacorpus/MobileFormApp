var gulp = require("gulp");

var config = require("../config");

gulp.task('watch', function() {
  gulp.watch(config.vendors.js.src, ['vendors-js']);
  gulp.watch(config.vendors.sass.src, ['vendors-sass']);
  gulp.watch(config.vendors.fonts.src, ['vendors-fonts']);
});