(function () {
    'use strict';

    var CatalogCtrl = ['$scope', '$rootScope', '$compile', function ($scope, $rootScope, $compile) {

        var ctrl = this;

        console.log("catalogctrl");


    }];

    CatalogCtrl.$inject = ['$scope', '$rootScope', '$compile'];

    angular.module('mc-dashboard').controller('CatalogCtrl', CatalogCtrl);




}());
