(function () {
    'use strict';

    var AccountCtrl = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory','userFactory', function ($scope, $rootScope, $compile,$state,$http,hostFactory,userFactory) {

        var ctrl = this;
        ctrl.username = "";
        ctrl.newPassword = "";
        ctrl.confirmPassword = "";
        ctrl.newQualification = "";
        ctrl.newNote = "";

        ctrl.modify = modifyFn;
        ctrl.reset = resetFn;
        ctrl.deleteQualification = deleteQualificationFn;
        ctrl.modifyAboutMe = modifyAboutMeFn;

        ctrl.invalidCredential = false;

        ctrl.user = userFactory.getUser();

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

            ctrl.user.username = ctrl.username;
            ctrl.user.password = ctrl.newPassword;

            if (ctrl.newQualification != null && ctrl.newQualification !== undefined && ctrl.newQualification != "") {
                ctrl.user.qualifications.push(ctrl.newQualification);
            }

            $http.post(hostFactory.getHost()+hostFactory.getUserUpdateAPI(), ctrl.user).then(function(response) {
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

        function deleteQualificationFn(qual) {
            var index = ctrl.user.qualifications.indexOf(qual);
            ctrl.user.qualifications.splice(index, 1);
        }

        function modifyAboutMeFn() {
            if (ctrl.newQualification != null && ctrl.newQualification !== undefined && ctrl.newQualification != "") {
              ctrl.user.qualifications.push(ctrl.newQualification);
            }

            $http.post(hostFactory.getHost()+hostFactory.getUserUpdateAPI(), ctrl.user).then(function(response) {
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

    AccountCtrl.$inject = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory','userFactory'];

    angular.module('mc-dashboard').controller('AccountCtrl', AccountCtrl);
}());
