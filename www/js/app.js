angular.module('mobileformapp', ['ionic','schemaForm'])

	.controller('FormController', function($http, $scope) {
		$scope.schema = { "type": "object", "properties": {}, "required": [] };
		$scope.form = [];
		$scope.model = {};

		// Parser
		function daybedToAngularSchemaForm(field, schema, form) {
			var fieldSchema = {}
			var fieldForm = {};
			console.log(field);

			// ASF Schema
			fieldSchema.title = field.label;
			switch(field.type) {
				case "int":
					fieldSchema.type = "integer";
					break;
				case "decimal":
					fieldSchema.type = "number";
					break;
				case "boolean":
					fieldSchema.type = "boolean";
					break;
				case "email":
					fieldSchema.type = "string";
					fieldSchema.pattern = "^\\S+@\\S+$";
					break;
				case "text":
					fieldSchema.type = "string";
					break;
				default:
					fieldSchema.type = "string";
			}
			if(field.required === true) {
				schema.required.push(field.name);
			}

			// ASF Form
			fieldForm.key = field.name;
			switch(field.type) {
				case "text":
					fieldForm.type = "textarea";
					break;
			}
			if(field.hint) { fieldForm.placeholder = field.hint};

			// Return
			schema.properties[field.name] = fieldSchema;
			form.push(fieldForm);
			return { "schema": schema, "form": form };
		}

		// Config
		var submitURL;
		$http.get('config.json')
			.success(function(data, status, headers, config) {
				submitURL = data.url+data.suffix;
				$http.get(data.url)
				.success(function(data, status, headers, config) {
					// Fields
					data.definition.fields.forEach(function(field) {
						var temp = daybedToAngularSchemaForm(field, $scope.schema, $scope.form);
						$scope.schema = temp.schema;
						$scope.form = temp.form;
					});
					// Submit button
					$scope.form.push({
						"type": "submit",
						"style": "btn-info",
						"title": "Send"
					});
				});
			});

		// Submit action
		$scope.onSubmit = function(form) {
			$scope.$broadcast('schemaFormValidate');
			if (form.$valid) {
				$http.post(submitURL,$scope.model)
					.success(function(data, status, headers, config) {
						alert('Data sent :)');
					})
					.error(function(data, status, headers, config) {
						alert('Error data sending :( (Error'+ status +')');
					});
			} else {
				alert('Invalid data :(');
			}
		};
	});
