/**
 * Created by simone on 26/05/17.
 */
(function () {
    'use strict';

    var procOrdCtrl = ['$scope', '$rootScope', '$compile', '$http', '$state', 'hostFactory', 'authFactory', function ($scope, $rootScope, $compile, $http, $state, hostFactory, authFactory) {

        if (authFactory.authorize() === false) {
            return;
        }

        var ctrl = this;

        console.log("processingOrderctrl");


        /**
         * ALL
         * Funzione principale che prende tutti gli ordini dal backend e li divide per In e Out
         */
        ctrl.getAllCommission = function () {
            $http.get(hostFactory.getHost() + hostFactory.getCommissionAPI()).then(function (response) {

                ctrl.outCommissions = [];

                ctrl.inCommissions = [];

                ctrl.orderCompleted = 0;

                ctrl.commissions = response.data;

                ctrl.commissions.forEach(function (entry) {

                    if (!entry.commission.completed) {
                        if (entry.commission.source == "FoodEmperors")
                            ctrl.outCommissions.push(entry);

                        if (entry.commission.destination == "FoodEmperors")
                            ctrl.inCommissions.push(entry);
                    }
                    else
                        ctrl.orderCompleted++;
                });

            }).catch(function (error) {
                console.log(error);
            });
        }

        ctrl.getAllCommission();


        /**
         * ALL
         * Serve a mostrare la tabella con la gestione dell'ordine, se è nullo mostra la lista degli ordini totali disponibili
         * @param order l'ordine da mostrare
         */
        ctrl.showOrderFn = function (order) {


            ctrl.deliveredProducts = [];
            ctrl.selectedBatches = [];


            if (order == null) {
                ctrl.showOrder = null;
                // window.location.reload(true);
                ctrl.getAllCommission();
            } else {
                ctrl.showOrder = order;
                console.log(ctrl.showOrder);
                var i;
                for (i = 0; i < order.batches.length; i++)
                    ctrl.selectedBatches[i] = 0;


            }
        }


        /**
         * ALL
         * serve a far mostrare alla modal la descrizione dell'articolo
         * @param product
         */
        ctrl.showProductFn = function (product) {

            ctrl.showProduct = product;

        }


        /**
         * ALL
         * permette di arrivare allo stato di storico, per mostrare lo storico ordini
         */
        ctrl.showHistory = function () {
            $state.go("Storico");

        }


        /**
         * ORDINI EFFETTUATI
         * serve a far mostrare alla modal la segnalazione del prodotto
         * @param product
         */
        ctrl.signalProductFn = function (product) {

            ctrl.signalProduct = product;

        }


        /**
         *  ORDINI EFFETTUATI
         *  Quando si clicca sulla checkbox, se il click è positivo inserisce il batch nella lista dei batch da modificare,
         *  se è negativo, lo elimina dalla lista
         *
         * @param batch
         * @param status
         */
        ctrl.toggle = function (batch, status) {

            if (status) {
                batch.status = 2;
                ctrl.deliveredProducts.push(batch);
            }
            else {
                ctrl.idx = ctrl.deliveredProducts.indexOf(batch);
                ctrl.deliveredProducts.splice(ctrl.idx, 1);

            }

            console.log(ctrl.deliveredProducts);
        }


        /**
         *  ORDINI RICEVUTI
         *  manda la conferma al backend contenente i batches modificati (delivered)
         */
        ctrl.confirmDeliveredProduct = function () {

            $http.post(hostFactory.getHost() + hostFactory.postBatchAPI(), ctrl.deliveredProducts).then(function (response) {

                ctrl.showOrderFn(response.data);


            }).catch(function (error) {
                console.log(error);
            });

        }

        ctrl.checkSignaled = [];
        /**
         *  ORDINI EFFETTUATI
         *  Quando si clicca sulla checkbox, se il click è positivo inserisce il batch nella lista dei batch da modificare,
         *  se è negativo, lo elimina dalla lista
         *
         * @param batch
         * @param status
         */
        ctrl.signalToggle = function (info) {

            var idx = ctrl.checkSignaled.indexOf(info);


            if (idx > -1) {
                ctrl.checkSignaled.splice(idx, 1);

            }
            else {
                ctrl.checkSignaled.push(info);
            }

        }


        /**
         * TODO: caso d'uso "SEGNALAZIONE PRODOTTO"
         *
         *
         */
        ctrl.sendSignaledProduct = function () {

            console.log(ctrl.checkSignaled);

            console.log(ctrl.textSignaled);
        }

        /**
         * ORDINI RICEVUTI
         * Gestione degli ordini ricevuti, si seleziona il batch da inserire nelle spedizioni degli ordini ricevuti
         *
         * @param batch
         * @param index
         */
        ctrl.batchSetting = function (batch, index) {

            ctrl.despBatches = null;
            $http.post(hostFactory.getHost() + hostFactory.getCatalogueBatchesByProductAPI(), batch.product).then(function (response) {

                ctrl.despBatches = response.data;
                ctrl.getBatch = batch;
                ctrl.selectedBatch = null;

                ctrl.confermaLotto = function () {

                    //SelectedBatch: Batch in ingresso
                    //newBatch: Batch in uscita
                    console.log(ctrl.selectedBatch);

                    ctrl.newBatch = ctrl.getBatch;


                    ctrl.newBatch.delDate = ctrl.currentDate();
                    ctrl.newBatch.status = 1;
                    ctrl.newBatch.expDate = ctrl.selectedBatch.expDate;
                    ctrl.newBatch.price = ctrl.selectedBatch.price;
                    ctrl.selectedBatch.remaining -= ctrl.newBatch.quantity;

                    var idx = ctrl.showOrder.batches.indexOf(ctrl.getBatch);

                    ctrl.showOrder.batches.splice(idx, 1, ctrl.newBatch);
                    // ctrl.showOrder.batches.splice(idx,0,ctrl.newBatch);


                    ctrl.selectedBatches.splice(index, 1);

                    var b = new Object();
                    b.name = ctrl.newBatch.product.name;
                    b.batch = ctrl.newBatch;
                    b.ourBatch = ctrl.selectedBatch;
                    ctrl.selectedBatches.splice(index, 0, b);

                    ctrl.confirmationButton = 1;

                }


            }).catch(function (error) {
                console.log(error);
            });


        }


        /**
         *  ORDINI RICEVUTI
         *
         *  modifica l'ordine ricevuto, inserendo i batch modificati.
         */
        ctrl.sendBatches = function () {

            var batchToSend = [];

            for (var i = 0; i < ctrl.selectedBatches.length; i++) {
                if (ctrl.selectedBatches[i].batch) {
                    batchToSend.push(ctrl.selectedBatches[i].ourBatch);
                    batchToSend.push(ctrl.selectedBatches[i].batch);
                }
            }


            console.log(ctrl.selectedBatches);

            $http.post(hostFactory.getHost() + hostFactory.postBatchesAPI(), batchToSend).then(function (response) {


                ctrl.showOrderFn(null);


            }).catch(function (error) {
                console.log(error);
            });

        }


        ctrl.currentDate = function () {
            var currentTime = new Date();
            var month = currentTime.getMonth() + 1;
            var day = currentTime.getDate();
            var year = currentTime.getFullYear();
            return (day + "/" + month + "/" + year);


        }

    }];

    procOrdCtrl.$inject = ['$scope', '$rootScope', '$compile', '$http', '$state', 'hostFactory', 'authFactory'];

    angular.module('mc-dashboard').controller('procOrdCtrl', procOrdCtrl);

}());
