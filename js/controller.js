angular.module('RouteControllers',[])
	.controller('HomeController', function($scope) {
		$scope.title = "Angular ToDo App";
	})

	.controller('RegisterController', function($scope, UserAPIService, store) {
		$scope.title = "Register"; 

		$scope.registrationUser = {};

		var URL = "https://morning-castle-91468.herokuapp.com/";

		//var authStorage = {
		//	name: "StorageTest"
		//};

		//store.set('obj', authStorage);

		$scope.login = function() {
			UserAPIService.callAPI(URL + "accounts/api-token-auth/", $scope.data).then(function(results) {
				$scope.token = results.data.token;
				store.remove("obj");
				store.set('username', $scope.registrationUser.username);
				store.set('authToken', $scope.token);
				console.log($scope.token);
			}).catch(function(err) {
				console.log(err.data);
			});
		}

		$scope.submitForm = function(){
			if ($scope.registrationForm.$valid) {
				$scope.registrationUser.username = $scope.user.username;
				$scope.registrationUser.password = $scope.user.password;

				UserAPIService.callAPI(URL + "accounts/register/", $scope.registrationUser).then(function(results) {
					$scope.data = results.data;
					alert("You have successfully registered to Angular ToDo");
					$scope.login();
					console.log("hurrah");
				}).catch(function(err) {
					alert("oops, something went wrong :(");
					console.log(err);
				});
			}

			//console.log($scope.registrationUser.username + " " + $scope.registrationUser.password);
		}
	})

	.controller('TodoController', function($scope, $location, TodoAPIService, store) {
        //var URL = "https://morning-castle-91468.herokuapp.com/"; 
        var URL = "https://morning-castle-91468.herokuapp.com/accounts/todo/"; 
 
        $scope.authToken = store.get('authToken');
        $scope.username = store.get('username');
 
        $scope.todos = [];
 
        TodoAPIService.getTodos(URL, $scope.username, $scope.authToken).then(function(results) {
            $scope.todos = results.data || [];
            console.log($scope.todos);
        }).catch(function(err) {
            console.log(err);
        });
 
        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;
                $scope.todos.push($scope.todo);
 
                TodoAPIService.createTodo(URL, $scope.todo, $scope.authToken).then(function(results) {
                    console.log(results)
                }).catch(function(err) {
                    console.log(err)
                });
            }
        }

        $scope.editTodo = function(id) {
        	$location.path("/todo/edit/" + id);
        };

        $scope.deleteTodo = function(id) {
        	TodoAPIService.deleteTodo(URL + id, $scope.username, $scope.authToken).then(function(results) {
        		console.log(results);
        	}).catch(function(err) {
        		console.log(err);
        	});
        };
    });