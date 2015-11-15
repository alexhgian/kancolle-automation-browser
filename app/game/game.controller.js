angular.module('rerunApp')
.controller('gameCtrl', function ($scope, ipc, shared) {
    $scope.url = shared.url;
});
