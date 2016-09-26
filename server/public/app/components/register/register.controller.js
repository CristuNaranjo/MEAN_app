angular.module('mainApp').controller('registerController', function($scope, AuthService, $window, $state) {
  $scope.user = {};

  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('main');
        $window.alert("Peritaaa compadree");
    }, function(errMsg) {
        $window.alert(errMsg);
    });
  };
  $scope.goBack = function(){
    $state.go('login');
  }
})
