var adminApp = angular.module('adminApp', []);

adminApp.controller('AdminController',
        function (
                $scope,
                $location,
                $http,
                $rootScope,
                $cookies,
                $route,
                UserService)
        {
            if ($rootScope.loggedIn === false || $rootScope.isAdmin === false) {
                $location.path('#/');
            }
            // $rootScope
            $test = $cookies.get('loggedIn');
            $rootScope.loggedIn = ($test === "true");
            $rootScope.isAdmin = $cookies.get('user_Admin') === "true" ? true : false;

            ////////////////////////////
            /////Functions du scope/////
            ////////////////////////////

            $scope.users = {};

            $scope.UserManagement = function () {
                $location.path('/admin/user-management');
            };

            $scope.deleteUser = function (id) {

                $http({url: '/api/user/' + id,
                    method: 'DELETE',
                    headers: {"Content-Type": "application/json;charset=utf-8"}
                }).success(function (res) {
                    $route.reload();
                }, function (error) {
                });
            };

            $scope.updateUser = function (id, admin, projetCreator, Dev) {

                var updateUser = {id: id, Admin: admin, isProvider: projetCreator, isDevelopper: Dev};
                $http.patch('/user/' + id, updateUser).success(function (data) {
                    alert("La modification a été réalisée avec succès.");
                })
                        .error(function (data) {

                            alert("Une errreur est survenue !");
                        });

            };

            // $scope
            $scope.selectedUser = {};
            $scope.queryFilter = '';
            UserService.all();
            $scope.users = UserService.data;
            $scope.adminId = $cookies.get('user_id');

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