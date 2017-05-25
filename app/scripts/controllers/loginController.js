(function () {
    'use strict';

    var LoginCtrl = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory','userFactory', function ($scope, $rootScope, $compile,$state,$http,hostFactory,userFactory) {

        var ctrl = this;

        ctrl.username = "";

        ctrl.password = "";

        ctrl.login = loginFn;

        ctrl.invalidLogin = false;


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
            
            $http.post(hostFactory.getHost()+hostFactory.getLoginAPI(),data).then(function (response) {

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

    }];

    LoginCtrl.$inject = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory','userFactory'];

    angular.module('mc-dashboard').controller('LoginCtrl', LoginCtrl);

}());
