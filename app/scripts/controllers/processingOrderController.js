/**
 * Created by simone on 26/05/17.
 */
(function () {
    'use strict';

    var procOrdCtrl = ['$scope', '$rootScope', '$compile','$http','hostFactory', function ($scope, $rootScope, $compile,$http,hostFactory) {

        var ctrl = this;

        console.log("processingOrderctrl");

        $http.get(hostFactory.getHost()+hostFactory.getCommissionAPI()).then(function (response) {

            ctrl.commissions = response.data;


            ctrl.showOrder = null;

            ctrl.showOrderFn = function (order) {
                if(order == null)
                    ctrl.showOrder = null;
                else
                    ctrl.showOrder = order;

            }




            ctrl.showProduct = null;

            ctrl.showProductFn = function (product) {

                ctrl.showProduct = product;

            }

            ctrl.toggle = function(batch,status)
            {
                if(status)
                    ctrl.deliveredProducts.push(batch);

                else
                {
                    ctrl.idx = ctrl.deliveredProducts.indexOf(batch);
                    ctrl.deliveredProducts.splice(ctrl.idx,1);

                }

            }


            ctrl.deliveredProducts = [];

            ctrl.confirmDeliveredProduct = function () {

                console.log(ctrl.deliveredProducts);

            }


        }).catch(function (error) {
            console.log(error);
        });


    }];

    procOrdCtrl.$inject = ['$scope', '$rootScope', '$compile','$http','hostFactory'];

    angular.module('mc-dashboard').controller('procOrdCtrl', procOrdCtrl);

}());
