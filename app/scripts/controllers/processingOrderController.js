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

            console.log(ctrl.commissions);


            ctrl.showOrder = null;

            ctrl.showOrderFn = function (order) {
                if(order == null)
                    ctrl.showOrder = null;
                else
                    ctrl.showOrder = order;

                console.log(ctrl.showOrder);

            }


            ctrl.showProduct = null;

            ctrl.showProductFn = function (product) {

                ctrl.showProduct = product;

            }

        }).catch(function (error) {
            console.log(error);
        });


    }];

    procOrdCtrl.$inject = ['$scope', '$rootScope', '$compile','$http','hostFactory'];

    angular.module('mc-dashboard').controller('procOrdCtrl', procOrdCtrl);

}());
