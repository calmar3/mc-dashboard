
(function() {
    'use strict';
    angular.module('mc-dashboard').factory('hostFactory', hostFactory);

    function hostFactory() {
        var hostFactory = {};

        hostFactory.host = "http://localhost:8080/";

        hostFactory.loginAPI = "api/user/login";

        hostFactory.commissionAPI = "/api/commissions";

        hostFactory.BatchAPI = "api/batch/saveBatches";

        hostFactory.catalogueBatchesByProductAPI = "api/batch/getbatchesbyprod";

        hostFactory.getHost = getHostFn;

        hostFactory.getLoginAPI = getLoginAPIFn;

        hostFactory.getCommissionAPI = getCommissionAPIFn;

        hostFactory.sendBatchAPI = sendBatchAPIFn;

        hostFactory.getCatalogueBatchesByProductAPI = catalogueBatchesByProductAPIFn;

        function catalogueBatchesByProductAPIFn()
        {
            return hostFactory.catalogueBatchesByProductAPI;
        }

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
