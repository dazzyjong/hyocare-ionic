angular.module('hyocare.user', [])
	.factory('User', function($http) {

		var apiUrl = 'http://localhost:8080';

		var loggedIn = false;

		return {

			login: function(credentials) {
                return $http.post(apiUrl + '/api/v1/caregivers/login/', credentials)
					.then(function(response) {
						var token = response.data.token;
						$http.defaults.headers.common.Authorization = response.headers('Authorization');
						loggedIn = true;
					});
			},

			isLoggedIn: function() {
				return loggedIn;
			}

		};
	});