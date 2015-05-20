var bower_components = "./bower_components"

module.exports = {
	vendors: {
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
	fonts: {
		src: [
			bower_components + "/ionic/fonts/*",
			bower_components + "/bootstrap-sass/assets/fonts/bootstrap/*"
		],
		dest: "./www/fonts/"
	}
}