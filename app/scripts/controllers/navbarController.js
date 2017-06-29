/**
 * controller related to index.html
 * Contains data to show in this view
 */
(function () {
  'use strict';

    var NavbarCtrl = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', '$cookies', 'userFactory', 'authFactory', function ($scope, $rootScope, $compile, $state, $stateParams,$http, $cookies, userFactory, authFactory) {

        var ctrl = this;

        ctrl.collapsemenu = false;

        ctrl.openmenu = false;

        ctrl.state = $state;

        ctrl.switchmenu = switchmenuFn;

        ctrl.go = goFn;

        ctrl.user = null;

        ctrl.menulist = [

        ];

        ctrl.signout = signoutFn;

        ctrl.retrieveCookie = retrieveCookieFn;

        function retrieveCookieFn() {
            authFactory.retrieveCookie();
        }

        $scope.$watch(function () {
            return userFactory.user;
        }, function (res) {
            ctrl.user = userFactory.getUser();
        });

        $scope.$watch(function () {
            return userFactory.menu;
        }, function (res) {
           ctrl.menulist = userFactory.getMenu();
        });

        function goFn(location) {
            $state.go(location);
        }

        function switchmenuFn() {

            if (parseInt($(window).width()) > 752) {
                ctrl.collapsemenu = !ctrl.collapsemenu;

            } else {

                ctrl.openmenu = !ctrl.openmenu;
            }
        }

        function signoutFn() {
            authFactory.logout();
            ctrl.user = null;
            $state.go('Login');
        }


        var w = $(window).height();
        var mh = parseInt($('#header').css('height'));
        ctrl.minheight = w - mh;

    }];

    NavbarCtrl.$inject = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', '$cookies', 'userFactory', 'authFactory'];

    angular.module('mc-dashboard').controller('NavbarCtrl', NavbarCtrl);
} ());
