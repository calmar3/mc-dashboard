
(function() {
    'use strict';
    angular.module('mc-dashboard').factory('hostFactory', hostFactory);

    function hostFactory() {
        var hostFactory = {};

        hostFactory.host = "http://localhost:8080/";

        hostFactory.loginAPI = "api/user/login";

        hostFactory.allCommissionsAPI = "api/commissions";

        hostFactory.allProductsAPI = "api/products";

        hostFactory.saveDeleteUpdateCommissionAPI = "api/commission";

        hostFactory.findProductByProperties = "api/product/findby/category/properties";

        hostFactory.leafCategories = "api/categories/leaf";

        hostFactory.getSaveDeleteUpdateCommissionAPI = getSaveDeleteUpdateCommissionAPIFn;

        hostFactory.getHost = getHostFn;

        hostFactory.getLoginAPI = getLoginAPIFn;

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

        return hostFactory;
    }


}());
