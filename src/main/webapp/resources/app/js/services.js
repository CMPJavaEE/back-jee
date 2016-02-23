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
        data.isLoggedIn = true;
    };

    var all = function() {
            User.all(function(response) {
                data.all = response._embedded.user;
        });
    };
    
    return {
            data: data,
            login: login,
            all: all
    };
});

codingMarketPlaceApp.factory('Project', function($resource) {
    return $resource('', {}, {
        all: {method: 'get', url:'http://localhost:8080/project'}
    });
});

codingMarketPlaceApp.service('ProjectService', function (Project) {
    var data = {
        projects: []
    };
    
    var projects = function () {
        Project.all(function(response) {
            data.projects = response._embedded.project;
        });
    };
    
    return {
            data: data,
            projects: projects
    };
});