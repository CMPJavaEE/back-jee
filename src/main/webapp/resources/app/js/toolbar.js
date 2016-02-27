var toolbarApp = angular.module('toolbarApp', ['ngMaterial', 'CodingMarketPlaceApp']);

toolbarApp.config(function ($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

toolbarApp.controller('ToolbarCtrl', function ($scope, $rootScope, $mdDialog, $http, $location, $cookies, $mdSidenav, $log, UserService) {

    //$rootScope
    $test = $cookies.get('loggedIn');
    $rootScope.loggedIn = ($test === "true");
    $rootScope.couleur = '#FFFFFF';
    $rootScope.isAdmin = $cookies.get('user_Admin') === "true" ? true : false;
    $rootScope.isDevelopper = $cookies.get('user_Developper') === "true" ? true : false;
    $rootScope.isProjectLeader = $cookies.get('user_ProjectCreator') === "true" ? true : false;
    $rootScope.user = $scope.user;
    $rootScope.ImageUrlSaved = "";

    //$scope
    $scope.status = '';
    $scope.notAgreed = false;
    $scope.captchaNotValidated = false;
    $scope.fieldMissing = false;
    $scope.description = '';
    $scope.showMobileMainHeader = true;
    $scope.erreurLogin = false;
    $scope.input = {
        searchText: ''
    };
    $scope.project = {
        projectName: '',
        projectBudget: 0,
        projectDelay: 0,
        description: ''
    };
    $scope.user = {
        Login: $cookies.get('user_login') || undefined,
        Password: undefined,
        Email: undefined,
        FirstName: undefined,
        LastName: undefined,
        verif_password: undefined,
        Developper: $cookies.get('user_Developper') === "true" ? true : false || undefined,
        Activated: undefined,
        Admin: $cookies.get('user_Admin') === "true" ? true : false || undefined,
        Description: undefined,
        id: $cookies.get('user_id'),
        ImageUrl: undefined,
        ProjectCreator: $cookies.get('user_ProjectCreator') === "true" ? true : false || undefined,
        tags: []
    };

    $scope.userService = UserService.data;


    ////////////////////////////
    /////Functions du scope/////
    ////////////////////////////
    $scope.prev = function () {
        $('#carousel-accueil').carousel('prev');
    };
    $scope.next = function () {
        $('#carousel-accueil').carousel('next');
    };
    $scope.goAdmin = function () {
        $location.path('admin');
    };

    if ($rootScope.loggedIn) {
        $rootScope.user = {
            id: $cookies.get('user_id'),
            login: $cookies.get('user_login')
        };
        $rootScope.isAdmin = $cookies.get('user_Admin') === "true" ? true : false;
        $rootScope.isDevelopper = $cookies.get('user_Developper') === "true" ? true : false;
        $rootScope.isProjectLeader = $cookies.get('user_ProjectCreator') === "true" ? true : false;
    }
    /////////////////////////////
    ////Fonctions publiques//////
    /////////////////////////////

    // Connexion d'un user
    $scope.connection = function () {
        var identification = {password: $scope.user.password, login: $scope.user.mail};
        $http.post('/user/login', identification).success(function (data) {
            $scope.user = data;
            $rootScope.user = $scope.user;
            $rootScope.loggedIn = true;
            $cookies.put('loggedIn', $rootScope.loggedIn);
            $cookies.put('user_login', $scope.user.Login);
            $cookies.put('user_id', $scope.user.id);
            var projectCreatorStr = $scope.user.isProvider === true ? "true" : "false";
            var Admin = $scope.user.isAdmin === true ? "true" : "false";
            var Developper = $scope.user.isDevelopper === true ? "true" : "false";
            $cookies.put('user_ProjectCreator', projectCreatorStr);
            $cookies.put('user_Admin', Admin);
            $cookies.put('user_Developper', Developper);
            $rootScope.isAdmin = $cookies.get('user_Admin') === "true" ? true : false;
            $rootScope.isDevelopper = $cookies.get('user_Developper') === "true" ? true : false;
            $rootScope.isProjectLeader = $cookies.get('user_ProjectCreator') === "true" ? true : false;

            $scope.hide();
        }).error(function (data) {
            $scope.erreurLogin = true;
        });
    };

    // Déconnexion d'un user
    $scope.logOut = function () {
        $rootScope.loggedIn = false;
        $scope.user = undefined;
        $cookies.put('loggedIn', $rootScope.loggedIn);
        $cookies.put('user', $scope.user);
        $cookies.put('user_Developper', "false");
        $cookies.put('user_Admin', "false");
        $cookies.put('user_ProjectCreator', "false");
        $rootScope.isAdmin = false;
        $location.path('#/');
    };



    // Recherche d'un project
    $scope.search = function () {
        $location.path('search-projects/' + $scope.input.searchText);
    };

    // Accès à mon compte
    $scope.myAccount = function () {
        $location.path('user/' + $scope.user.id);
    };

    // Création d'un project
    $scope.createProject = function () {
        var project = {title: $scope.project.projectName, description: $scope.project.description, duration: $scope.project.projectDelay, budget: $scope.project.projectBudget, owner: 'user/' + $scope.user.id};

        $http.post('/project', project).success(function (data) {
            $scope.hide();
            alert('Le projet a été créé avec succès');
        });
    };

    // Validation des informations d'inscription
    $scope.checkInscriptionInfos = function () {
        if ($scope.firstname === undefined || $scope.lastname === undefined || $scope.login === undefined || $scope.mail === undefined || $scope.password === undefined || $scope.verif_password === undefined) {
            $scope.fieldMissing = true;
        } else {
            $scope.fieldMissing = false;
        }

        if ($scope.fieldMissing === false && $scope.password === $scope.verif_password) {
            var identification = {login: $scope.login, password: $scope.password, email: $scope.mail, is_dev: $scope.inscriptionDevelopper, is_provider: $scope.inscriptionProjectCreator, firstName: $scope.firstname, lastName: $scope.lastname};

            $.ajax({
                type: "POST",
                url: "/user/new",
                contentType: "application/json",
                data: JSON.stringify(identification),
                success: function (results) {
                    $scope.user.password = $scope.password;
                    $scope.user.mail = $scope.login;
                    $scope.connection();
                },
                error: function (resultat, status) {
                }
            });
        }
    };

    // Affectation de valeurs suivant le rôle sélectionné
    $scope.selectChange = function () {
        if ($scope.typeaccount === '1') {
            $scope.inscriptionProjectCreator = true;
            $scope.inscriptionDevelopper = false;
        } else if ($scope.typeaccount === '2') {
            $scope.inscriptionProjectCreator = false;
            $scope.inscriptionDevelopper = true;
        }
    };

    // Affichage d'un alert ou pop-up
    $scope.showAlert = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('This is an alert title')
                .content('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
                );
    };

    // Affichage pop-up de connexion 
    $scope.showDialogConnect = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/static/partials/dialog-connect.tmpl.html',
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

    // Affichage  pop-up d'inscription
    $scope.showDialogInscription = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/static/partials/dialog-inscription.tmpl.html',
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

    // Affichage pop-up de création de projet 
    $scope.showDialogProjectCreate = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/static/partials/dialog-creation-project.tmpl.html',
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

    $rootScope.openSideNavPanel = function () {
        $mdSidenav('left').open();
        // Validation des notifications en lus
        $scope.couleur = '#FF00FF';
    };
    $rootScope.closeSideNavPanel = function () {
        $mdSidenav('left').close();
    };


    $scope.toggleRight = buildToggler('right');
    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
        };
    }
    ;

}).controller('RightCtrl', function ($scope, $mdSidenav, $log) {
    $scope.close = function () {
        $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
    };
});
;

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
