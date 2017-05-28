
(function() {
    'use strict';
    angular.module('mc-dashboard').factory('hostFactory', hostFactory);

    function hostFactory() {
        var hostFactory = {};

        hostFactory.host = "http://localhost:8080/";

        hostFactory.loginAPI = "api/user/login";

        hostFactory.userUpdateAPI = "api/user/update";

        hostFactory.getHost = getHostFn;

        hostFactory.getLoginAPI = getLoginAPIFn;

        hostFactory.getUserUpdateAPI = getUserUpdateAPIFn;

        function getHostFn() {
            return hostFactory.host;
        }


        function getLoginAPIFn() {
            return hostFactory.loginAPI;
        }

        function getUserUpdateAPIFn() {
            return hostFactory.userUpdateAPI;
        }

        return hostFactory;
    }


}());
