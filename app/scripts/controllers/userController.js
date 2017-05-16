(function () {
    'use strict';

    var UserCtrl = ['$scope', '$rootScope', '$compile', function ($scope, $rootScope, $compile) {

        var ctrl = this;

        console.log("userctrl");

    }];

    UserCtrl.$inject = ['$scope', '$rootScope', '$compile'];

    angular.module('mc-dashboard').controller('UserCtrl', UserCtrl);

}());
