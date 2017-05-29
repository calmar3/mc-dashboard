
(function() {
    'use strict';
    angular.module('mc-dashboard').factory('hostFactory', hostFactory);

    function hostFactory() {
        var hostFactory = {};

        hostFactory.host = "http://localhost:8080/";

        hostFactory.loginAPI = "api/user/login";

        hostFactory.commissionAPI = "/api/commissions";

        hostFactory.BatchAPI = "api/saveBatches";

        hostFactory.getHost = getHostFn;

        hostFactory.getLoginAPI = getLoginAPIFn;

        hostFactory.getCommissionAPI = getCommissionAPIFn;

        hostFactory.sendBatchAPI = sendBatchAPIFn;

        function sendBatchAPIFn()
        {
            return hostFactory.BatchAPI;
        }

        function getCommissionAPIFn(){

            return hostFactory.commissionAPI;
        }

        function getHostFn() {
            return hostFactory.host;
        }


        function getLoginAPIFn() {
            return hostFactory.loginAPI;
        }



        return hostFactory;
    }


}());
