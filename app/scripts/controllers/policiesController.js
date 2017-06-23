(function () {
    'use strict';

    var PoliciesCtrl = ['$scope', '$rootScope', '$compile','$http','hostFactory', function ($scope, $rootScope, $compile,$http,hostFactory) {

        var ctrl = this;

        ctrl.customizations = ["Prezzi","Fornitori","Promo"];

        ctrl.selectedTab = 0;

        ctrl.switchTab = switchTabFn;

        ctrl.products = [];

        ctrl.getProducts = getProductsFn;

        ctrl.setCharge = setChargeFn;

        ctrl.loadCategories = loadCategoriesFn;

        ctrl.description = "";

        ctrl.backupProducts = [];

        ctrl.product = {
            charge : 0
        };

        ctrl.loadCategories();

        function setChargeFn() {
            if (ctrl.charge && ctrl.charge >= 0.01 && ctrl.charge <= 1 && ctrl.product)
                ctrl.product.charge = ctrl.charge;
            $http.put(hostFactory.getHost()+hostFactory.getProductAPI(),ctrl.product).then(function (res) {
                ctrl.success = true;
               setTimeout(function () {
                   ctrl.success = null;
                   cleanChargeView();
                   $scope.$apply();
               },1500);
            }).catch(function (error) {
                console.log(error);
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = null;
                    cleanChargeView();
                    $scope.$apply();
                },1500)

            });
            ctrl.charge = null;

        }

        function switchTabFn(index) {
            cleanChargeView();
            ctrl.selectedTab = index;
        }

        function loadCategoriesFn() {
            $http.get(hostFactory.getHost()+hostFactory.getLeafCategoriesAPI()).then(function (response) {
                ctrl.categories = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        }


        function getProductsFn(search) {

            if (ctrl.description.length > search.length)
                ctrl.products =  JSON.parse(JSON.stringify(ctrl.backupProducts));
            ctrl.description = search;
            if (angular.isDefined(ctrl.category) && ctrl.category.length > 0 ){
                if (search!==null && search!==undefined && search.length==3){
                    var param = ctrl.category + " - " + search;
                    $http.get(hostFactory.getHost()+hostFactory.getFindProductByCategoryAndPropertiesAPI(param)).then(function (res) {
                        ctrl.products = JSON.parse(JSON.stringify(res.data));
                        ctrl.backupProducts =  JSON.parse(JSON.stringify(ctrl.products));
                    }).catch(function (error) {
                        console.log(error);
                        ctrl.products = [];
                    });
                }
                else if (search!==null && search!==undefined && search.length<3)
                    ctrl.products=[];
            }
            else
                return;

        }

        function cleanChargeView() {
            ctrl.category = "";
            ctrl.product = {
                charge : 0
            };
            ctrl.description = "";
            ctrl.backupProducts = [];
        };

    }];

    PoliciesCtrl.$inject = ['$scope', '$rootScope', '$compile','$http','hostFactory'];

    angular.module('mc-dashboard').controller('PoliciesCtrl', PoliciesCtrl);

}());
