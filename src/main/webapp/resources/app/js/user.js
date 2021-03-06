var userApp = angular.module('userApp', []);

userApp.controller('UserController',
        function (
                $scope,
                $mdDialog,
                $http,
                $routeParams,
                $rootScope,
                $cookies,
                $location)
        {

            //$rootScope
            $rootScope.isDevelopper = $cookies.get('user_Developper') === "true" ? true : false;
            $rootScope.isProjectCreator = $cookies.get('user_ProjectCreator') === "true" ? true : false;
            $test = $cookies.get('loggedIn');
            $rootScope.loggedIn = ($test === "true");

            //$scope
            $scope.myAccount = false;

            $scope.IdUserConnected = $cookies.get('user_id');
            $scope.password = '';
            $scope.verif_password = '';
            $scope.currentProjects = undefined;
            $scope.completedProjects = undefined;
            $scope.user = {
                login: $cookies.get('user_login') || undefined,
                password: undefined,
                email: undefined,
                firstName: undefined,
                lastName: undefined,
                verif_password: undefined,
                Developper: $cookies.get('user_Developper') === "true" ? true : false || undefined,
                Activated: undefined,
                Admin: $cookies.get('user_Admin') === "true" ? true : false || undefined,
                description: undefined,
                id: $cookies.get('user_id'),
                avatar: undefined,
                ProjectCreator: $cookies.get('user_ProjectCreator') === "true" ? true : false || undefined
            };

            ////////////////////////////
            /////Functions du scope/////
            ////////////////////////////

            $scope.loadUserDetail = function () {
                $http.get('/user/' + $routeParams.userId).then(function (data) {
                    $scope.user = data.data;
                    if ($scope.IdUserConnected === $routeParams.userId)
                    {
                        $scope.myAccount = true;
                    }
                    $scope.finishload = true;

                    if ($scope.user.isProvider) {
                        $http.get('/user/' + $routeParams.userId + '/createdProjects').then(function (data2) {
                            $scope.createdProjects = data2.data._embedded.project;console.info("createdProject", $scope.createdProjects);
                        });
                    }
                    if($scope.user.isDevelopper) {
                        $http.get('/user/' + $routeParams.userId + '/registeredProjects').then(function(data3) {
                            $scope.registeredProjects = data3.data._embedded.project;
                        });
                    }
//                    $http.get('/api/Users/Detail/' + $routeParams.userId).then(function (data) {
//                        $scope.user = data;
//                        if ($scope.IdUserConnected === $routeParams.userId)
//                        {
//                            $scope.myAccount = true;
//                        }
//                    });
                });
            };
            $scope.showDialogContact = function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '/static/partials/dialog-contact.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }).then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
            };
            $scope.showAlert = function () {
                // Appending dialog to document.body to cover sidenav in docs app
                // Modal dialogs should fully cover application
                // to prevent interaction outside of dialog
                alert('Vos modifications ont bien été enregistrées..');
            };
            $scope.saveModification = function () {
                if ($scope.password === $scope.verif_password) {
                    var user_modificated = {id: $scope.user.id, email: $scope.user.email, description: $scope.user.description};
                    if ($scope.password !== "") {
                        user_modificated.password = $scope.password;
                    }
                    $http.patch('/user/' + $scope.user.id, user_modificated).success(function (data) {
                        $scope.showAlert();
                    });
                }
            };

            ////////////////////////////
            /////Functions privées//////
            ////////////////////////////

            function loadUserProjects() {
                if ($rootScope.isDevelopper == true) {
                    $http.get('/user/' + $routeParams.userId + '/registeredProjects').success(function (data) {
                        $scope.registeredProjects = data;
                    }).error(function (data) {
                    });
                } else if ($rootScope.isProjectCreator == true) {
                    $http.get('/user/' + $routeParams.userId + '/createdProjects').success(function (data) {
                        $scope.createdProjects = data;
                    }).error(function (data) {
                    });
                }
            }
            ;
            

            $scope.loadUserDetail();
        });
//Controller pour l'ouverture des différentes pop-up
function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}