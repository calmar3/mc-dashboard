(function () {
    'use strict';

    var UserCtrl = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http','userFactory', 'authFactory', function ($scope, $rootScope, $compile, $state, $stateParams,$http,userFactory, authFactory) {

        if (authFactory.authorize() === false) {
            return;
        }

        var ctrl = this;
        ctrl.user = userFactory.getUser();
        console.log(ctrl.user);
    }];



    UserCtrl.$inject = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http','userFactory', 'authFactory'];

    angular.module('mc-dashboard').controller('UserCtrl', UserCtrl);

}());
