angular.module('hyocare.user', [])
	.factory('User', function($http, $window) {

		var apiUrl = 'http://localhost:8080';

		var loggedIn = false;

		return {
			login: function(credentials) {
                return $http.post(apiUrl + '/api/v1/caregivers/login/', credentials)
					.then(function(response) {
						$window.sessionStorage.setItem('accessToken', response.headers('Authorization'));
						$window.sessionStorage.setItem('code', credentials.code);
						loggedIn = true;
					});
			},
			isLoggedIn: function() {
				return loggedIn;
			}
		};
	});