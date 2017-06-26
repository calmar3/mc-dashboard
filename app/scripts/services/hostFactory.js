
(function() {
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

        hostFactory.productAPI = "api/product";

        hostFactory.expiringBatchesAPI = "api/batches/expiring";

        hostFactory.batchesAPI = "api/batches";

        hostFactory.externalSupplierAPI = "api/supplier";

        hostFactory.externalSuppliersAPI = "api/suppliers";

        hostFactory.getSaveDeleteUpdateCommissionAPI = getSaveDeleteUpdateCommissionAPIFn;

        hostFactory.getHost = getHostFn;

        hostFactory.getLoginAPI = getLoginAPIFn;

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

        function getLoginAPIFn() {
            return hostFactory.loginAPI;
        }

        function getUserAPIFn() {
            return hostFactory.userAPI;
        }

        return hostFactory;
    }


}());
