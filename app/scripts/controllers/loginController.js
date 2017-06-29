(function () {
    'use strict';

    var LoginCtrl = ['$scope', '$rootScope', '$compile','$state','$http', '$cookies','hostFactory','userFactory', 'authFactory', function ($scope, $rootScope, $compile,$state,$http,$cookies,hostFactory,userFactory, authFactory) {

        var ctrl = this;

        ctrl.username = "";

        ctrl.password = "";

        ctrl.login = loginFn;

        ctrl.invalidLogin = false;

        initController();

        function initController() {
            authFactory.logout();
        }

        function loginFn() {
            if (ctrl.username === null || ctrl.username === undefined || ctrl.username===""){
                ctrl.invalidLogin = true;
                setTimeout(function () {
                    ctrl.invalidLogin = false;
                    $scope.$apply();
                },1000);
                return;
            }
            if (ctrl.password === null || ctrl.password === undefined || ctrl.password==="" || ctrl.password.length < 8){
                ctrl.invalidLogin = true;
                setTimeout(function () {
                    ctrl.invalidLogin = false;
                    $scope.$apply();
                },1000);
                return;
            }

            var data = {
                'username':ctrl.username,
                'password':ctrl.password
            };

            authFactory.login(data, function (result) {
                if (result === true) {
                    $state.go('Profilo Utente');
                }
                else {
                    ctrl.invalidLogin = true;
                    setTimeout(function() {
                        ctrl.invalidLogin = false;
                        $scope.$apply();
                    }, 1000);
                }
            })
        }

    }];

    LoginCtrl.$inject = ['$scope', '$rootScope', '$compile','$state','$http','$cookies','hostFactory','userFactory', 'authFactory'];

    angular.module('mc-dashboard').controller('LoginCtrl', LoginCtrl);

}());
