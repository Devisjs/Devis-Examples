var userApp = angular.module('userApp', []);
userApp.service('authInterceptor', function($q, $location) {
        var service = this;

        service.responseError = function(response) {
            if ($location.absUrl().search("login.html") == "-1") {
                if (response.status == 401) {
                    window.location = "/user/login.html";
                }
                return $q.reject(response);
            }
        };
    })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])
userApp.controller('userCtrl', ['$scope', '$http', function($scope, $http) {


    var refrech = function() {
        $http.get('/myapp/users').success(function(response) {
            console.log("ok");
            console.log(response);
            $scope.users = response;
            //$scope.user = "";
        });
    };
    refrech();
    $scope.login = function() {
        $http.post('/myapp/users/login', $scope.Login).success(function(response) {
            if (response != "login success!") {
                $scope.log = response;
                console.log(response);
            } else window.location = "/";
        });
    }

    $scope.addUser = function() {
        console.log($scope.user);
        $http.post('/myapp/users', $scope.user).success(function(response) {
            console.log(response);
            refrech();
        })
    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/myapp/users/' + id).success(function(response) {
            refrech();
        })
    };

    $scope.update = function() {
        console.log($scope.user.ID);
        if(!$scope.user.password)delete $scope.user.password;
        $http.put('/myapp/users/', $scope.user).success(function(response) {
            console.log(response);
            refrech();
        })
    };

    $scope.get = function(id) {
        console.log(id);
        $http.get('/myapp/users/' + id).success(function(response) {
            console.log(response);
            $scope.user = response[0];
            $scope.user.password=null;
            refrech();
        })
    };

    $scope.deselect = function() {
        $scope.user = "";
    }
}]);
