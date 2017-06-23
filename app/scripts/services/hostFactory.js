(function () {
    'use strict';
    angular.module('mc-dashboard').factory('hostFactory', hostFactory);

    function hostFactory() {
        var hostFactory = {};

        hostFactory.host = "http://localhost:8080/";

        hostFactory.loginAPI = "api/user/login";

        hostFactory.userAPI = "api/user";

        hostFactory.allCommissionsAPI = "api/commissions";

        hostFactory.allProductsAPI = "api/products";

        hostFactory.saveDeleteUpdateCommissionAPI = "api/commission";

        hostFactory.findProductByProperties = "api/product/findby/category/properties";

        hostFactory.leafCategories = "api/categories/leaf";

        hostFactory.getSaveDeleteUpdateCommissionAPI = getSaveDeleteUpdateCommissionAPIFn;

        hostFactory.commissionAPI = "/api/commissions";

        hostFactory.BatchAPI = "api/batch/saveBatches";

        hostFactory.catalogueBatchesByProductAPI = "api/batch/getbatchesbyprod";

        hostFactory.outBatchesAPI = "api/batch/sendBatches";

        hostFactory.getHost = getHostFn;
        hostFactory.allPeripheralWarehouseAPI = "api/peripheralWarehouse";

        hostFactory.saveDeleteUpdatePeripheralWarehouseAPI = "api/peripheralWarehouse";

        hostFactory.getSaveDeleteUpdatePeripheralWarehouseAPI = getSaveDeleteUpdatePeripheralWarehouseAPIFn;

        hostFactory.getHost = getHostFn;

        hostFactory.getLoginAPI = getLoginAPIFn;

        hostFactory.getCommissionAPI = getCommissionAPIFn;

        hostFactory.postBatchAPI = postBatchAPIFn;

        hostFactory.getCatalogueBatchesByProductAPI = catalogueBatchesByProductAPIFn;

        hostFactory.postBatchesAPI = postOutBatchesAPIFn;

        function postOutBatchesAPIFn() {

            return hostFactory.outBatchesAPI;
        }

        function catalogueBatchesByProductAPIFn() {
            return hostFactory.catalogueBatchesByProductAPI;
        }

        function postBatchAPIFn() {
            return hostFactory.BatchAPI;
        }

        function getCommissionAPIFn() {

            return hostFactory.commissionAPI;
        }

        hostFactory.getAllPeripheralWarehouseAPI = getAllPeripheralWarehouseAPIFn;

        function getSaveDeleteUpdatePeripheralWarehouseAPIFn() {
            return hostFactory.saveDeleteUpdatePeripheralWarehouseAPI;
        }

        function getAllPeripheralWarehouseAPIFn() {
            return hostFactory.allPeripheralWarehouseAPI;
        }

        function getHostFn() {
            return hostFactory.host;
        }

        hostFactory.getUserAPI = getUserAPIFn;

        hostFactory.getAllCommissionsAPI = getAllCommissionsAPIFn;

        hostFactory.getAllProductsAPI = getAllProductsAPIFn;

        hostFactory.getFindProductByCategoryAndProperties = getFindProductByCategoryAndPropertiesFn;

        hostFactory.getLeafCategoriesAPI = getLeafCategoriesAPIFn;

        function getLeafCategoriesAPIFn() {
            return hostFactory.leafCategories;
        }

        function getFindProductByCategoryAndPropertiesFn(properties) {
            return hostFactory.findProductByProperties + '/' + properties;
        }

        function getSaveDeleteUpdateCommissionAPIFn() {
            return hostFactory.saveDeleteUpdateCommissionAPI;
        }

        function getAllCommissionsAPIFn() {
            return hostFactory.allCommissionsAPI;
        }

        function getAllProductsAPIFn() {
            return hostFactory.allProductsAPI;
        }

        function getHostFn() {
            return hostFactory.host;
        }


        function getLoginAPIFn() {
            return hostFactory.loginAPI;
        }

        function getUserAPIFn() {
            return hostFactory.userAPI;
        }

        return hostFactory;
    }

    return hostFactory;

}());
