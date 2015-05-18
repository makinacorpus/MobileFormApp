angular.module('mobileformapp', ['ionic','schemaForm'])

	.controller('FormController', function($scope) {
		$scope.schema = {
			"type": "object",
			"title": "Comment",
			"properties": {
				"name": {
					"title": "Name",
					"type": "string"
				},
				"email": {
					"title": "Email",
					"type": "string",
					"pattern": "^\\S+@\\S+$",
					"description": "Email will be used for evil."
				},
				"comment": {
					"title": "Comment",
					"type": "string",
					"maxLength": 20,
					"validationMessage": "Don't be greedy!"
				}
			},
			"required": [
				"name",
				"email",
				"comment"
			]
		};
		$scope.form = [
			{
				"key": "name",
				"placeholder": "Leeroy Jenkins",
				// "htmlClass": "item item-input",
				// "labelHtmlClass": "input-label"
			},
			{
				"key": "email",
				"placeholder": "leeroy@palsforlife.com",
				// "htmlClass": "item item-input",
				// "labelHtmlClass": "input-label"
			},
			{
				"key": "comment",
				"type": "textarea",
				"placeholder": "At least i have chicken.",
				// "htmlClass": "item item-input",
				// "labelHtmlClass": "input-label"
			},
			{
				"type": "submit",
				"style": "btn-info",
				"title": "Send",
				//"fieldHtmlClass": "button button-positive"
			}
		];
		$scope.model = {};
	});
