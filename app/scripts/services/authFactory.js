/**
 * Created by Caim03 on 29/06/17.
 */

(function() {
    'use strict';

    angular.module('mc-dashboard').factory('authFactory', authFactory);

    function authFactory($http, $cookies, $state, hostFactory, userFactory) {
        var authFactory = {};

        authFactory.login = loginFn;
        authFactory.logout = logoutFn;
        authFactory.retrieveCookie = retrieveCookieFn;
        authFactory.authorize = authorizeFn;

        function loginFn(data, callback) {
            $http.post(hostFactory.getHost()+hostFactory.getLoginAPI(), data).then(function (response) {
                if (response.data.token) {
                    var cookie = $cookies.get('myCookie');
                    $cookies.putObject('myCookie', response.data);
                    $http.defaults.headers.common.token = response.data.token;
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
            userFactory.menu = [];
            $http.defaults.headers.common.token = '';
        }

        function retrieveCookieFn() {
            var cookie = $cookies.get('myCookie');
            if (cookie === null || cookie === undefined) {
                return;
            }
            $http.defaults.headers.common.token = JSON.parse(cookie).token;
            userFactory.setUser(JSON.parse(cookie).user);
        }

        function authorizeFn() {
            var cookie = $cookies.get('myCookie');
            if ($state.current.name === 'Home')
                return true;

            if (cookie === null || cookie === undefined) {
                $state.go('Login');
                return false;
            }

            var role = JSON.parse(cookie).user.role.toString();


            /* Se vuoto tutti possono accedere alla pagina */
            if ($state.current.data.roles.length === 0) {
                return true;
            }

            if ($state.current.data.roles.indexOf(role) === -1) {
                $state.go('Home');
                return false;
            }

            return true;
        }

        return authFactory;
    }
}());

