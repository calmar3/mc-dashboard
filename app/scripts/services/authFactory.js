/**
 * Created by Caim03 on 29/06/17.
 */

(function() {
    'use strict';

    angular.module('mc-dashboard').factory('authFactory', authFactory);

    function authFactory($http, $cookies, hostFactory, userFactory) {
        var authFactory = {};

        authFactory.login = loginFn;
        authFactory.logout = logoutFn;
        authFactory.retrieveCookie = retrieveCookieFn;

        function loginFn(data, callback) {
            $http.post(hostFactory.getHost()+hostFactory.getLoginAPI(), data).then(function (response) {
                if (response.data.token) {
                    var cookie = $cookies.get('myCookie');
                    $cookies.putObject('myCookie', response.data);

                    $http.defaults.headers.common.Authorization = response.data.token;
                    cookie = $cookies.get('myCookie');
                    userFactory.setUser(JSON.parse(cookie).user);
                    callback(true);
                }
                else {
                    console.log("Non autorizzato");
                    callback(false);
                }
            });
        }

        function logoutFn() {
            $cookies.remove('myCookie');
            userFactory.setUser(null);
            $http.defaults.headers.common.Authorization = '';
        }

        function retrieveCookieFn() {
            var cookie = $cookies.get('myCookie');
            if (cookie === null || cookie === undefined) {
                return;
            }
            userFactory.setUser(JSON.parse(cookie).user);
        }

        return authFactory;
    }
}());

