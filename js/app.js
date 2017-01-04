angular.module('TodoApp', ['ngRoute', 'RouteControllers']);

angular.module('TodoApp').config(function($locationProvider, $routeProvider){
	$locationProvider.html5Mode(true);  //enable href routing without hashes

	$routeProvider.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeController'
	})

	.when('/accounts/register', {
		tempklateUrl: 'templates/register.html',
		controleler: 'RegisterController'
	});
});