(function () {

  'use strict';

  angular.module('mc-dashboard').config(routingConf).run(runfunction);

  routingConf.$inject = ['$stateProvider', '$urlRouterProvider'];

  runfunction.$inject = ['$rootScope'];

  function runfunction($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;
    });
  }


  function routingConf($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
    $stateProvider.state('site', {
      'abstract': true
    }).state('Home', {
      parent: 'site',
      url: '/',
      data: {
        roles: []
      },
      views: {
        'page@': {
          templateUrl: "views/main.html",
          controller: 'MainCtrl',
          controllerAs: 'ctrl'
        }
      },
      params: {
        home: true
      }
    }).state('Login', {
        parent: 'site',
        url: '/login',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/login.html",
                controller: 'LoginCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true
        }
    }).state('Profilo Utente', {
        parent: 'site',
        url: '/utente',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/user.html",
                controller: 'UserCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true
        }

  }).state('Catalogo Prodotti', {
    parent: 'site',
    url: '/catalogo',
    data: {
        roles: []
    },
    views: {
        'page@': {
            templateUrl: "views/catalog.html",
            controller: 'CatalogCtrl',
            controllerAs: 'ctrl'
        }
    },
    params: {
        home: true
    }
    }).state('Evasione Ordini', {
        parent: 'site',
        url: '/evasioneOrdini',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/processingOrder.html",
                controller: 'procOrdCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true
        }
}).state('Gestione Personale', {
        parent: 'site',
        url: '/personale',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/personal.html",
                controller: 'PersonalCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true
        }
    }).state('Gestione Politiche', {
        parent: 'site',
        url: '/politiche',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/policies.html",
                controller: 'PoliciesCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true
        }
    }).state('Gestione Ordini', {
        parent: 'site',
        url: '/ordini',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/commission.html",
                controller: 'CommissionCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true
        }
    }).state('Gestione Account', {
        parent: 'site',
        url: '/account',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/account.html",
                controller: 'AccountCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true
        }
    })
    .state('Gestione Magazzini Periferici', {
      parent: 'site',
      url: '/magazzini_periferici',
      data: {
        roles: []
      },
      views: {
        'page@': {
          templateUrl: "views/peripheralWarehouse.html",
          controller: 'PeripheralWarehouseCtrl',
          controllerAs: 'ctrl'
        }
      },
      params: {
        home: true
      }
    }).state('Gestione Bolle', {
        parent: 'site',
        url: '/gestione_bolle',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/delivery.html",
                controller: 'DeliveryCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true
        }
    }).state('Storico', {
        parent: 'site',
        url: '/storico',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/history.html",
                controller: 'HistoryCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true
        }
    }).state('Visualizza Bolle', {
        parent: 'site',
        url: '/visualizza_bolle',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/deliveryCompleted.html",
                controller: 'DeliveryCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true
        }
    }).state('Registrazione', {
        parent: 'site',
        url: '/registrazione',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/createUser.html",
                controller: 'RegistrationCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true
        }
    }).state('Gestione Prodotti', {
        parent: 'site',
        url: '/prodotto',
        data: {
            roles: []
        },
        views: {
            'page@': {
                templateUrl: "views/product.html",
                controller: 'ProductCtrl',
                controllerAs: 'ctrl'
            }
        },
        params: {
            home: true,
            product: null
        }
    })

  }

} ());
