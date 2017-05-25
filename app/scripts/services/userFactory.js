
(function() {
    'use strict';
    angular.module('mc-dashboard').factory('userFactory', userFactory);

    function userFactory() {
        var userFactory = {};

        userFactory.user = null;

        userFactory.setUser = setUserFn;

        userFactory.getUser = getUserFn;

        function getUserFn() {
            return userFactory.user;
        }

        function setUserFn(user) {
            if (user!==null && user!==undefined){
                userFactory.user = user;
            }
        }






        return userFactory;
    }


}());

