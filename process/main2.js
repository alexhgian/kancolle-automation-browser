var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
    app.quit();
});


app.commandLine.appendSwitch('ppapi-flash-path', __dirname + '/plugin/PepperFlashPlayer.plugin');
app.commandLine.appendSwitch('ppapi-flash-version', '18.0.0.232');


// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    var isLoggedIn = false;
    var apiTokenFound = false;
    var cookieInjected = false;

    // Create the browser window.
    mainWindow = new BrowserWindow({
        'web-preferences': {
            'plugins': true
        },
        width: 1000, height: 720, fullscreen: false, frame: true
    });
    mainWindow.openDevTools();


    // and load the index.html of the app.
    // mainWindow.loadUrl('http://203.104.209.23/kcs/mainD2.swf?api_token=988ffda52e536af08057b591b2daa593851b7e95&api_starttime=1443592548071');
    mainWindow.loadUrl('http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/');
    // mainWindow.loadUrl('file://' + __dirname + '/index.html');
    // mainWindow.webContents.on('did-finish-load', function() {
    //     mainWindow.webContents.send('apiToken', 'http://203.104.209.23/kcs/mainD2.swf?api_token=988ffda52e536af08057b591b2daa593851b7e95&api_starttime=1443592548071');
    // });


    mainWindow.webContents.on('dom-ready', function(e) {
        // this.executeJavaScript("alert(document.cookie)");
        if(!cookieInjected){
            this.executeJavaScript('document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";');
            this.executeJavaScript('document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";');
            this.executeJavaScript('document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";');
            this.executeJavaScript('document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";');
            this.executeJavaScript('document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";');
            this.executeJavaScript('document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";');
            cookieInjected = true;
        }
    });

    mainWindow.webContents.on('did-start-loading', function(){
        var url = mainWindow.webContents.getUrl();
        console.log('dom-ready: ' + url);

        // Check to see if the user has sucessfully logged in as they will be redirected to the front page.
        if(isLoggedIn && url ==='http://www.dmm.com/') {
            mainWindow.loadUrl('http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/');
            console.log('body is ready!');
        }
        // Check if they're at the gamenow
        if(url === 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/') {
            console.log('At Game Screen: ');
        }
    });

    var apiRE = new RegExp('api_token','i');

    mainWindow.webContents.on('did-get-response-details',
    function(event, oldUrl, newUrl, isMainFrame, httpResponseCode, requestMethod, referrer, headers){

        // console.log('did-start-loading url: ' + newUrl);
        // console.log(requestMethod)
        // console.log('response...')
        if(apiRE.test(newUrl) && !apiTokenFound){
            console.log('------------------- WIN --------------------');
            console.log(newUrl);
            console.log('------------------------------------------');
            apiTokenFound=true;
            mainWindow.loadUrl('file://' + __dirname + '/index.html');
            mainWindow.webContents.on('did-finish-load', function() {
                mainWindow.webContents.send('apiToken', newUrl);
            });

        }
    });

    //Detect user redirect from the login screen
    mainWindow.webContents.on('did-get-redirect-request',
    function(event, oldUrl, newUrl, isMainFrame, httpResponseCode, requestMethod, referrer, headers){
        var re = RegExp('redirect','i');
        if(re.test(newUrl)) {
            isLoggedIn = true;
        }
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    mainWindow.on('app-command', function(e, cmd) {
        // Navigate the window back when the user hits their mouse back button
        if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
            console.log(mainWindow.webContents)
            e.preventDefault();
        }
    });
});
