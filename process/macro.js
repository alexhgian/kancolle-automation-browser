exports.farmNode = {
    title: "Farm Node",
    description: "Used to farm node",
    commands : [
        { type: 'delay', delay: 1000},
        { type: 'moveMouse', x: 83, y: 103, delay: 10 },
        { type: 'mouseClick', delay: 1000 },
        { type: 'moveMouse', x: 448, y: 103, delay: 10 },
        { type: 'mouseClick', delay: 1000 }
    ]
};



// robot.moveMouse(bounds.x+83, bounds.y+103);
//     robot.mouseClick();
//
//     setTimeout(function(){
//         robot.moveMouse(bounds.x+448, bounds.y+103);
