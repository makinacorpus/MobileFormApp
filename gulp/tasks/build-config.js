var gulp = require("gulp");
var fs = require('fs');
var request = require('request');
var xeditor = require("gulp-xml-editor");

var config = require("../config").MobileFormApp.config;

gulp.task("build-config", ["build-json-config"],function(done) {
	var daybedURL = JSON.parse(fs.readFileSync(config.src)).url;

	request(daybedURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var formDefinition = JSON.parse(body).definition;
			gulp
				.src("./config.xml")
				.pipe(xeditor([
					{ path: '//xmlns:name', text: formDefinition.title },
					{ path: '//xmlns:description', text: formDefinition.description }
				], 'http://www.w3.org/ns/widgets'))
				.pipe(gulp.dest("./"));
		}
	})

  done();
});