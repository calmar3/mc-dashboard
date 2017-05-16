(function () {
    'use strict';

    var LoginCtrl = ['$scope', '$rootScope', '$compile','$state','$http', function ($scope, $rootScope, $compile,$state,$http) {

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
                    console.log(ctrl.invalidLogin);
                },1000);
                return;
            }
            if (ctrl.password === null || ctrl.password === undefined || ctrl.password==="" || ctrl.password.length < 8){
                ctrl.invalidLogin = true;
                setTimeout(function () {
                    ctrl.invalidLogin = false;
                    console.log(ctrl.invalidLogin);
                },1000);
                return;
            }

            var data = {
                username:ctrl.username,
                password:ctrl.password
            };

            $http.post('http://pippobaudo.com/api/login',data).then(function (response) {

                $state.go("Profilo Utente");

            }).catch(function (error) {
                $state.go("Profilo Utente");
            });



        }

    }];

    LoginCtrl.$inject = ['$scope', '$rootScope', '$compile','$state','$http'];

    angular.module('mc-dashboard').controller('LoginCtrl', LoginCtrl);

}());
