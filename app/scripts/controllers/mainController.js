(function () {
  'use strict';

  var MainCtrl = ['$scope', '$rootScope', '$compile', 'authFactory', function ($scope, $rootScope, $compile, authFactory) {

      if (authFactory.authorize() === false) {
          return;
      }

      var ctrl = this;
  }];

  MainCtrl.$inject = ['$scope', '$rootScope', '$compile', 'authFactory'];

  angular.module('mc-dashboard').controller('MainCtrl', MainCtrl);

}());