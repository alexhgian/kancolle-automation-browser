angular.module('rerunApp')
.controller('layoutCtrl', function ($scope) {
    $scope.start = function(){
        console.log('Clicked start.');
    };

    $scope.farm = function(){
        console.log('Clicked farm.');
    };
});
