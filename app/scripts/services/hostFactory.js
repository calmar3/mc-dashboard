(function() {
  'use strict';
  angular.module('mc-dashboard').factory('hostFactory', hostFactory);

  function hostFactory() {
    var hostFactory = {};

    hostFactory.host = "http://localhost:8080/";

    hostFactory.loginAPI = "api/user/login";

    hostFactory.allPeripheralWarehouseAPI = "api/peripheralWarehouse";

    hostFactory.saveDeleteUpdatePeripheralWarehouseAPI = "api/peripheralWarehouse";

    hostFactory.getSaveDeleteUpdatePeripheralWarehouseAPI = getSaveDeleteUpdatePeripheralWarehouseAPIFn;

    hostFactory.getHost = getHostFn;

    hostFactory.getLoginAPI = getLoginAPIFn;

    hostFactory.getAllPeripheralWarehouseAPI = getAllPeripheralWarehouseAPIFn;

    function getSaveDeleteUpdatePeripheralWarehouseAPIFn() {
      return hostFactory.saveDeleteUpdatePeripheralWarehouseAPI;
    }

    function getAllPeripheralWarehouseAPIFn() {
      return hostFactory.allPeripheralWarehouseAPI;
    }

    function getHostFn() {
      return hostFactory.host;
    }


    function getLoginAPIFn() {
      return hostFactory.loginAPI;
    }

    return hostFactory;
  }


}());
