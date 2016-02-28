var projectApp = angular.module('projectApp', []);

projectApp.controller('ProjectController',
        function (
                $scope,
                $http,
                $routeParams,
                $rootScope,
                $cookies,
                $location,
                $route,
                $mdDialog)
        {
            
            // $rootScope
            $rootScope.isDevelopper = $cookies.get('user_Developper') === "true" ? true : false;
            $rootScope.loggedIn = $cookies.get('loggedIn') === "true" ? true : false;
            
            //$scope    
            $scope.IdProject = $routeParams.projectId;
            $scope.IdCurrentUser = $cookies.get('user_id');
            $scope.currentLeader;
            $scope.alreadyApplied;
            $scope.developperChoose;
            $scope.applicants = {};
            $scope.leaderProject = {};
            $scope.projet = loadProjectDetail();


            ////////////////////////////
            /////Functions du scope/////
            ////////////////////////////

            $scope.showLeaderDetail = function () {
                $location.path('user/' + $scope.leaderProject.id);
            };

            $scope.ApplyProject = function () {
                var projet = {Id: $scope.projet.Id};
                $http.post('/api/Projects/Apply/' + $scope.IdCurrentUser, projet).then(function () {
                    $route.reload();
                }, function () {
                    alert("Une erreur est survenue...");
                });
            };

            // Affichage pop-up de validation de projet 
            $scope.ValidateProjectDialog = function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '/static/partials/dialog-validate-project.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                        .then(function (answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            $scope.status = 'You cancelled the dialog.';
                        });
            };

            $scope.ValidateProject = function () {
                var choice = {Id: $scope.projet.Id, IdUser: $scope.developperChoose};
                $http.post('/api/Projects/Validate/' + $scope.IdCurrentUser, choice).success(function () {
                    $scope.hide();
                    $route.reload();
                });
            };

            $scope.FinishProject = function () {
                var project = {Id: $scope.projet.Id};
                $http.post('/api/Projects/Finish/' + $scope.projet.IdUser, project).success(function () {
                    $route.reload();
                });
            };

            
            ////////////////////////////
            /////Functions privées//////
            ////////////////////////////
            
            function loadProjectDetail() {
                $http.get('/project/' + $scope.IdProject).success(function (data) {
                    $scope.projet = data;
                    $scope.currentLeader = $scope.IdCurrentUser === $scope.projet.IdUser ? true : false;
//                    $http.get('/api/Projects/UsersApplied/' + $scope.IdProject).success(function (data) {
//                        $scope.applicants = data;
//                        angular.forEach($scope.applicants, function (value) {
//                            if (value.UniqId === $scope.IdCurrentUser) {
//                                $scope.alreadyApplied = true;
//                            }
//                        });
//                    });
                    $http.get('/project/' + $scope.projet.id + '/owner').success(function (data) {
                        $scope.leaderProject = data;
                    });
console.info($scope.projet);
                }).error(function () {
                    alert("Erreur du chargement des postulants au projet.");
                });
//                $http.get('/api/Projects/Detail/' + $scope.IdProject).success(function (data) {
//                    $scope.projet = data;
//                    $scope.currentLeader = $scope.IdCurrentUser === $scope.projet.IdUser ? true : false;
//                    $http.get('/api/Projects/UsersApplied/' + $scope.IdProject).success(function (data) {
//                        $scope.applicants = data;
//                        angular.forEach($scope.applicants, function (value) {
//                            if (value.UniqId === $scope.IdCurrentUser) {
//                                $scope.alreadyApplied = true;
//                            }
//                        });
//                    });
//                    $http.get('/api/Users/Detail/' + $scope.projet.IdUser).success(function (data) {
//                        $scope.leaderProject = data;
//                    });
//
//                }).error(function () {
//                    alert("Erreur du chargement des postulants au projet.");
//                });
            }
        });

// Controller pour l'ouverture des différentes pop-up
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
