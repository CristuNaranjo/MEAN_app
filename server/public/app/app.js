var mainApp = angular.module('mainApp', [
    'ui.router',
    'ngMaterial'
]);

mainApp.config(function($stateProvider, $urlRouterProvider){

 $urlRouterProvider.otherwise("/login");

 $stateProvider
	 .state('main', {
		 url: "/main",
		 templateUrl: "/app/components/main/main.view.html"
	 })
   .state('login',{
     url: "/login",
     templateUrl: "/app/components/login/login.view.html"
   })
   .state('register',{
     url: "/register",
     templateUrl: "/app/components/register/register.view.html"
   })
});
mainApp.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
});
mainApp.constant('API_ENDPOINT', {
  url: 'http://localhost:3001/api'
})
mainApp.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
        $rootScope.auth = false;
      console.log(next.name);
      if (next.name !== 'login' && next.name !== 'register') {
        event.preventDefault();
        $state.go('login');
      }
    }else{
        $rootScope.auth = true;
    }
  });
});
