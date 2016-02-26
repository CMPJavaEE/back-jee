var codingMarketPlaceApp = angular.module('CodingMarketPlaceApp');

codingMarketPlaceApp.factory('User', function($resource) {
    return $resource('', {}, {
        login: {method: 'post', url:'/login'},
        all: {method: 'get', url:'/user/'}
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
        all: {method: 'get', url:'/project'}
    });
});

codingMarketPlaceApp.service('ProjectService', function (Project, $http) {
    var data = {
        projects: []
    };
    
    var projects = function () {
        Project.all(function(response) {
            data.projects = response._embedded.project;
            angular.forEach(data.projects, function(projet){
                $http.get('/project/' + projet.id + '/owner').then(function (data) {
                     projet.owner = {
                         name: data.data.firstName + ' ' + data.data.lastName,
                         id: data.data.id
                     };
                });
            });
        });
    };
    
    return {
            data: data,
            projects: projects
    };
});