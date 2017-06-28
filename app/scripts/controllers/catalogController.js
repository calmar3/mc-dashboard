(function () {
    'use strict';

    var CatalogCtrl = ['$scope', '$rootScope', '$compile', '$state', '$http', 'hostFactory', function ($scope, $rootScope, $compile, $state, $http, hostFactory) {

        var ctrl = this;

        ctrl.mode = null;

        ctrl.products = null;

        ctrl.newProperty = null;


        ctrl.productProperties = [];

        ctrl.otherProperty = [];

        ctrl.selectedProperties = [];

        ctrl.treeMainCategories = [];

        ctrl.treeOtherCategories = [];

        ctrl.tree = {
          category: {
              subcategory:{}
          }
        };


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

        ctrl.parents = false;




        function createTreeFn() {


            $http.get((hostFactory.getHost()+hostFactory.getCategoriesAPI())+"/leaf").then(function (response) {

                ctrl.categories = response.data;

                console.log(ctrl.categories);

                for (var i = 0; i < ctrl.categories.length; i++) {
                    //console.log(ctrl.categories[i]);
                    if (ctrl.categories[i].fatherId === null) {

                        if (ctrl.tree === null || ctrl.tree === undefined)
                            ctrl.tree = {
                                category:[]
                            };
                        if (ctrl.tree.category === null || ctrl.tree.category === undefined)
                            ctrl.tree.category = [];

                        //console.log(ctrl.categories[i]);
                        ctrl.treeMainCategories.push(ctrl.categories[i]);
                        //console.log(ctrl.treeMainCategories);
                        ctrl.tree.category = ctrl.treeMainCategories;
                        //console.log(ctrl.tree.category);
                    }
                    else {
                        ctrl.treeOtherCategories.push(ctrl.categories[i]);
                        if (ctrl.tree.category.subcategory === null || ctrl.tree.category.subcategory === undefined)
                            ctrl.tree.category.subcategory = [];
                        //console.log(ctrl.tree.category.values(ctrl.tree.category.id));
                        //console.log(ctrl.categories[i].id);
                        //console.log(ctrl.treeOtherCategories);
                        ctrl.tree.category.subcategory.push(ctrl.categories[i].id);
                    }
                }

                for (var i = 0; i < ctrl.treeOtherCategories.length; i++) {
                    for (var j = 0; j < ctrl.treeMainCategories.length; j++) {

                        if (ctrl.treeOtherCategories[i].fatherId === ctrl.treeMainCategories[j].id) {
                            //console.log(ctrl.treeMainCategories[j].id);
                            ctrl.parents=true;
                            console.log(ctrl.parents);
                        }
                        ctrl.parents = false;
                    }
                }

                }).catch(function (error) {
                console.log(error);
            });
            console.log(ctrl.tree);
            console.log(ctrl.treeMainCategories);
            console.log(ctrl.treeOtherCategories);
        }

        ctrl.go = goFn;

        ctrl.switchMode = switchModeFn;

        ctrl.loadProperties = loadPropertiesFn;

        ctrl.product = productFn;              //per andare a modificare le caratteristiche di un prodotto selezionato

        ctrl.addPropertyToNewProduct = addPropertyToNewProductFn;

        ctrl.addCategoryToNewProduct = addCategoryToNewProductFn;

        ctrl.addOtherProperties = addOtherPropertiesFn;

        ctrl.saveNewProduct = saveNewProductFn;

        ctrl.createTree = createTreeFn;



        function goFn(state){
            $state.go(state);
        }



        function switchModeFn(mode) {
            ctrl.mode = mode;

            if(mode == "createProduct") {

                ctrl.getCategories();
                ctrl.getOtherProperty();
                ctrl.addPropertyToNewProduct();

            }

            if(mode == "catalogTree")
                ctrl.createTree();
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
                    $state.go("Gestione Prodotti");
                }).catch(function (error) {
                    console.log(error);
                });
            }
            else {
                console.log(ctrl.newProduct);

            }


        }

        function addOtherPropertiesFn(selectedProperty) {
            if (selectedProperty !== null && selectedProperty !== undefined && selectedProperty.length !== 0) {

                var idx = ctrl.newProduct.propertylist.indexOf(selectedProperty);

                console.log(idx);
                if(idx >-1)
                    ctrl.newProduct.propertylist.splice(idx,1);
                else


               // if (ctrl.newProduct.propertylist[0]=== undefined)
                 //   ctrl.newProduct.propertylist[0] = selectedProperty;
                //else
                ctrl.newProduct.propertylist.push(selectedProperty);
                //console.log(ctrl.selectedProperty);
            }
            console.log(ctrl.newProduct.propertylist)
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
                //ctrl.addOtherProperties(ctrl.otherProperty);
                for (var i = 0 ; i < ctrl.otherProperty.length ; i++){
                    ctrl.selectedProperties.push(false);
                }

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


        function productFn(product) {
           $state.go("Gestione Prodotti", {"product": product});
        }





        //chiamata GET che mi restituisce tutti i prodotti nel DB
        $http.get(hostFactory.getHost()+hostFactory.getProductsAPI()).then(function (response) {
            //console.log(response.data);
            ctrl.products = response.data;

        }).catch(function (error) {
            console.log(error);
        });

    }];



    CatalogCtrl.$inject = ['$scope', '$rootScope', '$compile', '$state', '$http', 'hostFactory'];

    angular.module('mc-dashboard').controller('CatalogCtrl', CatalogCtrl);

}());
