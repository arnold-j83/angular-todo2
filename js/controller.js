angular.module('RouteControllers',[])
	.controller('HomeController', function($scope) {
		$scope.title = "Angular ToDo App";
	})

	.controller('RegisterController', function($scope, UserAPIService) {
		$scope.title = "Register"; 

		$scope.registrationUser = {};

		var URL = "https://morning-castle-91468.herokuapp.com/";

		$scope.submitForm = function(){
			if ($scope.registrationForm.$valid) {
				$scope.registrationUser.username = $scope.user.username;
				$scope.registrationUser.password = $scope.user.password;

				UserAPIService.registerUser(URL + "accounts/register/", $scope.registrationUser).then(function(results) {
					$scope.data = results.data;
					alert("You have successfully registered to Angular ToDo");
				}).catch(function(err) {
					alert("oops, something went wrong :(");
				});
			}

			//console.log($scope.registrationUser.username + " " + $scope.registrationUser.password);
		};
	});