var codingMarketPlaceApp = angular.module('CodingMarketPlaceApp');

codingMarketPlaceApp.factory('User', function($resource) {
    return $resource('', {}, {
        login: {method: 'post', url:'http://localhost:8080/login'},
        all: {method: 'get', url:'http://localhost:8080/user'}
    });
});

codingMarketPlaceApp.service('UserService', function (User) {
    
    var data = {
        user: {},
        all: [],
        isLoggedIn: false
    };
    
    var login = function() {
        data.user = User.login();
    };

    var all = function() {
            User.all(function(response) {
                data.all = response._embedded.user;
        });
    }
    
    return {
            data: data,
            login: login,
            all: all
    };
});