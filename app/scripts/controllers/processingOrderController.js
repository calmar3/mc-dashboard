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

            ctrl.outCommissions = [];

            ctrl.inCommissions = [];


            ctrl.commissions.forEach(function(entry) {

                if(entry.commission.source == "FoodEmperors")
                    ctrl.outCommissions.push(entry);

                if(entry.commission.destination == "FoodEmperors")
                    ctrl.inCommissions.push(entry);

            });


            console.log(ctrl.outCommissions);


            console.log(ctrl.inCommissions);



            ctrl.showOrder = null;


            /**
             * Serve a mostrare la tabella con la gestione dell'ordine, se è nullo mostra la lista degli ordini disponibili
             * @param order l'ordine da mostrare
             */
            ctrl.showOrderFn = function (order) {

                if(order == null)
                    ctrl.showOrder = null;
                else
                    ctrl.showOrder = order;


            }

            ctrl.showProduct = null;

            /**
             * serve a far mostrare alla modal la descrizione del prodotto stesso (articolo)
             * @param product
             */
            ctrl.showProductFn = function (product) {

                ctrl.showProduct = product;

            }


            ctrl.signalProduct = null;

            /**
             * serve a far mostrare alla modal la segnalazione del prodotto stesso (articolo)
             * @param product
             */
            ctrl.signalProductFn = function (product) {

                ctrl.signalProduct = product;

            }

            ctrl.deliveredProducts = [];
            /**
             *  Quando si clicca sulla checkbox, se il click è positivo inserisce il batch nella lista dei batch da modificare,
             *  se è negativo, lo elimina dalla lista
             *
             * @param batch
             * @param status
             */
            ctrl.toggle = function(batch,status)
            {

                if(status) {
                    batch.delivered = "true";
                    ctrl.deliveredProducts.push(batch);
                }
                else
                {
                    ctrl.idx = ctrl.deliveredProducts.indexOf(batch);
                    ctrl.deliveredProducts.splice(ctrl.idx,1);

                }

            }


            /**
             *
             *  manda la conferma al backend contenente i batches modificati (delivered)
             */
            ctrl.confirmDeliveredProduct = function () {


                console.log(ctrl.deliveredProducts);





                    $http.post(hostFactory.getHost() + hostFactory.sendBatchAPI(), ctrl.deliveredProducts).then(function (response) {

                    ctrl.showOrderFn(response.data);


                }).catch(function (error) {
                    console.log(error);
                });

            }

            ctrl.textSignaled = null;
            ctrl.checkSignaled = [];
            /**
             *  Quando si clicca sulla checkbox, se il click è positivo inserisce il batch nella lista dei batch da modificare,
             *  se è negativo, lo elimina dalla lista
             *
             * @param batch
             * @param status
             */
            ctrl.signalToggle = function(info)
            {

                var idx = ctrl.checkSignaled.indexOf(info);


                if(idx > -1) {
                    ctrl.checkSignaled.splice(idx,1);

                }
                else
                {
                    ctrl.checkSignaled.push(info);
                }

            }

            ctrl.sendSignaledProduct = function () {

                console.log(ctrl.checkSignaled);

                console.log(ctrl.textSignaled);
            }

            ctrl.collapsed = false;


            ctrl.collapse = function(boh)
            {
                ctrl.collapsed = boh;

            }


            ctrl.getBatch = null;
            ctrl.despBatches = null;


            ctrl.batchSetting = function(batch)
            {

                $http.post(hostFactory.getHost() + hostFactory.getCatalogueBatchesByProductAPI(), batch.product).then(function (response) {

                    ctrl.despBatches = response.data;
                    ctrl.getBatch = batch;
                }).catch(function (error) {
                    console.log(error);
                });



            }



        }).catch(function (error) {
            console.log(error);
        });


    }];

    procOrdCtrl.$inject = ['$scope', '$rootScope', '$compile','$http','hostFactory'];

    angular.module('mc-dashboard').controller('procOrdCtrl', procOrdCtrl);

}());
