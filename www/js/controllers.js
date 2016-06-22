angular.module('hyocare.controllers', ['hyocare.user'])

.controller('HomeCtrl', function($scope) {})

.controller('CareCtrl', function($scope) {})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, $state, $ionicHistory, User) {

  $scope.credentials = {
    code: '',
    password: ''
  };

  $scope.login = function() {
    User.login($scope.credentials)
      .then(function() {
        $ionicHistory.nextViewOptions({historyRoot: true});    
        $state.go('tab.home');
      });
  };

});