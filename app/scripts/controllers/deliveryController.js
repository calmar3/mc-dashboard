/**
 * Created by Caim03 on 23/06/17.
 */

(function () {
    'use strict';

    var DeliveryCtrl = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory', 'authFactory', function ($scope, $rootScope, $compile,$state,$http,hostFactory, authFactory) {

        if (authFactory.authorize() === false) {
            return;
        }

        var ctrl = this;
        ctrl.batchDel = [];
        ctrl.numOrder = "";
        ctrl.currentCommissionDto = null;
        ctrl.currentBatches = null;
        ctrl.deliveryNote = {};
        ctrl.deliveryNotes = null;

        ctrl.isCompleted = isCompletedFn;
        ctrl.addBatch = addBatchFn;
        ctrl.setState = setStateFn;
        ctrl.genDeliveryNote = genDeliveryNoteFn;
        ctrl.sendDeliveryNote = sendDeliveryNoteFn;

        loadCommission();

        function loadCommission() {


            $http.get(hostFactory.getHost() + hostFactory.getAllCommissionsAPI()).then(function (response) {

                ctrl.commissionsDto = response.data;
                ctrl.commissionsDto.forEach(function (item) {
                    var num_order = item.commission.id;
                    ctrl.batchDel[num_order] = [];
                });

                console.log(ctrl.commissionsDto);
            }).catch(function (reason) {
                console.log(reason);
            })
        }

        function isCompletedFn(commission) {
            if (commission.completed === "true") {
                return true;
            }
            return false;
        }

        function addBatchFn(batch, element) {
            element.checked = !element.checked;

            if (element.checked) {
                ctrl.batchDel[batch.commission.id].push(batch);
                console.log("Checkbox is checked");
            }
            else{
                ctrl.batchDel[batch.commission.id].splice(ctrl.batchDel.indexOf(batch), 1);
                console.log("Checkbox is unchecked");
            }

            console.log(ctrl.batchDel);
        }

        function setStateFn(batch) {
            if (batch.status === 0) {
                return "In lavorazione";
            }

            else if (batch.status === 1) {
                return "Pronto";
            }

            else if (batch.status === 2) {
                return "Spedito";
            }

            else {
                return "Segnalato";
            }
        }

        function genDeliveryNoteFn(commissionDto) {
            ctrl.currentCommissionDto = commissionDto;
            ctrl.currentBatches = ctrl.batchDel[commissionDto.commission.id];
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

        function genPdf() {
            var doc = new jsPDF('p', 'pt');
            var text = "Documento di trasporto" + " - " + ctrl.deliveryNote.business + " - " + ctrl.deliveryNote.date;

            var columns = ["Prodotto", "Quantità", "Lotto", "Prezzo", "Descrizione"];
            var rows = [];
            for (var i = 0; i < ctrl.currentBatches.length; i++) {
                rows.push([ctrl.currentBatches[i].product.name, ctrl.currentBatches[i].quantity, ctrl.currentBatches[i].number, ctrl.currentBatches[i].price, ctrl.currentBatches[i].product.description]);
            }
            doc.autoTable(columns, rows, {
                margin: {top: 60},
                addPageContent: function(data) {
                    doc.text(text, 40, 30);
                }
            });
            doc.output("dataurlnewwindow");
        }

        function sendDeliveryNoteFn() {
            ctrl.deliveryNote.date = getDate();
            ctrl.deliveryNote.business = "FoodEmperors";
            ctrl.deliveryNote.batches = ctrl.currentBatches;

            genPdf();

            var len = ctrl.deliveryNote.batches.length;
            for (var i = 0; i < len; i++) {
                ctrl.deliveryNote.batches[i].status = 2;
            }

            $http.post(hostFactory.getHost() + hostFactory.getSaveDeleteUpdateDeliveryAPI(), ctrl.deliveryNote).then(function(response) {
                loadCommission();
            }).catch(function (error) {
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = false;
                    $scope.$apply();
                },2000);
            });
        }
    }];

    DeliveryCtrl.$inject = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory', 'authFactory'];

    angular.module('mc-dashboard').controller('DeliveryCtrl', DeliveryCtrl);
}());
