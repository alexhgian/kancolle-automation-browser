module.exports = function(dir, mainWindow){
    var renderPath = '/render/'
    var rootDir = 'file://' + dir;

    function loadUrl(base){
        mainWindow.loadUrl(rootDir + renderPath + base);
    }

    return {
        robotTest : function(){
            loadUrl('robot-test.html');
        },

        game : function(){
            loadUrl('game.html');
        },

        dmm : function(){
            loadUrl('dmm.html');
        }
    }
};
