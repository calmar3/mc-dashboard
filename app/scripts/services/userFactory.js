
(function() {
    'use strict';
    angular.module('mc-dashboard').factory('userFactory', userFactory);

    function userFactory($cookies) {
        var userFactory = {};

        userFactory.user = null;

        userFactory.setUser = setUserFn;

        userFactory.getUser = getUserFn;

        userFactory.setMenu = setMenuFn;

        userFactory.getMenu = getMenuFn;

        userFactory.menu = null;



        function getMenuFn() {
            return userFactory.menu;
        }

        function setMenuFn() {
            if (userFactory.user.role === "admin"){
                userFactory.menu = [
                    { label: "Catalogo Prodotti", state: "Catalogo Prodotti", icon: "fa fa-database" },
                    { label: "Gestione Politiche", state: "Gestione Politiche", icon: "fa fa-gears" },
                    { label: "Gestione Magazzini Periferici", state: "Gestione Magazzini Periferici", icon: "fa fa-external-link" },
                    { label: "Gestione Account", state: "Gestione Account", icon: "fa fa-user"},
                    { label: "Gestione Prodotti", state: "Gestione Prodotti", icon: "fa fa-opencart"},
                    { label: "Registrazione", state: "Registrazione", icon: "fa fa-users"},
                    { label: "Storico", state: "Storico", icon: "fa fa-history"}



                ];
            }
            else if (userFactory.user.role === "manager"){
                userFactory.menu = [
                    { label: "Catalogo Prodotti", state: "Catalogo Prodotti", icon: "fa fa-database" },
                    { label: "Gestione Ordini", state:"Gestione Ordini", icon:"fa fa-file"},
                    { label: "Gestione Bolle", state:"Gestione Bolle", icon:"fa fa-truck"},
                    { label: "Gestione Account", state: "Gestione Account", icon: "fa fa-user"},
                    { label: "Storico", state: "Storico", icon: "fa fa-history"}
                ];
            }
            else if (userFactory.user.role === "warehouseman"){
                userFactory.menu = [
                    { label: "Catalogo Prodotti", state: "Catalogo Prodotti", icon: "fa fa-database" },
                    { label: "Evasione Ordini", state: "Evasione Ordini", icon: "fa fa-file-o"},
                    { label: "Visualizza Bolle", state:"Visualizza Bolle", icon:"fa fa-truck"},
                    { label: "Gestione Account", state: "Gestione Account", icon: "fa fa-users"},
                    { label: "Storico", state: "Storico", icon: "fa fa-users"}
                ];
            }

        }


        function getUserFn() {
            return userFactory.user;
        }

        function setUserFn(user) {
            if (user!==null && user!==undefined){{
                userFactory.user = user;
                userFactory.setMenu();
            }

            }
        }

        return userFactory;
    }


}());
