'use strict';

/* App Module */

var codingMarketPlaceApp = angular.module('CodingMarketPlaceApp', [
    'ngRoute',
    'ngMaterial',
    'ngCookies',
    'toolbarApp',
    'projectsApp',
    'projectApp',
    'userApp',
    'adminApp',
    'footerApp',
    'ngResource'
]);

codingMarketPlaceApp.config(function ($routeProvider) {
    $routeProvider.
            when('/', {
                templateUrl: '/static/partials/template-index.html',
                controller: ''
            }).
            when('/search-projects/:key?', {
                templateUrl: '/static/partials/template-projects.html',
                controller: 'ProjectsController'
            }).
            when('/projects/:projectId', {
                templateUrl: '/static/partials/template-detail-project.html',
                controller: 'ProjectController'
            }).
            when('/legal-notice', {
                templateUrl: '/static/partials/legal-notice.html',
                controller: ''
            }).
            when('/user/:userId', {
                templateUrl: '/static/partials/template-detail-user.html',
                controller: 'UserController'
            }).
            when('/admin', {
                templateUrl: '/static/partials/admin/template-choice-module.html',
                controller: 'AdminController'
            }).
            when('/admin/user-management', {
                templateUrl: '/static/partials/admin/user-management.html',
                controller: 'AdminController'
            }).
            when('/contact', {
                templateUrl: '/static/partials/template-contact.tmpl.html',
                controller: ''
            }).
            when('/forgot-password/:userId', {
                templateUrl: '/static/partials/template-forgot-password.html',
                controller: 'UserController'
            }).
            otherwise({
                redirectTo: '/'
            });
});



/////////////////////////////
////////Propriétés///////////
/////////////////////////////