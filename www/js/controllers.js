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

.controller('CareActivitiesCtrl', function($scope, $state, $ionicPopup, $window, Activities) {
  $scope.carerecipientId = $state.params.carerecipientId;
  var Break = new Error('Break');

    $scope.feelings = [
        { level:"1", label: "절망", checked: false },
        { level:"2", label: "슬픔", checked: false },
        { level:"3", label: "평범", checked: false },
        { level:"4", label: "행복", checked: false }
    ];

    $scope.status_physical = [
      { level:"1", label: "많이 나빠짐",  checked: false},
      { level:"2", label: "조금 나빠짐",  checked: false},
      { level:"3", label: "보통",       checked: false},
      { level:"4", label: "조금 좋아짐",  checked: false},
      { level:"5", label: "매우 좋음",   checked: false}
    ];
    $scope.status_meal = [
      { level:"1", label: "많이 나빠짐",  checked: false},
      { level:"2", label: "조금 나빠짐",  checked: false},
      { level:"3", label: "보통",       checked: false},
      { level:"4", label: "조금 좋아짐",  checked: false},
      { level:"5", label: "매우 좋음",   checked: false}
    ];
    $scope.status_cognitive = [
      { level:"1", label: "많이 나빠짐",  checked: false},
      { level:"2", label: "조금 나빠짐",  checked: false},
      { level:"3", label: "보통",       checked: false},
      { level:"4", label: "조금 좋아짐",  checked: false},
      { level:"5", label: "매우 좋음",   checked: false}
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

  $scope.activities = {
    carerecipient_code: $scope.carerecipientId,
    status_defecation:'',
    status_big_defecation:'',
    status_physical:'',
    status_meal:'',
    status_cognitive:'',
    status_feeling:'',
    status_comment:'동일'
  };
    $scope.check = function(objs, level) {
      switch(objs) {
        case $scope.feelings:
          $scope.activities.status_feeling = level.valueOf();
        break;
        
        case $scope.status_physical:
        	$scope.activities.status_physical = level.valueOf();
        break;

        case $scope.status_meal:
          $scope.activities.status_meal = level.valueOf();
        break;

        case $scope.status_cognitive:
        	$scope.activities.status_cognitive = level.valueOf();
        break;
        
        case $scope.status_defecation:
        	$scope.activities.status_defecation = level.valueOf();
        break;

        case $scope.status_big_defecation:
        $scope.activities.status_big_defecation = level.valueOf();
        break;
      }
        angular.forEach(objs, function(obj, index) {
            if (level != obj.level) {
                obj.checked = false;
            } else {
              obj.checked = true;
            }
        });
        console.log($scope.activities);
    }

    $scope.isChecked = function(objs) {
      switch(objs) {
        case $scope.feelings:
          
        break;
        
        case $scope.status_physical:
        	$scope.activities.status_physical = level.valueOf();
        break;

        case $scope.status_meal:
          $scope.activities.status_meal = level.valueOf();
        break;

        case $scope.status_cognitive:
        	$scope.activities.status_cognitive = level.valueOf();
        break;
        
        case $scope.status_defecation:
        	$scope.activities.status_defecation = level.valueOf();
        break;

        case $scope.status_big_defecation:
        console.log("status_big_defecation");
        break;
      }
    }

    $scope.changeBack = function(obj) {
      $scope.activities.status_comment = obj.activities.status_comment.valueOf();
    }

  $scope.report = function() {
    try{
      angular.forEach($scope.activities, function(value, key) {
        if(value == '') {
          var alertPopup = $ionicPopup.alert({
            title: '모두 입력 해주세요',
          });
          
          alertPopup.then(function(res) {
          });

          throw Break;
        }
      });
    } catch(e) {
      if(e != Break) {
        throw Break;
      }
      return;
    }

    Activities.report($window.sessionStorage.getItem('code'), $scope.activities)
      .then(function(){
        $state.go('tab.care');
      });
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