
var cookieInjected = false;
var ipc = require('ipc');
var remote = require('remote');

ipc.on('apiToken', function(apiurl) {
    console.log('game.html apiToken: ' + apiurl);
    var container = document.getElementById("webcontainer");
    var webview = document.createElement('webview')
    webview.setAttribute('src', apiurl)
    webview.setAttribute('plugins', '')
    container.appendChild(webview);
    console.log(apiurl);  // Prints "whoooooooh!"
    webview.addEventListener('dom-ready', function(e) {

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
});



onload = function() {
    var mainWindow = remote.getCurrentWindow();
    var bot = require('../process/bot')(mainWindow);

    var farmButton = document.getElementById('farm');
    var mouseDetect = document.getElementById('mousedetect');
    var start = document.getElementById('start');

    farmButton.addEventListener('click', function(){
        bot.run('farmNode');
    });

    start.addEventListener('click', function(){
        bot.run('start');
    });

    var detectToggle = false;
    mouseDetect.addEventListener('click', function(){
        detectToggle = !detectToggle;
        if(detectToggle){
            bot.startLoop();
        } else {
            bot.endLoop();
        }

    });
};
