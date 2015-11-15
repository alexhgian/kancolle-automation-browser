angular.module('rerunApp')
.factory('ipc', function () {
    return require('ipc');
})
.factory('remote', function () {
    return require('remote');
})
.factory('shared', function () {
    var url = '';
    return {
        url : url
    };
});
