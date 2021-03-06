angular.module('mobileformapp', ['ionic','schemaForm'])

	.controller('FormController', function($http, $scope) {
		$scope.schema = { "type": "object", "properties": {}, "required": [] };
		$scope.form = [];
		$scope.model = {};

		// Parser
		function daybedToAngularSchemaForm(field, schema, form) {
			var fieldSchema = {}
			var fieldForm = {};
			// ASF Schema
			fieldSchema.title = field.label;
			switch(field.type) {
				case "group":
					fieldForm.title = field.label;
					fieldForm.type = "fieldset";
					fieldForm.items = [];
					field.fields.forEach(function(fieldInFieldset) {
						var temp = daybedToAngularSchemaForm(fieldInFieldset, {"properties": {}, "required": []}, []);
						fieldForm.items.push(temp.form[0]);
						schema.properties[fieldInFieldset.name] = temp.schema.properties[fieldInFieldset.name];
						if(fieldInFieldset.required === true) { schema.required.push(fieldInFieldset.name); }
					});
					break;
				case "enum":
					fieldSchema.type = "string";
					fieldSchema.enum = field.choices;
					fieldForm.key = field.name;
					break;
				case "choices":
					fieldSchema.type = "array";
					fieldSchema.items = {
						"type": "string",
						"enum": field.choices
					};
					fieldForm.key = field.name;
					break;
				case "int":
					fieldSchema.type = "integer";
					fieldForm.key = field.name;
					break;
				case "decimal":
					fieldSchema.type = "number";
					fieldForm.key = field.name;
					break;
				case "boolean":
					fieldSchema.type = "boolean";
					fieldForm.key = field.name;
					break;
				case "email":
					fieldSchema.type = "string";
					fieldSchema.pattern = "[\w-]+@([\w-]+\.)+[\w-]+";
					fieldForm.key = field.name;
					break;
				case "url":
					fieldSchema.type = "string";
					fieldSchema.pattern = "^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$";
					fieldForm.key = field.name;
					break;
				case "text":
					fieldSchema.type = "string";
					fieldForm.key = field.name;
					fieldForm.type = "textarea";
					break;
				default:
					fieldSchema.type = "string";
					fieldForm.key = field.name;
			}
			if(field.hint) { // help text (optional)
				fieldForm.placeholder = field.hint
			};
			if(field.required === true) { // mandatory attribute
				schema.required.push(field.name);
			}
			// Return
			if(field.name) { // Angular Schema Form fieldset have not schema & Daybed group has not name
				schema.properties[field.name] = fieldSchema;
			}
			form.push(fieldForm);
			return { "schema": schema, "form": form };
		}

		// Config
		var getUserPosition = false;
		var userPositionRequired = false;
		var modelDefURL, submitURL;
		$http.get('config.json')
			.success(function(data, status, headers, config) {
				submitURL = data.url+data.recordsSuffix;
				modelDefURL = data.url+data.definitionSuffix;
				$http.get(modelDefURL)
				.success(function(data, status, headers, config) {
					// Fields
					data.fields.forEach(function(field) {
						if(field.type === "point" && field.name === "system_userposition") {
							getUserPosition = true; // Hidden field & Collected when sending
							userPositionRequired = field.required;
						} else {
							var temp = daybedToAngularSchemaForm(field, $scope.schema, $scope.form);
							$scope.schema = temp.schema;
							$scope.form = temp.form;
						}
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
				function send() {
					$http.post(submitURL,$scope.model)
						.success(function(data, status, headers, config) {
							alert('Data sent :)');
						})
						.error(function(data, status, headers, config) {
							alert('Error data sending :( (Error'+ status +')');
						});
				}
				if(getUserPosition) { // Get user position
					navigator.geolocation.getCurrentPosition(
						function geolocationSuccess(position) {
							$scope.model.system_userposition = [position.coords.longitude, position.coords.latitude];
							send();
						}, function geolocationError(error) {
							if(userPositionRequired) {
								alert('Geolocation Error :(');
							} else {
								send();
							}
						}, { timeout: 30000 }
					);
				} else { // Get user position
					send();
				}
			} else {
				alert('Invalid data :(');
			}
		};
		
	});