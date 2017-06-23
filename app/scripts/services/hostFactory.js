
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

        hostFactory.outBatchesAPI ="api/batch/sendBatches";

        hostFactory.getHost = getHostFn;

        hostFactory.getLoginAPI = getLoginAPIFn;

        hostFactory.getCommissionAPI = getCommissionAPIFn;

        hostFactory.postBatchAPI = postBatchAPIFn;

        hostFactory.getCatalogueBatchesByProductAPI = catalogueBatchesByProductAPIFn;

        hostFactory.postBatchesAPI = postOutBatchesAPIFn;

        function postOutBatchesAPIFn(){

            return hostFactory.outBatchesAPI;
        }

        function catalogueBatchesByProductAPIFn()
        {
            return hostFactory.catalogueBatchesByProductAPI;
        }

        function postBatchAPIFn()
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
