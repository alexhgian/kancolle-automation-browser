var robot = require('robotjs');
var macro = require('./macro');
var async = require('async');

module.exports = function(mainWindow){
    function test(){
        var bounds = mainWindow.getBounds();
        var pos = robot.getMousePos();
        robot.moveMouse(bounds.x+83, bounds.y+103);
        robot.mouseClick();
    }


    function run(macroName){
        var m = macro[macroName];
        var cmds = m.commands;
        var i = 0;
        async.eachSeries(cmds, function(cmd, callback){

            console.log('Processing Command [',i,']');
            performAction(cmd, mainWindow, callback);
            i++;
        }, function done() {
            console.log('Done.');
        });

    }

    return {
        'test' : test,
        'run' : run
    };
};




/**
* Searches for an action and returns the appropriate robotjs function
* @param actionName {String} The type of action to search for
*/
function performAction(cmd, mainWindow, done){
    var bounds = mainWindow.getBounds();
    var pos = robot.getMousePos();
    var actionName = cmd.type;

    switch(actionName){
        case 'moveMouse':
        robot.moveMouse(bounds.x+cmd.x, bounds.y+cmd.y);
        setTimeout(done, cmd.delay || 0);
        break;

        case 'mouseClick':
        robot.mouseClick();
        setTimeout(done, cmd.delay || 0);
        break;

        case 'delay':
        setTimeout(done, cmd.delay);
        break;
    }
}
