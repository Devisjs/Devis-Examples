var bookApp = angular.module('bookApp', ['ngFileUpload']);
bookApp.service('authInterceptor', function($q, $location) {
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
    }]);
bookApp.controller('bookCtrl', ['$scope', 'Upload', '$http', function($scope, Upload, $http) {

    var refrech = function() {
        $http.get('/myapp/books').success(function(response) {
            console.log(response);
            $scope.books = response;
            //$scope.book = "";
        });
    };
    refrech();

    $scope.addBook = function() {
        Upload.upload({
            url: '/myapp/books',
            method: 'POST',
            data: {
                picture: $scope.book.picture,
                title: $scope.book.title,
                summary: $scope.book.summary,
                borrowed: 0,
                quantity: $scope.book.quantity
            }
        }).then(function(resp) {
            console.log(resp);
            refrech();
        }, function(resp) {
            console.log('Error status: ' + resp.status);
        })

    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/myapp/books/' + id).success(function(response) {
            refrech();
        })
    };

    $scope.update = function() {
        Upload.upload({
            url: '/myapp/books/',
            method: 'PUT',
            data: {
                picture: $scope.book.picture,
                _id: $scope.book._id,
                title: $scope.book.title,
                summary: $scope.book.summary,
                borrowed: $scope.book.borrowed,
                quantity: $scope.book.quantity
            }
        }).then(function(resp) {
            console.log(resp);
            refrech();
        }, function(resp) {
            console.log('Error status: ' + resp.status);
        })
    };

    $scope.get = function(id) {
        console.log(id);
        $http.get('/myapp/books/' + id).success(function(response) {
            console.log(response);
            $scope.book = response[0];
            refrech();
        })
    };
    $scope.Throw = function(book,user) {
      book.users[user]=null;
      $http.put('/myapp/books/',book).success(function(response){
          console.log(response);
          refrech();
      })
    }
    $scope.deselect = function() {
        $scope.book = "";
    }
}]);
