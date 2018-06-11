/**
 * Created by Caim03 on 23/06/17.
 */

(function () {
    'use strict';

    var ShowDeliveryCtrl = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory', 'authFactory', function ($scope, $rootScope, $compile,$state,$http,hostFactory, authFactory) {

        if (authFactory.authorize() === false) {
            return;
        }

        var ctrl = this;
        ctrl.deliveryNotes = null;

        function loadDeliveryNotes() {
            $http.get(hostFactory.getHost() + hostFactory.getSaveDeleteUpdateDeliveryAPI()).then(function (response) {

                ctrl.deliveryNotes = response.data;
            }).catch(function (reason) {
                console.log(reason);
            });
        }

        loadDeliveryNotes();
    }];

    ShowDeliveryCtrl.$inject = ['$scope', '$rootScope', '$compile','$state','$http','hostFactory', 'authFactory'];

    angular.module('mc-dashboard').controller('ShowDeliveryCtrl', ShowDeliveryCtrl);
}());
/**
 * Created by Caim03 on 30/06/17.
 */
