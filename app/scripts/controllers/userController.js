(function () {
    'use strict';

    var UserCtrl = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', function ($scope, $rootScope, $compile, $state, $stateParams,$http) {



        var ctrl = this;





        ctrl.collapsemenu = false;

        ctrl.openmenu = false;

        ctrl.state = $state;





        console.log("userctrl");

        ctrl.menulist = [
            { label: "Catalogo Prodotti", state: "Catalogo Prodotti", icon: "fa fa-television" }


        ];

    }];



    UserCtrl.$inject = ['$scope', '$rootScope', '$compile'];

    angular.module('mc-dashboard').controller('UserCtrl', UserCtrl);

}());
