const canvas = document.getElementsByTagName("canvas")[0]
const context = canvas.getContext("2d");

canvas.width = 1100;
canvas.height = 700;


function draw(context){
    
}

function game(){


    draw(context);
    requestAnimationFrame(game);
}

game();

