(function () {
    'use strict';

    var CatalogCtrl = ['$scope', '$rootScope', '$compile', '$state', '$http', 'hostFactory', function ($scope, $rootScope, $compile, $state, $http, hostFactory) {

        var ctrl = this;

        console.log("catalogctrl");

        ctrl.products = null;

        //per andare a modificare le caratteristiche di un prodotto selezionato
        ctrl.product = productFn;

        function productFn(product) {
            //console.log(product)
           $state.go("Gestione Prodotti", {"product": product});
        }


        $http.get(hostFactory.getHost()+hostFactory.getProductAPI()).then(function (response) {

            console.log(response.data);
            ctrl.products = response.data;
        }).catch(function (error) {
            console.log(error);
        });

    }];


    CatalogCtrl.$inject = ['$scope', '$rootScope', '$compile', '$state', '$http', 'hostFactory'];

    angular.module('mc-dashboard').controller('CatalogCtrl', CatalogCtrl);

}());
