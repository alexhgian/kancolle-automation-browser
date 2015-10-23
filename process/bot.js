var robot = require('robotjs');
var macro = require('./macro');
var async = require('async');

var bot = {};
var mainWindow;

bot.test = function() {
    var bounds = mainWindow.getBounds();
    var pos = robot.getMousePos();
    robot.moveMouse(bounds.x+83, bounds.y+103);
    robot.mouseClick();
};


bot.run = function(macroName) {
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
};


var doneLoop = false;

bot.startLoop = function(){
    doneLoop = false;
    loop();
};

bot.endLoop = function(){
    doneLoop = true;
};


// Expose the module
module.exports = function(window){
    mainWindow = window;
    return bot;
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
        if(cmd.point){
            var point = cmd.point;
            robot.moveMouse(bounds.x+point.x, bounds.y+point.y);
        } else if (cmd.x && cmd.y){
            robot.moveMouse(bounds.x+cmd.x, bounds.y+cmd.y);
        }

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

var loop = function(){
    var bounds = mainWindow.getBounds();
    var pos = robot.getMousePos();
    console.log({
        x:pos.x-bounds.x,
        y:pos.y-bounds.y
    });
    if(!doneLoop){
        setTimeout(loop, 1000);
    }
};
