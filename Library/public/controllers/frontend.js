var frontApp = angular.module('frontApp', []);
frontApp.service('authInterceptor', function($q, $location) {
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
frontApp.controller('frontCtrl', ['$scope', '$http', function($scope, $http) {
    var currentUser;
    var getSession = function() {
        $http.get('/myapp/session').success(function(response) {
            $scope.greed = null;
            $scope.currentUser = response.user;
            $scope.role = response.role;
            currentUser = response;
        });
    };
    getSession();
    var refrechBooks = function() {
        $http.get('/myapp/books').success(function(response) {
            console.log(response);
            $scope.books = response;
            $scope.borrow = true;
        });
    };
    var refrechMails = function(id) {
        $http.get('/myapp/messages/' + id + "?who=sender").success(function(response) {
            console.log(response);
            if (response == '"no message"')
                $scope.messages = "x";
            else $scope.messages = response;
            $scope.sender = true;
        });
    };

    $scope.Showbooks = function() {
        refrechBooks();
        $scope.messages = null;
        $scope.greed = null;
    };

    $scope.Showmails = function() {
        refrechMails(currentUser);
        $scope.books = null;
        $scope.greed = null;
    };
    $scope.sendMail = function() {
        $scope.messages = null;
        $http.get('/myapp/users').success(function(response) {
            console.log(response);
            $scope.users = response;
        });
        $scope.greed = "test";
    }
    $scope.Receiptsmails = function() {
        $http.get('/myapp/messages/' + currentUser + "?who=receiver").success(function(response) {
            console.log(response);
            $scope.sender = false;
            $scope.messages = response;
        });
    }
    $scope.send = function() {
        $scope.greed = null;
        $scope.message.sender = currentUser;
        console.log($scope.message);
        $http.post('/myapp/messages', $scope.message).success(function(response) {
            console.log(response);
            refrechMails(currentUser);
        });
    }
    $scope.deleteMail = function(id) {
        console.log(id.delete);
        if (!id.delete) id.delete = {};
        id.delete[currentUser] = true;
        $http.put('/myapp/messages/', id).success(function(response) {
            console.log(response);
            if (id.sender == currentUser)
                refrechMails(currentUser);
            else $scope.Receiptsmails();
        })
        console.log(id);
    }
    $scope.Borrow = function(id) {
        if (!id.users) id.users = {};
        id.borrowed++;
        id.users[currentUser] = true;
        $http.put('/myapp/books/', id).success(function(response) {
            console.log(response);
        });
    }
    $scope.Borrowed = function() {
        for (let book of $scope.books) {
            if (!book.users) book.users = {}
            if (!book.users[currentUser])
                book.users[currentUser] = true;
            else book.users[currentUser] = false;
        }
        $scope.borrow = false;

    }
    $scope.RedirectBooks = function() {
        window.location = "/book/";

    }
    $scope.RedirectUsers = function() {
        window.location = "/user/";
    }
    $scope.Logout = function() {
        $http.get('/logout').success(function(response) {
            console.log(response);
        });
    }
}]);
