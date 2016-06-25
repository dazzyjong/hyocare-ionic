angular.module('hyocare.controllers', ['hyocare.user', 'hyocare.activities'])

.controller('HomeCtrl', function($scope) {})

.controller('CareCtrl', function($http, $scope, $ionicHistory) {
  $scope.carerecipients = [];

  $http.get('http://localhost:8080/api/v1/caregivers/1234/charges/')
  .success(function(response){
    angular.forEach(response, function(response) {
      $scope.carerecipients.push(response);
    });
  });

  $scope.openActivities = function(code) {
    console.log("openActivities")
    $ionicHistory.nextViewOptions({historyRoot: true});    
    $state.go('tab.home');
  }

})

.controller('CareActivitiesCtrl', function($scope, $state, $ionicPopup, Activities) {
  $scope.carerecipientId = $state.params.carerecipientId;

    $scope.feelings = [
        { level: "절망", checked: false },
        { level: "슬픔", checked: false },
        { level: "우울", checked: false },
        { level: "행복", checked: false }
    ];

    $scope.status_physical = [
      { level: "많이 나빠잠",  checked: false},
      { level: "조금 나빠잠",  checked: false},
      { level: "보통",       checked: false},
      { level: "조금 좋아짐",  checked: false},
      { level: "매우 좋음",   checked: false}
    ];
    $scope.status_meal = [
      { level: "많이 나빠잠",  checked: false},
      { level: "조금 나빠잠",  checked: false},
      { level: "보통",       checked: false},
      { level: "조금 좋아짐",  checked: false},
      { level: "매우 좋음",   checked: false}
    ];
    $scope.status_cognitive = [
      { level: "많이 나빠잠",  checked: false},
      { level: "조금 나빠잠",  checked: false},
      { level: "보통",       checked: false},
      { level: "조금 좋아짐",  checked: false},
      { level: "매우 좋음",   checked: false}
    ];

    $scope.status_defecation = [
      { level: "3", checked: false},
      { level: "2", checked: false},
      { level: "1", checked: false},
      { level: "0", checked: false}
    ];

    $scope.status_big_defecation = [
      { level: "3", checked: false},
      { level: "2", checked: false},
      { level: "1", checked: false},
      { level: "0", checked: false}
    ];

  $scope.status_comment="동일";

  $scope.activities = {
    carerecipient_code: $scope.carerecipientId,
    status_defecation:'',
    status_physical:'',
    status_meal:'',
    status_cognitive:'',
    status_comment:''
  };
    $scope.updateSelection = function(position, feelings, step) {
        angular.forEach(feelings, function(subscription, index) {
          console.log("position " + position + " index " + index);
            if (position != index)
                subscription.checked = false;
                $scope.selected = step;
            }
        );
    }

    $scope.changeBack = function(obj) {

      $scope.status_comment = obj.status_comment;
      console.log($scope.status_comment);
    }

  $scope.report = function() {
    if($scope.activities) {
      var alertPopup = $ionicPopup.alert({
      title: 'Don\'t eat that!',
      template: 'It might taste good'
      });
      
      alertPopup.then(function(res) {
        // nothing
      });
    } else {
      Activities.report($window.sessionStorage.getItem('code'), $scope.activities)
      .then(function(){
        $state.go('tab.care');
      });
    };
  };
})

.controller('AccountCtrl', function($http, $scope) {
  $scope.caregiver;

  $http.get('http://localhost:8080/api/v1/caregivers/1234/')
  .success(function(response){
    $scope.caregiver = response;
  });
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