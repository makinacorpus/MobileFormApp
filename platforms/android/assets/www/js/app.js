angular.module('mobileformapp', ['ionic'])

.controller('MFACtrl', function($scope, $http) {

	$http.get('mock.json')
		.success(function(data, status, headers, config) {
			$scope.inputs = data.definition.fields;
		});

});;
