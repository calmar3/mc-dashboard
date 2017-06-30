/**
 * Created by simone on 29/06/17.
 */

(function () {
    'use strict';

    var HistoryCtrl = ['$scope', '$rootScope', '$compile', '$http', 'hostFactory', function ($scope, $rootScope, $compile, $http, hostFactory) {

        var ctrl = this;


        ctrl.outCommissions = [];

        ctrl.inCommissions = [];

        ctrl.showOrder = null;

        $http.get(hostFactory.getHost() + hostFactory.getCommissionAPI()).then(function (response) {

            ctrl.commissions = response.data;

            console.log(ctrl.commissions);


            ctrl.commissions.forEach(function (entry) {

                if (entry.commission.completed) {
                    if (entry.commission.source == "FoodEmperors")
                        ctrl.outCommissions.push(entry);

                    if (entry.commission.destination == "FoodEmperors")
                        ctrl.inCommissions.push(entry);
                }

                ctrl.showOrder = null;


            });
        }).catch(function (error) {
            console.log(error);
        });


        ctrl.showOrderFn = function (order) {

            if (order == null) {
                ctrl.showOrder = null;

            } else {
                ctrl.showOrder = order;
            }
        }

        ctrl.InSearchText = null;
        ctrl.OutSearchText = null;


        ctrl.InSearchFilter = function (item) {


            if (ctrl.InSearchText && ctrl.InSearchText !== '') {
                if (item.commission.number.toString().toLowerCase().indexOf(ctrl.InSearchText.toLowerCase()) !== -1) {
                    return true;
                }
                else if (item.commission.source.toLowerCase().indexOf(ctrl.InSearchText.toLowerCase()) !== -1) {
                    return true;
                }
                else if(item.commission.destination.toLowerCase().indexOf(ctrl.InSearchText.toLowerCase()) !== -1){
                    return true;
                }
                else if(item.commission.date.toLowerCase().indexOf(ctrl.InSearchText.toLowerCase()) !== -1){
                    return true;
                }
                else {
                    return false;
                }
            }else{
                return true;
            }
        }


        ctrl.OutSearchFilter = function (item) {

            if (ctrl.OutSearchText && ctrl.OutSearchText !== '') {
                if (item.commission.number.toString().toLowerCase().indexOf(ctrl.OutSearchText.toLowerCase()) !== -1) {
                    return true;
                }
                else if (item.commission.source.toLowerCase().indexOf(ctrl.OutSearchText.toLowerCase()) !== -1) {
                    return true;
                }
                else if(item.commission.destination.toLowerCase().indexOf(ctrl.OutSearchText.toLowerCase()) !== -1){
                    return true;
                }
                else if(item.commission.date.toLowerCase().indexOf(ctrl.OutSearchText.toLowerCase()) !== -1){
                    return true;
                }
                else {
                    return false;
                }
            }else{
                return true;
            }
        }




    }];

    HistoryCtrl.$inject = ['$scope', '$rootScope', '$compile', '$http', 'hostFactory'];

    angular.module('mc-dashboard').controller('HistoryCtrl', HistoryCtrl);

}());