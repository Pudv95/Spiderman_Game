import Spidy from "./Models/spidy.js";
import { health } from "./config.js";

const canvas = document.getElementsByTagName("canvas")[0]
const context = canvas.getContext("2d");

canvas.width = 1100;
canvas.height = 700;

const spidy_standing = new Image();
spidy_standing.src = "../../assets/spidy/standing.png"


function draw(context){
    
}

const spidy = new Spidy(context);

function game(){

    spidy.update();
    requestAnimationFrame(game);
}

game();
