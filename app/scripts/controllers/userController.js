(function () {
    'use strict';

    var UserCtrl = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http','userFactory', function ($scope, $rootScope, $compile, $state, $stateParams,$http,userFactory) {



        var ctrl = this;

        ctrl.user = userFactory.getUser();

        console.log(ctrl.user);


    }];



    UserCtrl.$inject = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http','userFactory'];

    angular.module('mc-dashboard').controller('UserCtrl', UserCtrl);

}());
