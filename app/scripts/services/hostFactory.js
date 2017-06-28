
(function() {
    'use strict';
    angular.module('mc-dashboard').factory('hostFactory', hostFactory);

    function hostFactory() {
        var hostFactory = {};

        hostFactory.host = "http://localhost:8080/";

        hostFactory.loginAPI = "api/user/login";

        hostFactory.productAPI = "api/product";

        hostFactory.catalogAPI = "api/catalog";

        hostFactory.categoryAPI = "api/category";

        //API per prendere le categorie in fase di aggiunta nuovo articolo
        hostFactory.categoriesAPI = "api/categories";

        hostFactory.productsAPI = "api/products";

        hostFactory.otherPropertyAPI = "api/property";

        hostFactory.getProductsAPI = getProductsAPIFn;

        hostFactory.getCategoriesAPI = getCategoriesAPIFn;

        hostFactory.getCategoryAPI = getCategoryAPIFn;

        hostFactory.getHost = getHostFn;

        hostFactory.getLoginAPI = getLoginAPIFn;

        // API per il prodotto per prenderlo dal database
        hostFactory.getProductAPI = getProductAPIFn;

        hostFactory.getCatalogAPI = getCatalogAPIFn;

        hostFactory.getOtherPropertyAPI = getOtherPropertyAPIFn;

        function getOtherPropertyAPIFn() {
            return hostFactory.otherPropertyAPI;

        }

        function getProductsAPIFn() {
            return hostFactory.productsAPI;

        }

        function getCategoriesAPIFn() {
            return hostFactory.categoriesAPI;

        }

        function getCategoryAPIFn() {
            return hostFactory.categoryAPI;
        }


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
