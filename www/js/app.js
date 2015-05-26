angular.module('mobileformapp', ['ionic','schemaForm'])

	.controller('FormController', function($http, $scope) {
		// Config
		var url;
		$http.get('config.json')
			.success(function(data, status, headers, config) {
				url = data.url + data.suffix;
			});
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
				$http.post(url,$scope.model)
					.success(function(data, status, headers, config) {
						alert('Data sent :)');
					})
					.error(function(data, status, headers, config) {
						alert('Error data sending :(');
					});
			} else {
				alert('Invalid data :(');
			}
		};
	});
