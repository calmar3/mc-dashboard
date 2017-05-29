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

        }).catch(function (error) {
            console.log(error);
        });


    }];

    procOrdCtrl.$inject = ['$scope', '$rootScope', '$compile','$http','hostFactory'];

    angular.module('mc-dashboard').controller('procOrdCtrl', procOrdCtrl);

}());
