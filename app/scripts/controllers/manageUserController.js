/**
 * Created by Caim03 on 01/07/17.
 */
(function () {
    'use strict';

    var ManageUserCtrl = ['$scope', '$rootScope', '$compile','$state','$http', '$cookies','hostFactory','userFactory', 'authFactory', function ($scope, $rootScope, $compile,$state,$http, $cookies,hostFactory,userFactory, authFactory) {

        if (authFactory.authorize() === false) {
            return;
        }

        var ctrl = this;
        ctrl.users = null;
        ctrl.currUser = null;

        ctrl.viewUser = viewUserFn;
        ctrl.deleteUser = deleteUserFn;
        ctrl.modifyUser = modifyUserFn;

        loadUsers();

        function loadUsers() {
            $http.get(hostFactory.getHost()+hostFactory.getUserAPI()).then(function (response) {
                ctrl.users = response.data;
            })
        }

        function viewUserFn(user) {
            ctrl.currUser = user;
        }

        function deleteUserFn() {
            $http.delete(hostFactory.getHost()+hostFactory.getUserAPI() + "/" + ctrl.currUser.id).then(function (response) {
                $state.go('Gestione Utente');
                loadUsers();
            })
        }

        function modifyUserFn() {
            $http.post(hostFactory.getHost()+hostFactory.getUserAPI(), ctrl.currUser).then(function (response) {
                $state.go('Gestione Utente');
            })
        }
    }];

    ManageUserCtrl.$inject = ['$scope', '$rootScope', '$compile','$state','$http', '$cookies','hostFactory','userFactory', 'authFactory'];

    angular.module('mc-dashboard').controller('ManageUserCtrl', ManageUserCtrl);
}());
