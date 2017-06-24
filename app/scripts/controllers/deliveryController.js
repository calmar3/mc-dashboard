/**
 * Created by Caim03 on 23/06/17.
 */

(function () {
    'use strict';

    var DeliveryCtrl = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory', function ($scope, $rootScope, $compile,$state,$http,hostFactory) {

        var ctrl = this;
        ctrl.batchDel = [];
        ctrl.numOrder = "";
        ctrl.currentCommissionDto = null;
        ctrl.currentBatches = null;
        ctrl.deliveryNote = {};

        ctrl.isCompleted = isCompletedFn;
        ctrl.addBatch = addBatchFn;
        ctrl.setState = setStateFn;
        ctrl.genDeliveryNote = genDeliveryNoteFn;
        ctrl.sendDeliveryNote = sendDeliveryNoteFn;

        function loadCommission() {
            $http.get(hostFactory.getHost() + hostFactory.getAllCommissionsAPI()).then(function (response) {

                ctrl.commissionsDto = response.data;
                ctrl.commissionsDto.forEach(function (item) {
                    var num_order = item.commission.number;
                    ctrl.batchDel[num_order] = [];
                });
            })
        }

        loadCommission();

        function isCompletedFn(commission) {
            if (commission.completed === "true") {
                return true;
            }
            return false;
        }

        function addBatchFn(batch, element) {
            element.checked = !element.checked;

            if (element.checked) {
                ctrl.batchDel[batch.commission.number].push(batch);
                console.log("Checkbox is checked");
            }
            else{
                ctrl.batchDel[batch.commission.number].splice(ctrl.batchDel.indexOf(batch), 1);
                console.log("Checkbox is unchecked");
            }

            console.log(ctrl.batchDel);
        }

        function setStateFn(batch) {
            if (batch.delivered === "true") {
                return "Pronto";
            }

            else if (batch.delivered === "Spedito") {
                return "Spedito";
            }

            else {
                return "Non Spedibile";
            }
        }

        function genDeliveryNoteFn(commissionDto) {
            ctrl.currentCommissionDto = commissionDto;
            ctrl.currentBatches = ctrl.batchDel[commissionDto.commission.number];

            /*var doc = new jsPDF();
            var elementHandler = {
                '#ignorePDF': function (element, renderer) {
                    return true;
                }
            };
            var source = window.document.getElementById("modal-deliveryConfirm")[0];
            doc.fromHTML(source, 15, 15, {'width': 180, 'elementHandlers': elementHandler});
            doc.output("dataurlnewwindow");*/
        }

        function getDate() {
            var date = new Date();
            var day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();

            if (day < 10) {
                day = "0" + day.toString();
            }
            else {
                day = day.toString();
            }

            if (month < 10) {
                month = "0" + month.toString();
            }
            else {
                month = month.toString();
            }

            year = year.toString();

            return day + "/" + month + "/" + year;
        }

        function sendDeliveryNoteFn() {
            ctrl.deliveryNote.date = getDate();
            ctrl.deliveryNote.business = "FoodEmperors";
            ctrl.deliveryNote.batches = ctrl.currentBatches;

            var len = ctrl.deliveryNote.batches.length;
            for (var i = 0; i < len; i++) {
                ctrl.deliveryNote.batches[i].delivered = "Spedito";
            }

            $http.post(hostFactory.getHost() + hostFactory.getSaveDeleteUpdateDeliveryAPI(), ctrl.deliveryNote).then(function(response) {
                loadCommission();
            }).catch(function (error) {
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = false;
                    $scope.$apply();
                },1500);
            });
        }
    }];

    DeliveryCtrl.$inject = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory'];

    angular.module('mc-dashboard').controller('DeliveryCtrl', DeliveryCtrl);
}());
