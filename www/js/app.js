angular.module('mobileformapp', ['ionic','schemaForm'])

	.controller('FormController', function($http, $scope) {
		// Schema
		$scope.schema = {};
		$http.get('mock_schema.json')
			.success(function(data, status, headers, config) {
				$scope.schema = data;
			});
		// Form
		$scope.form = [];
		$http.get('mock_form.json')
			.success(function(data, status, headers, config) {
				$scope.form = data;
			});
		// Model
		$scope.model = {};
		// Submit action
		$scope.onSubmit = function(form) {
			$scope.$broadcast('schemaFormValidate');
			if (form.$valid) {
				alert('Valid data :)');
			} else {
				alert('Invalid data :(');
			}
		};
	});
