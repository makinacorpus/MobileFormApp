var gulp = require("gulp");
var fs = require('fs');
var request = require('request');

var config = require("../config").MobileFormApp.config;

gulp.task("build-config", ["build-json-config"],function(done) {
	var daybedURL = JSON.parse(fs.readFileSync(config.src)).url;

	request(daybedURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var formDefinition = JSON.parse(body).definition;
			console.log(formDefinition.title);
			console.log(formDefinition.description);
			done();
		}
	})
});