/**
 * controller related to index.html
 * Contains data to show in this view
 */
(function () {
  'use strict';

    var NavbarCtrl = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', function ($scope, $rootScope, $compile, $state, $stateParams,$http) {

        var ctrl = this;





        ctrl.collapsemenu = false;

        ctrl.openmenu = false;

        ctrl.state = $state;

        ctrl.switchmenu = switchmenuFn;

        ctrl.go = goFn;

        ctrl.menulist = [
            { label: "Catalogo Prodotti", state: "Catalogo Prodotti", icon: "fa fa-database" }


        ];


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


        var w = $(window).height();
        var mh = parseInt($('#header').css('height'));
        ctrl.minheight = w - mh;

    }];

    NavbarCtrl.$inject = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http'];

    angular.module('mc-dashboard').controller('NavbarCtrl', NavbarCtrl);
} ());
