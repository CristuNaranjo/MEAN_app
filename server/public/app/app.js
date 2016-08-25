var mainApp = angular.module('mainApp', ['ui.router']);

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
      console.log(next.name);
      if (next.name !== 'login' && next.name !== 'register') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});

  mainApp.controller('AppCtrl', function($scope, $state, $window, AuthService, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
      AuthService.logout();
      $state.go('login');
      $window.alert("Session Lost! /n/n/n Sorry, You have to login again.");
    });
  });
// mainApp.controller('mainController', function mainController($scope, $http) {
// 	$scope.newUser = {};
// 	$scope.users = {};
// 	$scope.selected = false;
//
// 	// Obtenemos todos los datos de la base de datos
// 	$http.get('/api/user').success(function(data) {
// 		$scope.users = data;
//     console.log(data);
//     console.log("success");
// 	})
// 	.error(function(data) {
// 		console.log('Error: ' + data);
// 	});
//
// 	// Función para registrar
// 	$scope.registrarUser = function() {
// 		$http.post('/api/user', $scope.newUser)
// 		.then(function(response) {
// 			console.log($scope.newUser);
// 			console.log("registrando");
// 			console.log(response);
// 				$scope.newUser = {}; // Borramos los datos del formulario
// 				$scope.users = response.data;
// 			},
// 			function(data) {
// 				console.log('Error: ' + data);
// 			});
// 	};
//
// 	// Función para editar los datos
// 	$scope.modificarUser = function(newPersona) {
// 		$http.put('/api/user/' + $scope.newUser._id, $scope.newUser)
// 		.success(function(data) {
// 			console.log("modifcarrrr");
// 			console.log(data);
// 				$scope.newUser = {}; // Borramos los datos del formulario
// 				$scope.users = data;
// 				$scope.selected = false;
// 			})
// 		.error(function(data) {
// 			console.log('Error: ' + data);
// 		});
// 	};
//
// 	// Función que borra un objeto
// 	$scope.borrarUser = function(newPersona) {
// 		$http.delete('/api/user/' + $scope.newUser._id)
// 		.success(function(data) {
// 			console.log("borrarr");
// 			console.log(data);
// 			$scope.newUser = {};
// 			$scope.users = data;
// 			$scope.selected = false;
// 		})
// 		.error(function(data) {
// 			console.log('Error: ' + data);
// 		});
// 	};
//
// 	// Función para coger el objeto
// 	$scope.selectUser = function(user) {
// 		$scope.newUser = user;
// 		$scope.selected = true;
// 		console.log($scope.newUser, $scope.selected);
// 	};
// });
