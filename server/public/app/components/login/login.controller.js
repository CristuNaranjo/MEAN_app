angular.module('mainApp').controller('loginController',
['$scope','AuthService','$state','$window',function loginController($scope, AuthService, $state, $window) {


  $scope.user = {
    name: '',
    password: ''
  };

	// Función para registrar
	$scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('main');
    }, function(errMsg) {
      $window.alert(errMsg);
    });
  };
  $scope.goSignup = function(){
    $state.go('register')
  }
}]);
