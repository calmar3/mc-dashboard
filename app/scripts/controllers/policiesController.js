(function () {
    'use strict';

    var PoliciesCtrl = ['$scope', '$rootScope', '$compile','$http','hostFactory', function ($scope, $rootScope, $compile,$http,hostFactory) {

        var ctrl = this;

        ctrl.customizations = ["Prodotti","Fornitori","Promo","Proprieta"];

        ctrl.selectedTab = 0;

        ctrl.entries = [10,50,100,200];

        ctrl.searchText="";

        ctrl.show= ctrl.entries[0];

        ctrl.switchTab = switchTabFn;

        ctrl.pagingAction = pagingActionFn;

        ctrl.products = [];

        ctrl.getProducts = getProductsFn;

        ctrl.updateProduct = updateProductFn;

        ctrl.updateBatches = updateBatchesFn;

        ctrl.loadCategories = loadCategoriesFn;

        ctrl.getExpiringBatches = getExpiringBatchesFn;

        ctrl.cleanChargeView = cleanChargeViewFn;

        ctrl.searchFilter = searchFilterFn;

        ctrl.loadExternalSuppliers = loadExternalSuppliersFn;

        ctrl.cleanSupplier = cleanSupplierFn;

        ctrl.description = "";

        ctrl.backupProducts = [];

        ctrl.expiringBatches = [];

        ctrl.shift = 0;

        ctrl.currentPage=1;

        ctrl.loadCategories();

        ctrl.cleanSupplier();

        ctrl.colours = ["bg-blue","bg-red","bg-green","bg-yellow"];

        ctrl.panelColours = [];

        ctrl.buttonColours = [];

        ctrl.uploadSupplier = uploadSupplierFn;

        ctrl.selectSupplier = selectSupplierFn;

        ctrl.deleteSupplier = deleteSupplierFn;

        ctrl.addPack = addPackFn;

        ctrl.removePack = removePackFn;

        ctrl.addProperty = addPropertyFn;

        ctrl.loadCustomProperties = loadCustomPropertiesFn;

        ctrl.properties = [];

        ctrl.deleteProperty = deletePropertyFn;

        function deletePropertyFn(index) {
            if (ctrl.properties[index] !== null && ctrl.properties[index] !== undefined
                && ctrl.properties[index].length > 0 ){
                $http.delete(hostFactory.getHost()+hostFactory.getOtherPropertyAPI()+'/'+ctrl.properties[index]).then(function (res) {
                    ctrl.success = true;
                    ctrl.message = "eliminata";
                    setTimeout(function () {
                        ctrl.success = null;
                        ctrl.property = "";
                        ctrl.message = "";
                        ctrl.loadCustomProperties();
                        $scope.$apply();
                    },2000);
                }).catch(function (error) {
                    console.log(error);
                    ctrl.error = true;
                    ctrl.message = "NON eliminata";
                    setTimeout(function () {
                        ctrl.error = null;
                        ctrl.message = "";
                        $scope.$apply();
                    },2000);

                });
            }

        }

        function addPropertyFn() {
            if (ctrl.property === null || ctrl.property === undefined || ctrl.property.length < 1){
                alert("Proprietà non valida");
            }
            else{
                var data = {
                    "id":ctrl.property,
                    "productlist":null
                };
                $http.post(hostFactory.getHost()+hostFactory.getOtherPropertyAPI(),data).then(function (res) {
                    ctrl.success = true;
                    ctrl.message = "aggiunta";
                    setTimeout(function () {
                        ctrl.success = null;
                        ctrl.property = "";
                        ctrl.message = "";
                        ctrl.loadCustomProperties();
                        $scope.$apply();
                    },2000);
                }).catch(function (error) {
                    console.log(error);
                    ctrl.error = true;
                    ctrl.message = "NON aggiunta";
                    setTimeout(function () {
                        ctrl.error = null;
                        ctrl.message = "";
                        ctrl.cleanSupplier();
                        $scope.$apply();
                    },2000);

                });
            }
        }

        function loadCustomPropertiesFn() {
            $http.get(hostFactory.getHost()+hostFactory.getOtherPropertyAPI()).then(function (response) {
                ctrl.properties = [];
                ctrl.buttonColours = [];
                for (var i = 0 ; i < response.data.length ; i++){
                    ctrl.properties.push(response.data[i].id);
                    ctrl.buttonColours.push(ctrl.colours[ Math.floor(Math.random()*(3-0+1)+0)]);
                }


            }).catch(function (error) {
                console.log(error);
            });
        }

        function removePackFn(index) {
            ctrl.product.pack.splice(index,1);
        }
        function addPackFn() {
            if (ctrl.product && ctrl.product.pack && ctrl.pack && ctrl.product.pack.indexOf(ctrl.pack)===-1){
                ctrl.product.pack.push(ctrl.pack);
                ctrl.pack = null;
            }
        }

        function uploadSupplierFn() {
            if (ctrl.modifySupplier)
                updateExternalSupplier();
            else
                saveExternalSupplier();
        }

        function deleteSupplierFn() {
            $http.delete(hostFactory.getHost()+hostFactory.getExternalSupplierAPI()+'/'+ctrl.newExternalSupplier.id).then(function (res) {
                ctrl.success = true;
                setTimeout(function () {
                    ctrl.success = null;
                    ctrl.cleanSupplier();
                    ctrl.loadExternalSuppliers();
                    $scope.$apply();
                },2000);
            }).catch(function (error) {
                console.log(error);
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = null;
                    ctrl.cleanSupplier();
                    $scope.$apply();
                },2000);

            });
        }

        function selectSupplierFn(index) {
            ctrl.newExternalSupplier = ctrl.externalSuppliers[index];
            ctrl.modifySupplier = true;
        }

        function saveExternalSupplier() {
            if (ctrl.newExternalSupplier.name === "" || ctrl.newExternalSupplier.vat === "" || ctrl.newExternalSupplier.address==="" ||
            ctrl.newExternalSupplier.mail==="" ){
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = null;
                    $scope.$apply();
                },2000);
                return;
            }
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd = '0'+dd
            }

            if(mm<10) {
                mm = '0'+mm
            }

            ctrl.newExternalSupplier.partnership = dd + '/' + mm + '/' + yyyy;
            $http.post(hostFactory.getHost()+hostFactory.getExternalSupplierAPI(),ctrl.newExternalSupplier).then(function (res) {
                ctrl.success = true;
                setTimeout(function () {
                    ctrl.success = null;
                    ctrl.cleanSupplier();
                    ctrl.loadExternalSuppliers();
                    $scope.$apply();
                },2000);
            }).catch(function (error) {
                console.log(error);
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = null;
                    ctrl.cleanSupplier();
                    $scope.$apply();
                },2000);

            });
        }

        function updateExternalSupplier() {
            if (ctrl.newExternalSupplier.name === "" || ctrl.newExternalSupplier.vat === "" || ctrl.newExternalSupplier.address==="" ||
                ctrl.newExternalSupplier.mail==="" || ctrl.newExternalSupplier.partnership === ""){
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = null;
                    $scope.$apply();
                },2000);
                return;
            }

            $http.put(hostFactory.getHost()+hostFactory.getExternalSupplierAPI(),ctrl.newExternalSupplier).then(function (res) {
                ctrl.success = true;
                setTimeout(function () {
                    ctrl.success = null;
                    ctrl.cleanSupplier();
                    ctrl.loadExternalSuppliers();
                    $scope.$apply();
                },2000);
            }).catch(function (error) {
                console.log(error);
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = null;
                    ctrl.cleanSupplier();
                    $scope.$apply();
                },2000);

            });
        }

        function updateBatchesFn() {
            $http.put(hostFactory.getHost()+hostFactory.getBatchesAPI(),ctrl.expBatches).then(function (res) {
                ctrl.success = true;
                setTimeout(function () {
                    ctrl.success = null;
                    cleanPagination();
                    ctrl.getExpiringBatches();
                    $scope.$apply();
                },2000);
            }).catch(function (error) {
                console.log(error);
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = null;
                    cleanPagination();
                    $scope.$apply();
                },2000)

            });
        }

        function updateProductFn() {
            if (ctrl.charge && ctrl.charge >= 0.01 && ctrl.charge <= 1 && ctrl.product)
                ctrl.product.charge = ctrl.charge;
            $http.put(hostFactory.getHost()+hostFactory.getProductAPI(),ctrl.product).then(function (res) {
                ctrl.success = true;
                setTimeout(function () {
                    ctrl.success = null;
                    ctrl.cleanChargeView();
                    $scope.$apply();
                },2000);
            }).catch(function (error) {
                console.log(error);
                ctrl.error = true;
                setTimeout(function () {
                    ctrl.error = null;
                    ctrl.cleanChargeView();
                    $scope.$apply();
                },2000)

            });
            ctrl.charge = null;
        }

        function cleanPagination() {
            ctrl.shift = 0;
            ctrl.currentPage = 1;
            ctrl.pagingAction(1,ctrl.show);
        }
        function switchTabFn(index) {
            ctrl.cleanChargeView();
            ctrl.show = ctrl.entries[0];
            cleanPagination();
            ctrl.cleanSupplier();
            ctrl.selectedTab = index;
            ctrl.property = "";
        }

        function loadCategoriesFn() {
            $http.get(hostFactory.getHost()+hostFactory.getLeafCategoriesAPI()).then(function (response) {
                ctrl.categories = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        }

        function loadExternalSuppliersFn() {
            $http.get(hostFactory.getHost()+hostFactory.getExternalSuppliersAPI()).then(function (response) {
                ctrl.externalSuppliers = response.data;
                ctrl.panelColours = [];
                for (var i = 0 ; i < ctrl.externalSuppliers.length ; i++)
                    ctrl.panelColours.push(ctrl.colours[ Math.floor(Math.random()*(3-0+1)+0)]);
            }).catch(function (error) {
                console.log(error);
            });
        }


        function getProductsFn(search) {
            if (ctrl.description.length > search.length)
                ctrl.products =  JSON.parse(JSON.stringify(ctrl.backupProducts));
            ctrl.description = search;
            if (angular.isDefined(ctrl.category) && ctrl.category.length > 0 ){
                if (search!==null && search!==undefined && search.length==3){
                    var param = ctrl.category + " - " + search;
                    $http.get(hostFactory.getHost()+hostFactory.getFindProductByCategoryAndPropertiesAPI(param)).then(function (res) {
                        ctrl.products = JSON.parse(JSON.stringify(res.data));
                        ctrl.backupProducts =  JSON.parse(JSON.stringify(ctrl.products));
                    }).catch(function (error) {
                        console.log(error);
                        ctrl.products = [];
                    });
                }
                else if (search!==null && search!==undefined && search.length<3)
                    ctrl.products=[];
            }
            else
                return;
        }

        function cleanChargeViewFn() {
            ctrl.category = "";
            ctrl.description = "";
            ctrl.backupProducts = [];
            ctrl.product = null;
        }

        function getExpiringBatchesFn() {
            $http.get(hostFactory.getHost()+hostFactory.getExpiringBatchesAPI()).then(function (res) {
                ctrl.expiringBatches = JSON.parse(JSON.stringify(res.data));
                ctrl.expBatches = JSON.parse(JSON.stringify(ctrl.expiringBatches));
            }).catch(function (error) {
                console.log(error);
            });
        }

        function searchFilterFn(item) {
            if (ctrl.searchText && !ctrl.searchText !== '') {
                if (item.product.name.toString().toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
                    return true;
                }
                else if (item.product.stockist.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
                    return true;
                }
                else if(item.product.description.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1){
                    return true;
                }
                else if(item.sale && item.sale.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1){
                    return true;
                }
                else {
                    return false;
                }
            }else{
                return true;
            }
        }

        function pagingActionFn( page, pageSize) {
            ctrl.shift = Math.floor(pageSize*(page-1));
            ctrl.expBatches = JSON.parse(JSON.stringify(ctrl.expiringBatches));
            ctrl.expBatches = ctrl.expBatches.splice(ctrl.shift,pageSize);
            ctrl.currentPage = page;
        }

        function cleanSupplierFn() {
            ctrl.newExternalSupplier = {
                name:"",
                vat:"",
                partnership:"",
                address:"",
                mail:""
            };
            ctrl.modifySupplier = false;
        }


    }];

    PoliciesCtrl.$inject = ['$scope', '$rootScope', '$compile','$http','hostFactory'];

    angular.module('mc-dashboard').controller('PoliciesCtrl', PoliciesCtrl);

}());
