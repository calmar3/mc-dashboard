/**
 * Created by mariusdragosionita on 26/05/17.
 */
(function () {
    'use strict';

    var ProductCtrl = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', 'hostFactory', function ($scope, $rootScope, $compile, $state, $stateParams, $http, hostFactory) {

        var ctrl = this;

        ctrl.product = null;
        ctrl.add = false;
        ctrl.modify = false;
        ctrl.mode = null;
        ctrl.changedProperty = null;

        ctrl.otherProperty = [];
        ctrl.selectedProperties = [];

        ctrl.go = goFn;
        ctrl.switchMode = switchModeFn;

        ctrl.addProduct = addProductFn;
        ctrl.updateProduct = updateProductFn;
        ctrl.eliminateProduct = eliminateProductFn;

        ctrl.addProperty = addPropertyFn;
        ctrl.deleteProperty = deletePropertyFn;

        ctrl.changeProductProperty = changeProductPropertyFn;


        ctrl.changeOtherPropertiesStatus = changeOtherPropertiesStatusFn;

        //quando faccio update di un prodotto e voglio aggiungere nuove proprietà indipendenti (oltre alle eventuali già presenti)
        function changeOtherPropertiesStatusFn(selectedProperty) {


            console.log(ctrl.product.propertylist);

            var idx = -1;

            ctrl.product.propertylist.forEach(function (item) {

                if(item.id === selectedProperty.id)
                    idx = ctrl.product.propertylist.indexOf(item);

            })


            if(idx>-1)
                ctrl.product.propertylist.splice(idx,1);
            else
                ctrl.product.propertylist.push(selectedProperty);

            console.log(ctrl.product.propertylist);


            /*if (selectedProperty !== null && selectedProperty !== undefined && selectedProperty.length !== 0) {
                //console.log(ctrl.product.propertylist);
                if (ctrl.product.propertylist[0] === undefined)
                    ctrl.product.propertylist[0] = selectedProperty;

                else {

                    for (var i = 0; i < ctrl.product.propertylist.length; i++) {
                        if (ctrl.product.propertylist[i].id === selectedProperty)
                            break;

                        ctrl.product.propertylist.push(selectedProperty);
                        break;

                    }
                }
            }*/
            //console.log(ctrl.product.propertylist)
        }


        /* ctrl.addOtherProperties = function addOtherPropertiesFn(x) {
         //console.log(x.id);
         //console.log(ctrl.product);
         //console.log(ctrl.product.propertylist);

         if (ctrl.product.propertylist === undefined || ctrl.product.propertylist === null) {
         ctrl.product.propertylist = [];
         ctrl.product.propertylist.push(x);
         //console.log(ctrl.product.propertylist);
         }
         if (ctrl.product.propertylist !== undefined || ctrl.product.propertylist !== null) {
         console.log(ctrl.product.propertylist);

         for (var i; i < ctrl.product.propertylist.length; i++) {
         console.log(ctrl.product.propertylist);
         console.log("pluto");

         if (x.id != ctrl.product.propertylist[i].id) {
         ctrl.product.propertylist.push(x);
         console.log("pippo");
         }

         }

         }*/

        //console.log(ctrl.otherProperty);
        //console.log(ctrl.selectedProperties);




        ctrl.eliminateProperty = eliminatePropertyFn;

        ctrl.createSelectedProperty = createSelectedPropertyFn;

        var found = false;

        function createSelectedPropertyFn() {
            for (var i = 0 ; i < ctrl.otherProperty.length ; i++) {
                for (var j = 0; j < ctrl.product.propertylist.length; j++) {
                    if (ctrl.otherProperty[i].id === (ctrl.product.propertylist[j].id)) {
                        ctrl.selectedProperties.push(true);
                        //console.log(ctrl.otherProperty[i].id);
                        //console.log(ctrl.product.propertylist[j].id);
                        //console.log(ctrl.selectedProperties);
                        found = true;
                    }
                }
                if (found === false) {
                    for (var j = 0; j < ctrl.product.propertylist.length; j++) {
                        if (ctrl.otherProperty[i].id !== (ctrl.product.propertylist[j].id)) {
                            ctrl.selectedProperties.push(false);
                            break;
                        }
                    }
                }
                found = false;
            }
            console.log(ctrl.selectedProperties);
        }

        function eliminatePropertyFn(index) {
            console.log(ctrl.selectedProperties[index]);
            if (ctrl.product.propertylist[index] !== null || ctrl.product.propertylist[index] !== undefined || ctrl.product.propertylist[index].length !== 0)
                console.log("ciao");
        }

        //richiesta delle proprietà indipendenti che possono essere attribuite ai prodotti
        ctrl.getOtherProperty = function otherPropertyFn() {

            $http.get((hostFactory.getHost() + hostFactory.getOtherPropertyAPI())).then(function (response) {
                ctrl.otherProperty = response.data;
                console.log(ctrl.otherProperty);
                ctrl.createSelectedProperty();
            }).catch(function (error) {
                console.log(error);
            });
        }


        //quando creo un nuovo prodotto mi salvo tutte le proprietà obbligatorie nell'array productProperties
        function changeProductPropertyFn(index,key) {

            if (ctrl.product === null || ctrl.product === undefined)
                ctrl.product = {
                    properties:[]
                };

            if (ctrl.product.properties === null || ctrl.product.properties === undefined)
                ctrl.product.properties = [];

            if (ctrl.product.properties[index] === null || ctrl.product.properties[index] === undefined || ctrl.product.properties.indexOf(ctrl.product.properties[index]) !== -1)
                return;

            else{
                if (ctrl.changedProperty === null || ctrl.changedProperty === undefined)
                    return;

                else {
                    if (ctrl.changedProperty === ctrl.product.properties[index])
                        return;

                    else
                        ctrl.product.properties[index] = ctrl.changedProperty;

                }

            }

            console.log(ctrl.product.properties);

        }



        function goFn(state){
            $state.go("Catalogo Prodotti");
        }

        function switchModeFn(mode) {
            ctrl.mode = mode;
        }



        function addProductFn() {
            ctrl.add = true;
            ctrl.product = null;
        }

        if ($stateParams.product!==null){
            ctrl.product = $stateParams.product;
            ctrl.modify = true;
            //console.log(ctrl.product);
            ctrl.getOtherProperty();

        }

        //funzione che aggiorna i dati relativi a un prodotto selezionato
        function updateProductFn() {
            if (ctrl.product === null)
                return;

            if (ctrl.product.categories !== null || ctrl.product.categories !== undefined ||
                ctrl.product.categories.length !== 0 )
                delete ctrl.product.categories;

            $http.put(hostFactory.getHost()+hostFactory.getProductAPI()+"/update", ctrl.product).then(function (response) {
                $state.go("Catalogo Prodotti");
                //console.log(ctrl.product);

            }).catch(function (error) {
                console.log(error);
            });

            $http.post(hostFactory.getHost()+hostFactory.getProductAPI()+"/save", ctrl.product).then(function (response) {
                $state.go("Catalogo Prodotti");
                console.log(ctrl.product);


            }).catch(function (error) {
                console.log(error);
            });
        }

        //elimina un prodotto selezionato dal database
        function eliminateProductFn() {
            if (ctrl.product === null)
                return;
            $http.delete(hostFactory.getHost()+hostFactory.getProductAPI() + '/' + ctrl.product.id).then(function (response) {
                $state.go("Catalogo Prodotti");

            }).catch(function (error) {
                console.log(error);
            });
        }

        //ctrl.product.properties
        function addPropertyFn() {
            console.log(ctrl.product);
            console.log(ctrl.newProperty);
            if (ctrl.product === null || ctrl.product === undefined)
                ctrl.product = {
                    propertylist:[]
                };

            if (ctrl.product.propertylist === null || ctrl.product.propertylist === undefined)
                ctrl.product.propertylist = [];

            if (ctrl.newProperty === null || ctrl.newProperty === undefined || ctrl.product.propertylist.indexOf(ctrl.newProperty) !== -1)
                return;

            else{
                ctrl.product.propertylist.push(ctrl.newProperty);
                ctrl.newProperty = null;
            }
        }


        function deletePropertyFn(index) {
            console.log(index);
            if (ctrl.product)
                ctrl.product.properties.splice(index,1);
            if (ctrl.product.propertylist)
                ctrl.product.propertylist.splice(index,1);
            console.log(index);
        }




    }];

    ProductCtrl.$inject = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', 'hostFactory'];

    angular.module('mc-dashboard').controller('ProductCtrl', ProductCtrl);

}());
