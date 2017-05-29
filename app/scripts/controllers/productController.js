/**
 * Created by mariusdragosionita on 26/05/17.
 */
(function () {
    'use strict';

    var ProductCtrl = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', 'hostFactory', function ($scope, $rootScope, $compile, $state, $stateParams, $http, hostFactory) {

        var ctrl = this;

        ctrl.product = null;

        ctrl.go = goFn;

        ctrl.updateProduct = updateProductFn;

        ctrl.addProduct = addProductFn;

        ctrl.add = false;

        ctrl.modify = false;

        ctrl.eliminateProduct = eliminateProductFn;

        ctrl.switchMode = switchModeFn;

        ctrl.mode = null;

        ctrl.addProperty = addPropertyFn;

        ctrl.deleteProperty = deletePropertyFn;

        ctrl.newProperty = null;

        function deletePropertyFn(index) {
            if (ctrl.product)
                ctrl.product.properties.splice(index,1);
        }

        function addPropertyFn() {
            if (ctrl.product === null || ctrl.product === undefined)
                ctrl.product = {
                    properties:[]
                };
            if (ctrl.product.properties === null || ctrl.product.properties === undefined)
                ctrl.product.properties = [];
            if (ctrl.newProperty === null || ctrl.newProperty === undefined || ctrl.product.properties.indexOf(ctrl.newProperty) !== -1)
                return;
            else{

                ctrl.product.properties.push(ctrl.newProperty)
                ctrl.newProperty = null;
            }
        }

        function switchModeFn(mode) {
            ctrl.mode = mode;
        }

        function goFn(state){
            $state.go(state);
        }


        function addProductFn() {
            ctrl.add = true;
            ctrl.product = null;
        }


        if ($stateParams.product!==null){
            ctrl.product = $stateParams.product;
            ctrl.modify = true;
        }


        function eliminateProductFn() {
            if (ctrl.product === null)
                return;
            $http.delete(hostFactory.getHost()+hostFactory.getProductAPI() + '/' + ctrl.product.id).then(function (response) {
                $state.go("Catalogo Prodotti");

            }).catch(function (error) {
                ctrl.invalidLogin = true;
                setTimeout(function () {
                    ctrl.invalidLogin = false;
                    $scope.$apply();
                },1000);
            });
        }


        function updateProductFn() {
            if (ctrl.product === null)
                return;
            $http.put(hostFactory.getHost()+hostFactory.getProductAPI(),ctrl.product).then(function (response) {
                $state.go("Catalogo Prodotti");

            }).catch(function (error) {
                ctrl.invalidLogin = true;
                setTimeout(function () {
                    ctrl.invalidLogin = false;
                    $scope.$apply();
                },1000);
            });
        }


    }];

    ProductCtrl.$inject = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', 'hostFactory'];

    angular.module('mc-dashboard').controller('ProductCtrl', ProductCtrl);

}());
