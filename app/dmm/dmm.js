var ipc = require('ipc');
var isLoggedIn = false;
var cookieInjected = false;
var apiTokenFound = false;

var DMM_GAME_URL = 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/';

onload = function() {
    var container = document.getElementById("webcontainer");
    var webview = document.createElement('webview')
    webview.setAttribute('src', DMM_GAME_URL)
    webview.setAttribute('plugins', '')
    webview.setAttribute('nodeintegration', '')
    container.appendChild(webview);

    webview.addEventListener('dom-ready', function(e) {
        var url = webview.getUrl();
        // console.log('dom-ready: ' + url);

        // Check to see if the user has sucessfully logged in as they will be redirected to the front page.
        if(isLoggedIn && url ==='http://www.dmm.com/') {
            webview.executeJavaScript('window.location.href = "http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"');
            console.log('body is ready!');
        }
        // Check if they're at the gamenow
        if(url === 'DMM_GAME_URL') {
            console.log('At Game Screen: ');
        }

        // this.executeJavaScript("alert(document.cookie)");
        if(!cookieInjected){
            console.log('injecting cookies')

            this.executeJavaScript('document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";');
            this.executeJavaScript('document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";');
            this.executeJavaScript('document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";');
            this.executeJavaScript('document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";');
            this.executeJavaScript('document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";');
            this.executeJavaScript('document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";');
            cookieInjected = true;
        }
    });

    webview.addEventListener('did-finish-load',function(){
        setTimeout(function(){
            webview.executeJavaScript("alert(document.getElementById('popup-close').click())");
        },1000)
    });

    var apiRE = new RegExp('api_token','i');

    webview.addEventListener('did-get-response-details',
    function(e){
        //console.log('Res: '+ e.newUrl)
        // console.log('did-start-loading url: ' + newUrl);
        // console.log(requestMethod)
        // console.log('response...')
        if(apiRE.test(e.newUrl) && !apiTokenFound){
            apiTokenFound=true;
            // TODO: call main process
            // remote.loadGameView(e.newUrl);
            ipc.send('save-api-token', e.newUrl)
        }
    });

    //Detect user redirect from the login screen
    webview.addEventListener('did-get-redirect-request',
    function(e){
        // console.log('Redirected: ' + e.newUrl);
        var re = RegExp('redirect','i');
        if(re.test(e.newUrl)) {
            isLoggedIn = true;
        }
    });





};
