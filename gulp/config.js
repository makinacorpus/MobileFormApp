var bower_components = "./bower_components";
var node_modules = "./node_modules";

module.exports = {
	MobileFormApp: {
		config: {
			src: "./www/config.json",
			dest: "./www/",
			default_url: "http://192.168.100.72:8000/v1/models/asf",
			definition_suffix: "/definition",
			records_suffix: "/records"
		}
	},
	vendors: {
		js: {
			src: [
				bower_components + "/ionic/js/ionic.bundle.js",
				bower_components + "/tv4/tv4.js",
				bower_components + "/objectpath/lib/ObjectPath.js",
				bower_components + "/angular-schema-form/dist/schema-form.js",
				bower_components + "/angular-schema-form/dist/bootstrap-decorator.js"
			],
			dest: "./www/js/"
		},
		sass: {
			src: [
				"./scss/ionic.scss",
				"./scss/bootstrap.scss"
			],
			dest: "./www/css/"
		},
		copy: [
			{	// Fonts
				src: [
					bower_components + "/ionic/fonts/*",
					bower_components + "/bootstrap-sass/assets/fonts/bootstrap/*"
				],
				dest: "./www/fonts/"
			}
		]
	}
}