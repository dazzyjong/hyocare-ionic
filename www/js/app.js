angular.module('hyocare', ['ionic', 'hyocare.controllers', 'hyocare.services','hyocare.user'])

.run(function($rootScope, $state, $ionicPlatform, User) {

  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (!User.isLoggedIn() && toState.name !== 'login') {
      event.preventDefault();
      $state.go('login');
    }
  });

  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      if ($window.sessionStorage.getItem('accessToken')) {
        config.headers.Authorization = $window.sessionStorage.getItem('accessToken');
      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
      }
      return $q.reject(rejection);
    }
  };
})
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  $stateProvider
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.care', {
      url: '/care',
      views: {
        'tab-care': {
          templateUrl: 'templates/tab-care.html',
          controller: 'CareCtrl'
        }
      }
    })

  .state('tab.care-activities', {
      url: '/care/activities/:carerecipientId',
      views: {
        'tab-care': {
          templateUrl: 'templates/care-activities.html',
          controller: 'CareActivitiesCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');

  $httpProvider.interceptors.push('authInterceptor');
  $httpProvider.defaults.useXDomain = true;
});
