/**
 * Created by mariusdragosionita on 26/05/17.
 */
(function () {
    'use strict';

    var ProductCtrl = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', 'hostFactory', function ($scope, $rootScope, $compile, $state, $stateParams, $http, hostFactory) {

        var ctrl = this;

        ctrl.add = false;
        ctrl.modify = false;
        ctrl.mode = null;
        ctrl.changedProperty = null;
        ctrl.products = null;

        ctrl.newProperty = null;

        ctrl.otherProperty = [];
        ctrl.selectedProperties = [];
        ctrl.productProperties = [];

        ctrl.newProduct = {
            id:"",
            name:"",
            averageDeliveryTime: "",
            stockist: "",
            price: "",
            properties:[]
            ,
            category:{
                fatherId:""
            },
            propertylist:[]
        };

        ctrl.getProductsTree = getProductsTreeFn;

        function getProductsTreeFn() {
            $http.get((hostFactory.getHost()+hostFactory.getCategoriesAPI() + "/root")).then(function (response) {
                ctrl.categories = response.data;
                console.log(ctrl.categories);

            }).catch(function (error) {
                console.log(error);
            });

        }

        ctrl.switchMode = switchModeFn;                 //mi permette di navigare tra i form della pagina

        ctrl.addProduct = addProductFn;                 //
        ctrl.updateProduct = updateProductFn;           //mi permette di aggiornare un prodotto
        ctrl.eliminateProduct = eliminateProductFn;     //mi permette di eliminare un prodotto
        ctrl.saveNewProduct = saveNewProductFn;


       // ctrl.addProperty = addPropertyFn;               //mi permette di aggiungere una proprietà ad un prodotto
        //ctrl.deleteProperty = deletePropertyFn;         //


        //quando creo un nuovo prodotto mi salvo tutte le proprietà obbligatorie nell'array productProperties
        ctrl.changeProductProperty = changeProductPropertyFn;       //mi permette di aggiornare le proprietà di un prodotto


        ctrl.changeOtherPropertiesStatus = changeOtherPropertiesStatusFn;       //mi permette di aggiornare le proprietà indiependenti di un articolo

        ctrl.loadProperties = loadPropertiesFn;         //

        ctrl.addPropertyToNewProduct = addPropertyToNewProductFn;

        ctrl.addCategoryToNewProduct = addCategoryToNewProductFn;

        ctrl.addOtherProperties = addOtherPropertiesFn;

        ctrl.createSelectedProperty = createSelectedPropertyFn;

        ctrl.refresh = refreshFn;

        ctrl.refresh();

        function refreshFn() {
            //chiamata GET che mi restituisce tutti i prodotti nel DB
            $http.get(hostFactory.getHost()+hostFactory.getProductsAPI()).then(function (response) {
                //console.log(response.data);
                ctrl.products = response.data;

            }).catch(function (error) {
                console.log(error);
            });
        }

        //quando faccio update di un prodotto e voglio aggiungere nuove proprietà indipendenti (oltre alle eventuali già presenti)
        function changeOtherPropertiesStatusFn(selectedProperty) {

            console.log(selectedProperty);

            //console.log(ctrl.product.propertylist);

            var idx = -1;

            ctrl.product.propertylist.forEach(function (item) {

                if(item.id === selectedProperty.id)
                    idx = ctrl.product.propertylist.indexOf(item);

            })


            if(idx>-1)
                ctrl.product.propertylist.splice(idx,1);
            else
                ctrl.product.propertylist.push(selectedProperty);

            //console.log(ctrl.product.propertylist);


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


        //console.log(ctrl.otherProperty);
        //console.log(ctrl.selectedProperties);






        var found = false;

        function createSelectedPropertyFn() {
            ctrl.selectedProperties = [];
            for (var i = 0 ; i < ctrl.otherProperty.length ; i++) {
               ctrl.selectedProperties[i] = (ctrl.product.propertiesId.indexOf(ctrl.otherProperty[i].id) > -1)
            }
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


        function switchModeFn(mode,index) {
            ctrl.mode = mode;

            ctrl.deliveryTime = null;
            ctrl.stockists = null;
            ctrl.prices = null;
            ctrl.selectedCategory = null;
            ctrl.productName = null;
            ctrl.stockist = null;
            ctrl.otherProperty = null;

            if (index !== null && index!== undefined && index >= 0 )
                ctrl.product = ctrl.products[index];

            if(mode == "createProduct") {
                ctrl.getCategories();
                ctrl.getOtherProperty();
                ctrl.addPropertyToNewProduct();
            }
            if (mode == "manageProduct"){
                ctrl.getOtherProperty();

            }

            if (mode == "catalogTree")
                ctrl.getProductsTree();
        }



        function addProductFn() {
            ctrl.add = true;
            ctrl.product = null;
        }

        //funzione che aggiorna i dati relativi a un prodotto selezionato
        function updateProductFn() {
            if (ctrl.product === null)
                return;

            if (ctrl.product.categories !== null || ctrl.product.categories !== undefined ||
                ctrl.product.categories.length !== 0 )
                delete ctrl.product.categories;

            $http.put(hostFactory.getHost()+hostFactory.getProductAPI()+"/update", ctrl.product).then(function (response) {
                ctrl.refresh();
                ctrl.switchMode(null);
                //console.log(ctrl.product);

            }).catch(function (error) {
                console.log(error);
            });

            $http.post(hostFactory.getHost()+hostFactory.getProductAPI()+"/save", ctrl.product).then(function (response) {


                ctrl.refresh();
                ctrl.switchMode(null);
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

                ctrl.refresh();
                ctrl.switchMode(null);

            }).catch(function (error) {
                console.log(error);
            });
        }



        function saveNewProductFn() {

            ctrl.newProduct.name = ctrl.productName;
            ctrl.newProduct.averageDeliveryTime = ctrl.deliveryTime;
            ctrl.newProduct.stockist = ctrl.stockists;
            ctrl.newProduct.price = ctrl.prices;
            ctrl.newProduct.category = ctrl.selectedCategory;



            if ((ctrl.newProduct.category.id !== null || ctrl.newProduct.category.id !== undefined) && (ctrl.newProduct.name !== undefined)){
                var properties = JSON.parse(JSON.stringify(ctrl.newProduct.properties))
                ctrl.newProduct.properties = {};
                for (var i = 0 ; i < properties.length ; i++){
                    var keys = Object.keys(properties[i]);
                    ctrl.newProduct.properties[keys[0]] = properties[i][keys[0]];
                }
                console.log(JSON.stringify(ctrl.newProduct));
                delete ctrl.newProduct.id;
                $http.post((hostFactory.getHost()+hostFactory.getProductAPI() + "/save"), ctrl.newProduct).then(function (response) {

                    ctrl.refresh();
                    ctrl.switchMode(null);
                }).catch(function (error) {
                    console.log(error);
                });
            }
            else {
                console.log(ctrl.newProduct);

            }




        }

        function addOtherPropertiesFn(selectedProperty) {
            console.log(selectedProperty);
            console.log(ctrl.newProduct.propertylist);
            if (selectedProperty !== null && selectedProperty !== undefined && selectedProperty.length !== 0) {

                var idx = ctrl.newProduct.propertylist.indexOf(selectedProperty);

                console.log(idx);
                if (idx > -1)
                    ctrl.newProduct.propertylist.splice(idx, 1);
                else


                if (ctrl.newProduct.propertylist[0]=== undefined)
                   ctrl.newProduct.propertylist[0] = selectedProperty;
                else
                    ctrl.newProduct.propertylist.push(selectedProperty);
                //console.log(ctrl.selectedProperty);
            }

            //console.log(ctrl.newProduct);
        }

        function addCategoryToNewProductFn(selectedCategory) {
            console.log(selectedCategory);
            if (ctrl.newProduct.category.fatherId === null || ctrl.newProduct.category.fatherId === undefined || ctrl.newProduct.category.fatherId.length === 0)
                ctrl.newProduct.category.fatherId = selectedCategory;

            //console.log(ctrl.newProduct);


        }


        //quando creo un nuovo prodotto mi salvo tutte le proprietà obbligatorie nell'array productProperties
        function addPropertyToNewProductFn(index,key) {

            var adding = {};        //oggetto utilizzando per salvare i dati
            ctrl.loadProperties(ctrl.newProduct.properties);

            if (ctrl.newProduct === null || ctrl.newProduct === undefined)
                ctrl.newProduct = {
                    properties:[]
                };
            if (ctrl.newProduct.properties === null || ctrl.newProduct.properties === undefined)
                ctrl.newProduct.properties = [];
            if (ctrl.productProperties[index] === null || ctrl.productProperties[index] === undefined || ctrl.newProduct.properties.indexOf(ctrl.productProperties[index]) !== -1)
                return;
            else{
                //GESTIONE CONTROLLO SE NON SI INSERISCE NULLA
                if(ctrl.productProperties[index] == null)
                {
                    console.log("controlla");
                    return;
                }
                adding[key] = ctrl.productProperties[index];
                var found = false;
                for (var i = 0 ; i < ctrl.newProduct.properties.length && !found ; i++){
                    if (ctrl.newProduct.properties[i][key]){
                        ctrl.newProduct.properties[i][key] = adding[key];
                        found = true;
                    }
                }
                if (!found)
                    ctrl.newProduct.properties.push(adding);

                ctrl.productProperties[index] = null;

                //console.log(ctrl.newProduct);
                //console.log(ctrl.productProperties[index]);

            }

            //console.log(ctrl.product.productProperties);

        }



        //richiesta delle proprietà indipendenti che possono essere attribuite ai prodotti
        ctrl.getOtherProperty = function otherPropertyFn() {

            $http.get((hostFactory.getHost()+hostFactory.getOtherPropertyAPI())).then(function (response) {
                ctrl.otherProperty = response.data;
                //console.log(ctrl.otherProperty);

                for (var i = 0 ; i < ctrl.otherProperty.length ; i++){
                    ctrl.selectedProperties.push(false);
                }
                  ctrl.createSelectedProperty();
            }).catch(function (error) {
                console.log(error);
            });
        }


        //richiesta delle categorie alle quale sono attribuiti un insieme di prodotti differenti
        ctrl.getCategories = function getCategoriesFn() {

            $http.get((hostFactory.getHost()+hostFactory.getCategoriesAPI())+"/leaf").then(function (response) {
                ctrl.categories = response.data;
                //console.log(ctrl.categories);
            }).catch(function (error) {

            }).catch(function (error) {
                console.log(error);
            });
        }




        function loadPropertiesFn() {
            //console.log(ctrl.selectedCategory);

            if (ctrl.selectedCategory !== null && ctrl.selectedCategory !== undefined && ctrl.selectedCategory.length !== 0) {

                $http.get((hostFactory.getHost()+hostFactory.getCategoriesAPI())+"/properties/"+ctrl.selectedCategory.id).then(function (response) {
                    //console.log(response.data);
                    ctrl.properties = response.data;

                }).catch(function (error) {
                    console.log(error);
                });

                ctrl.addCategoryToNewProduct(ctrl.selectedCategory);

            }
        }



    }];

    ProductCtrl.$inject = ['$scope', '$rootScope', '$compile', '$state', '$stateParams','$http', 'hostFactory'];

    angular.module('mc-dashboard').controller('ProductCtrl', ProductCtrl);

}());
