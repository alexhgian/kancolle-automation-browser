angular.module('rerunApp', [
    'ui.router',
    'ui.bootstrap'
])
.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('index', {
        abstract: true,
        //url: '/',
        views: {
            '@' : {
                templateUrl: 'partials/layout.html',
                controller: 'layoutCtrl'
            },
            'navbar@index' : { templateUrl: 'partials/navbar.html',}
        }
    })
    .state('game', {
        parent: 'index',
        url: '/game',
        views: {
            'main@index' : {
                templateUrl: 'game/game.html',
                controller: 'gameCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/game');
}).run(function (ipc, shared) {
    ipc.on('apiToken', function(apiurl) {
        console.log('app apiToken', apiurl);
        shared.url = apiurl;
    });
});
