var app = require('app');
var Menu = require('menu');
var Tray = require('tray');
var fs = require('fs');

var loader = null;
var appIcon = null;
var fullDir = null;
var ReRunTray = {};


ReRunTray.init = function(){
      appIcon = new Tray( fullDir +'/assets/img/torp.png');
      var contextMenu = Menu.buildFromTemplate([
        { label: 'Reset API Token', click : resetAPIToken }
      ]);
      appIcon.setToolTip('This is my application.');
      appIcon.setContextMenu(contextMenu);
};

function resetAPIToken(e){
    console.log('Reseting...');
    // Token was found, so attempt to load the game
    fs.writeFile('config', '', function (err) {
        if (err) throw err;
        console.log('Reset Success.');
        loader.dmm();
    });
}


module.exports = function(dir, ld) {
    fullDir = dir;
    loader = ld;
    return ReRunTray;
};
