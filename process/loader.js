module.exports = function(dir, mainWindow){
    var rootDir = 'file://' + dir;

    return {
        robotTest : function(){
            mainWindow.loadUrl(rootDir + '/render/robot-test.html');
        },

        game : function(){
            mainWindow.loadUrl(rootDir + '/render/dmm.html');
        },

        dmm : function(){
            mainWindow.loadUrl(rootDir + '/render/game.html');
        }
    }
};
