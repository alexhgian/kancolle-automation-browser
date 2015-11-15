angular.module('rerunApp')
.directive('webcontainer',[ function() {
    function link(scope, element, attrs) {
        if(attrs.url) {
            var webview = document.createElement('webview');
            webview.setAttribute('src', 'https://www.google.com');
            webview.setAttribute('plugins', '');
            element.append(webview);
        }
    }
    return {
        link:link
    };
}]);
