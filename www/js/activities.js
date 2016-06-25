angular.module('hyocare.activities', [])
	.factory('Activities', function($http) {
        var apiUrl = 'http://localhost:8080';

		return {
			report: function(code, activities) {
                return $http.post(apiUrl + '/api/v1/caregivers/' + code + '/activities/', activities)
					.then(function(response) {
                        
					});
			}
		};
    });