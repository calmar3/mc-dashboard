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

        hostFactory.findProductByPropertiesAPI = "api/product/findby/category/properties";

      hostFactory.leafCategories = "api/categories/leaf";

        hostFactory.deliveryNoteAPI = "api/delivery";

        hostFactory.productAPI = "api/product";

        hostFactory.expiringBatchesAPI = "api/batches/expiring";

        hostFactory.batchesAPI = "api/batches";

        hostFactory.externalSupplierAPI = "api/supplier";

        hostFactory.externalSuppliersAPI = "api/suppliers";

        hostFactory.commissionAPI = "/api/commissions";

        hostFactory.BatchAPI = "api/batch/saveBatches";

        hostFactory.catalogueBatchesByProductAPI = "api/batch/getbatchesbyprod";

        hostFactory.catalogueBatchesAPI = "api/batch/getallbatches";

      hostFactory.outBatchesAPI = "api/batch/sendBatches";


        /**
         * che cambia tra le ultime due?
         * @type {string}
         */
        hostFactory.allPeripheralWarehouseAPI = "api/peripheralWarehouse";

        hostFactory.saveDeleteUpdatePeripheralWarehouseAPI = "api/peripheralWarehouse";

        hostFactory.getSaveDeleteUpdateCommissionAPI = getSaveDeleteUpdateCommissionAPIFn;

        hostFactory.getHost = getHostFn;

        hostFactory.getSaveDeleteUpdatePeripheralWarehouseAPI = getSaveDeleteUpdatePeripheralWarehouseAPIFn;

        hostFactory.getHost = getHostFn;

        hostFactory.getLoginAPI = getLoginAPIFn;

        hostFactory.getCommissionAPI = getCommissionAPIFn;

        hostFactory.postBatchAPI = postBatchAPIFn;

        hostFactory.getCatalogueBatchesByProductAPI = catalogueBatchesByProductAPIFn;

      hostFactory.getCatalogueBatchesAPI = catalogueBatchesAPIFn;


      hostFactory.postBatchesAPI = postOutBatchesAPIFn;

        hostFactory.getAllPeripheralWarehouseAPI = getAllPeripheralWarehouseAPIFn;

        hostFactory.getSaveDeleteUpdateDeliveryAPI = getSaveDeleteUpdateDeliveryAPIFn;

        hostFactory.getUserAPI = getUserAPIFn;

        hostFactory.getAllCommissionsAPI = getAllCommissionsAPIFn;

        hostFactory.getAllProductsAPI = getAllProductsAPIFn;

        hostFactory.getFindProductByCategoryAndPropertiesAPI = getFindProductByCategoryAndPropertiesAPIFn;

        hostFactory.getLeafCategoriesAPI = getLeafCategoriesAPIFn;

        hostFactory.getProductAPI = getProductAPIFn;

        hostFactory.getExpiringBatchesAPI = getExpiringBatchesAPIFn;

        hostFactory.getBatchesAPI = getBatchesAPIFn;

        hostFactory.getExternalSupplierAPI = getExternalSupplierAPIFn;

        hostFactory.getExternalSuppliersAPI = getExternalSuppliersAPIFn;

        function postOutBatchesAPIFn() {

            return hostFactory.outBatchesAPI;
        }

        function catalogueBatchesByProductAPIFn() {
            return hostFactory.catalogueBatchesByProductAPI;
        }

      function catalogueBatchesAPIFn() {
        return hostFactory.catalogueBatchesAPI;
      }

        function postBatchAPIFn() {
            return hostFactory.BatchAPI;
        }

        function getCommissionAPIFn() {

            return hostFactory.commissionAPI;
        }

        function getSaveDeleteUpdatePeripheralWarehouseAPIFn() {
            return hostFactory.saveDeleteUpdatePeripheralWarehouseAPI;
        }

        function getAllPeripheralWarehouseAPIFn() {
            return hostFactory.allPeripheralWarehouseAPI;
        }


        function getExternalSupplierAPIFn() {
            return hostFactory.externalSupplierAPI;
        }

        function getExternalSuppliersAPIFn() {
            return hostFactory.externalSuppliersAPI;
        }

        function getBatchesAPIFn() {
            return hostFactory.batchesAPI;
        }

        function getExpiringBatchesAPIFn() {
            return hostFactory.expiringBatchesAPI;
        }

        function getProductAPIFn() {
            return hostFactory.productAPI;
        }

        function getLeafCategoriesAPIFn() {
            return hostFactory.leafCategories;
        }

        function getFindProductByCategoryAndPropertiesAPIFn(properties) {
            return hostFactory.findProductByPropertiesAPI + '/' + properties;
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

        function getSaveDeleteUpdateDeliveryAPIFn() {
            return hostFactory.deliveryNoteAPI;
        }


        function getLoginAPIFn() {
            return hostFactory.loginAPI;
        }

        function getUserAPIFn() {
            return hostFactory.userAPI;
        }

        return hostFactory;
    }


}());
