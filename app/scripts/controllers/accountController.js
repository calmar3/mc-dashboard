(function () {
    'use strict';

    var AccountCtrl = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory','userFactory', function ($scope, $rootScope, $compile,$state,$http,hostFactory,userFactory) {

        var ctrl = this;
        ctrl.username = "";
        ctrl.newPassword = "";
        ctrl.confirmPassword = "";
        ctrl.modify = modifyFn;
        ctrl.reset = resetFn;
        ctrl.invalidCredential = false;

        function modifyFn() {
            if (ctrl.username === null || ctrl.username === undefined || ctrl.username === "") {
                ctrl.invalidCredential = true;
                setTimeout(function() {
                    ctrl.invalidCredential = false;
                    $scope.$apply();
                }, 1000);
                return;
            }

            if (ctrl.newPassword === null || ctrl.newPassword === undefined || ctrl.newPassword.length < 8
            || ctrl.newPassword != ctrl.confirmPassword) {
                ctrl.invalidCredential = true;
                setTimeout(function() {
                    ctrl.invalidCredential = false;
                    $scope.$apply();
                }, 1000);
                return;
            }

            var data = userFactory.getUser();
            data.username = ctrl.username;
            data.password = ctrl.newPassword;

            $http.post(hostFactory.getHost()+hostFactory.getUserUpdateAPI(),data).then(function(response) {
                userFactory.setUser(response.data);

                $state.go("Profilo Utente");

            }).catch(function (error) {
                ctrl.invalidLogin = true;
                setTimeout(function () {
                    ctrl.invalidLogin = false;
                    $scope.$apply();
                },1000);
            });
        }

        function resetFn() {
            ctrl.username = null;
            ctrl.newPassword = null;
            ctrl.confirmPassword = null;
        }

    }];

    AccountCtrl.$inject = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory','userFactory'];

    angular.module('mc-dashboard').controller('AccountCtrl', AccountCtrl);
}());
