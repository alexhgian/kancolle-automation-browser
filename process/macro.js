var actionButton = { x: 295, y: 285 };
var sorteeButton = {x: 324, y: 246};
var area11 = {x: 370, y: 230};
var selectArea = {x: 783, y: 468};
var deployToArea =  {x: 728, y: 469};
var clickScreen =  {x: 400, y: 400};
var continueArea = {x: 604, y: 272};
exports.farmNode = {
    title: "Farm Node",
    description: "Used to farm node",
    commands : [
        { type: 'delay', delay: 100},                               //0
        { type: 'moveMouse', point: actionButton, delay: 100 },     //1
        { type: 'mouseClick', delay: 2000 },                        //2
        { type: 'moveMouse', point: sorteeButton, delay: 100 },     //3
        { type: 'mouseClick', delay: 2000 },                        //4
        { type: 'moveMouse', point: area11, delay: 100 },           //5
        { type: 'mouseClick', delay: 2000 },                        //6
        { type: 'moveMouse', point: selectArea, delay: 100 },       //7
        { type: 'mouseClick', delay: 2000 },                        //8
        { type: 'moveMouse', point: deployToArea, delay: 100 },     //9
        { type: 'mouseClick', delay: 40000 },                       //10
        { type: 'moveMouse', point: clickScreen, delay: 100 },      //11
        { type: 'mouseClick', delay: 5000 },                        //12
        { type: 'moveMouse', point: clickScreen, delay: 100 },      //13
        { type: 'mouseClick', delay: 5000 },                        //14
        { type: 'moveMouse', point: continueArea, delay: 100 },     //15
        { type: 'mouseClick', delay: 5000 }                         //16
    ]
};

exports.start = {
    title: "Start Game",
    description: "Starts the game",
    commands : [
        { type: 'delay', delay: 100},
        { type: 'moveMouse', x: 700, y: 425, delay: 100 },
        { type: 'mouseClick', delay: 100 }
    ]
};





// robot.moveMouse(bounds.x+83, bounds.y+103);
//     robot.mouseClick();
//
//     setTimeout(function(){
//         robot.moveMouse(bounds.x+448, bounds.y+103);
