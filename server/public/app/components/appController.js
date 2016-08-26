angular.module('mainApp').controller('appController', function($scope, $rootScope, $state, $window, AuthService, AUTH_EVENTS) {
    $rootScope.auth=false;
    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
        AuthService.logout();
        $state.go('login');
        $window.alert("Session Lost! /n/n/n Sorry, You have to login again.");
    });
    $scope.logout = function() {
        AuthService.logout();
        $state.go('login');
    };
});