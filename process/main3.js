var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');

var fs = require('fs');
var robot = require("robotjs");

var Loader = require('./process/loader');
var Macro = require('./process/macro');

var gameUrl = null;

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Enable flash plugin
app.commandLine.appendSwitch('ppapi-flash-path', __dirname + '/plugin/PepperFlashPlayer.plugin');
app.commandLine.appendSwitch('ppapi-flash-version', '18.0.0.232');

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
    app.quit();
});



// App is ready event
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        'web-preferences': {
            'plugins': true
        },
        width: 800, height: 1000, y: 0, fullscreen: false, frame: true
    });

    mainWindow.openDevTools();


    var load = Loader(__dirname, mainWindow);
    load.robotTest();


    var bounds = mainWindow.getBounds();
    var pos = robot.getMousePos();


    // setInterval(function(){
    //     bounds = mainWindow.getBounds();
    //     pos = robot.getMousePos();
    //
    //     robot.moveMouse(bounds.x+83, bounds.y+103);
    //     robot.mouseClick();
    //
    //     setTimeout(function(){
    //         robot.moveMouse(bounds.x+448, bounds.y+103);
    //         robot.mouseClick();
    //     },2000)
    //
    //
    //     console.log('offset',{
    //         x : pos.x-bounds.x,
    //         y : pos.y-bounds.y
    //     })
    //     // console.log('mouse:', pos);
    //     // console.log('bound', bounds)
    // }, 4000);
    //
    // fs.readFile('config', 'utf8', function (err, data) {
    //     if (err) throw err;
    //     if (!data || data.length <= 0){
    //         // Redirect to DMM to get API Token
    //         mainWindow.loadUrl('file://' + __dirname + '/render/dmm.html');
    //         return;
    //     }
    //     loadGameView(data);
    // });
    //
    // // // When the game screen is loaded
    // mainWindow.webContents.on('did-finish-load', sendToGameView);
});



ipc.on('save-api-token', function(event, arg) {
    loadGameView(arg);
    event.sender.send('save-api-token-reply', 'done');
});

function loadGameView(data){
    // Token was found, so attempt to load the game
    fs.writeFile('config', data, function (err) {
        if (err) throw err;
        // console.log('Token saved: ' + data);
    });

    gameUrl = data;
    mainWindow.loadUrl('file://' + __dirname + '/render/game.html');
}

function sendToGameView() {
    if(gameUrl) {
        mainWindow.webContents.send('apiToken', gameUrl);
    }
}
