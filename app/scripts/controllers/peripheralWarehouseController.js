(function () {
  'use strict';

  var PeripheralWarehouseCtrl = ['$scope', '$rootScope', '$compile','$http','hostFactory', function ($scope, $rootScope, $compile,$http,hostFactory) {

    var ctrl = this;

    ctrl.peripheralWarehouse = null;

    ctrl.clicked = false;

    ctrl.searchText = "";

    ctrl.mode = null;

    ctrl.selected = null;

    ctrl.searchFilter = searchFilterFn;

    ctrl.switchMode = switchModeFn;

    ctrl.select = selectFn;

    ctrl.deletePeripheralWarehouse = deletePeripheralWarehouseFn;

    ctrl.savePeripheralWarehouse = savePeripheralWarehouseFn;

    ctrl.updatePeripheralWarehouse= updatePeripheralWarehouseFn;

    ctrl.modify = null;

    ctrl.success = false;

    ctrl.error = false;

    ctrl.newPeripheralWarehouse = {
      id:"",
      name:"",
      address:"",
      phone:"",
      serverAddress:"",
      warehouseManager:"",
      employeesNumbers:"",
      pIVA:""
    };


    loadPeripheralWarehouse();

    function savePeripheralWarehouseFn() {
      var name = JSON.parse(JSON.stringify(ctrl.newPeripheralWarehouse.name));
      var id = JSON.parse(JSON.stringify(ctrl.newPeripheralWarehouse.id));
      var serverAddress = JSON.parse(JSON.stringify(ctrl.newPeripheralWarehouse.serverAddress));

      if (name.length === 0 || id.length === 0 || serverAddress.length === 0){
        ctrl.error = true;
        setTimeout(function () {
          ctrl.error = false;
          $scope.$apply();
        },1500);
        return;
      }
      var peripheralWarehouse = JSON.parse(JSON.stringify(ctrl.newPeripheralWarehouse));
      var data = {
        "peripheralWarehouse":peripheralWarehouse
      };

      $http.post(hostFactory.getHost()+hostFactory.getSaveDeleteUpdatePeripheralWarehouseAPI(),data).then(function (response) {
        loadPeripheralWarehouse();
        ctrl.success = true;
        setTimeout(function () {
          ctrl.success = false;
          ctrl.switchMode(null);
          $scope.$apply();
        },1500);

      }).catch(function (error) {
        ctrl.error = true;
        setTimeout(function () {
          ctrl.error = false;
          $scope.$apply();
        },1500);
      });
    }

    function updatePeripheralWarehouseFn() {
      var peripheralWarehouse = JSON.parse(JSON.stringify(ctrl.selected.peripheralWarehouse));
      var data = {
        "peripheralWarehouse":peripheralWarehouse
      };

      $http.put(hostFactory.getHost()+hostFactory.getSaveDeleteUpdatePeripheralWarehouseAPI(),data).then(function (response) {
        loadPeripheralWarehouse();
        ctrl.success = true;
        setTimeout(function () {
          ctrl.success = false;
          ctrl.switchMode(null);
          $scope.$apply();
        },1500);

      }).catch(function (error) {
        ctrl.error = true;
        setTimeout(function () {
          ctrl.error = false;
          $scope.$apply();
        },1500);
      });
    }


    function deletePeripheralWarehouseFn() {
      $http.delete(hostFactory.getHost()+hostFactory.getSaveDeleteUpdatePeripheralWarehouseAPI()+'/' + ctrl.selected.peripheralWarehouse.id).then(function (response) {
        ctrl.success = true;
        loadPeripheralWarehouse();
        setTimeout(function () {
          ctrl.success = false;
          ctrl.switchMode(null);
          $scope.$apply();
        },1000);
      }).catch(function (error) {
        console.log(error);
        ctrl.error = true;
        setTimeout(function () {
          ctrl.error = false;
          ctrl.switchMode(null);
          $scope.$apply();
        },1000);
      });
    }

    function selectFn(peripheralWarehouse) {
      ctrl.clicked = true;
      if (ctrl.selected === peripheralWarehouse){
        ctrl.selected = null;
      }
      else if (ctrl.selected === null){
        ctrl.selected = peripheralWarehouse;
      }
      else{
        ctrl.selected = peripheralWarehouse;
      }
      console.log(ctrl.selected.peripheralWarehouse.id)
    }


    function switchModeFn(mode) {

      ctrl.mode = mode;
      ctrl.modify = false;
      if (!ctrl.mode){
        loadPeripheralWarehouse();
        ctrl.selected = null;
        ctrl.newPeripheralWarehouse = {
          id:"",
          name:"",
          address:"",
          phone:"",
          serverAddress:"",
          warehouseManager:"",
          employeesNumbers:"",
          pIVA:""
        };
      }
    }

    function searchFilterFn(item) {
     if (ctrl.searchText && ctrl.searchText !== '') {
        if (item.peripheralWarehouse.id.toString().toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
          return true;
        }
        else if (item.peripheralWarehouse.name.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
          return true;
        }
        else if(item.peripheralWarehouse.address.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1){
          return true;
        }
        else {
          return false;
        }
      }else{
        return true;
      }
    }

    function loadPeripheralWarehouse() {
      $http.get(hostFactory.getHost()+hostFactory.getAllPeripheralWarehouseAPI()).then(function (response) {
        ctrl.peripheralWarehouse = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    }

  }];

  PeripheralWarehouseCtrl.$inject = ['$scope', '$rootScope', '$compile','$http','hostFactory'];

  angular.module('mc-dashboard').controller('PeripheralWarehouseCtrl', PeripheralWarehouseCtrl);

}());
