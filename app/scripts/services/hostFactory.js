
(function() {
    'use strict';
    angular.module('mc-dashboard').factory('hostFactory', hostFactory);

    function hostFactory() {
        var hostFactory = {};

        hostFactory.host = "http://localhost:8080/";

        hostFactory.loginAPI = "api/user/login";

        hostFactory.productAPI = "api/product";

        hostFactory.catalogAPI = "api/catalog";


        hostFactory.getHost = getHostFn;

        hostFactory.getLoginAPI = getLoginAPIFn;

        // API per il prodotto per prenderlo dal database
        hostFactory.getProductAPI = getProductAPIFn;

        hostFactory.getCatalogAPI = getCatalogAPIFn();
        


        function getCatalogAPIFn() {
            return hostFactory.catalogAPI;

        }


        function getHostFn() {
            return hostFactory.host;
        }


        function getLoginAPIFn() {
            return hostFactory.loginAPI;
        }


        function getProductAPIFn() {
            return hostFactory.productAPI;
        }


        return hostFactory;
    }


}());
