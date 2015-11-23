var app = angular.module('testApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when('/pressure', {
			templateUrl: '/partials/pressure.html'
		})
		.when('/glucose', {
			templateUrl: '/partials/glucose.html'
		})
})