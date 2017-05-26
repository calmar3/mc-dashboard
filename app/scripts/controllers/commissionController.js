
(function () {
    'use strict';

    var CommissionCtrl = ['$scope', '$rootScope', '$compile','$http','hostFactory', function ($scope, $rootScope, $compile,$http,hostFactory) {

        var ctrl = this;

        ctrl.commissions = null;

        ctrl.clicked = false;

        ctrl.searchText = "";

        ctrl.mode = null;

        ctrl.selected = null;

        ctrl.searchFilter = searchFilterFn;

        ctrl.switchMode = switchModeFn;

        ctrl.select = selectFn;

        ctrl.delete = deleteFn;

        ctrl.selectBatch = selectBatchFn;

        ctrl.success = false;

        ctrl.error = false;

        ctrl.selectedBatch = null;

        ctrl.newOrder = {
            source:"FoodEmperors"
        };

        ctrl.stockists = ["Grandi Magazzini","Pigliatutto"];

        ctrl.stockist = ctrl.stockists[0];

        loadCommissions();

        loadProducts();

        function selectBatchFn(batch) {
            ctrl.selectedBatch = batch;
        }

        function deleteFn() {
            $http.get(hostFactory.getHost()+hostFactory.getAllProductsAPI()).then(function (response) {
                console.log(response.data);
                ctrl.success = true;
                setTimeout(function () {
                    ctrl.success = false;
                    ctrl.switchMode(null);
                    $scope.$apply();
                },1000);
            }).catch(function (error) {
                console.log(error);
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = false;
                    ctrl.switchMode(null);
                    $scope.$apply();
                },1000);
            });
        }

        function selectFn(commission) {
            ctrl.clicked = true;
            if (ctrl.selected === commission)
                ctrl.selected = null;
            else if (ctrl.selected === null)
                ctrl.selected = commission;
            else
                ctrl.selected = commission;
        }


        function switchModeFn(mode) {

            ctrl.mode = mode;
            if (!ctrl.mode)
                ctrl.selected = null;
        }

        function searchFilterFn(item) {

            if (ctrl.searchText && !ctrl.searchText !== '') {
                if (item.commission.number.toString().toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
                    return true;
                }
                else if (item.commission.source.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
                    return true;
                }
                else if(item.commission.destination.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1){
                    return true;
                }
                else {
                    return false;
                }
            }else{
                return true;
            }
        }

        function loadCommissions() {
            $http.get(hostFactory.getHost()+hostFactory.getAllCommissionsAPI()).then(function (response) {
                console.log(response.data);
                ctrl.commissions = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        }

        function loadProducts() {
            $http.get(hostFactory.getHost()+hostFactory.getAllProductsAPI()).then(function (response) {
                console.log(response.data);
                ctrl.products = response.data;
                if (ctrl.products.length>0)
                    ctrl.product = ctrl.products[0];
            }).catch(function (error) {
                console.log(error);
            });
        }

    }];

    CommissionCtrl.$inject = ['$scope', '$rootScope', '$compile','$http','hostFactory'];

    angular.module('mc-dashboard').controller('CommissionCtrl', CommissionCtrl);

}());
