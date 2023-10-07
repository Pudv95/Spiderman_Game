import Spidy from "./Models/spidy.js";
import { health } from "./config.js";

const canvas = document.getElementsByTagName("canvas")[0];
const context = canvas.getContext("2d");

canvas.width = 1100;
canvas.height = 700;

const spidy_standing = new Image();
spidy_standing.src = "../../assets/spidy/standing.png"


const backgroundImage = new Image();
backgroundImage.src = "../assets/background/background.png";


const buildingImage = new Image();
buildingImage.src = "../assets/background/building.png";

let backgroundX = 0;
let backgroundY = 0;

const minWidth = 200;
const maxWidth = 500;
const backgroundSpeed = 1;
const buildingSpeed = 6; 
const buildingSpacing = 150; 

function getRandomHeight() {
    return Math.random() * (200 - 150) + 150;
}


function getRandomWidth() {
    return Math.random() * (maxWidth - minWidth) + minWidth;
}

function Building(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

const buildings = [];

function generateBuildings() {
    let x = 0;
    
    while (x < maxWidth) { 
        const height = getRandomHeight();
        const width = getRandomWidth();
        const y = canvas.height - height;
        const building = new Building(x, y, width, height);
        buildings.push(building);
        x += (width + buildingSpacing);
    }

}


const spidy = new Spidy(context);
generateBuildings(); 

function draw(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.drawImage(backgroundImage, backgroundX, backgroundY, canvas.width, canvas.height);
    context.drawImage(backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);
    

    if (backgroundX <= -canvas.width) {
        backgroundX = 0;
    }

    for (const building of buildings) {
        context.drawImage(buildingImage, building.x, building.y, building.width, building.height);
    }

    const lastBuilding = buildings[buildings.length - 1];
    if (lastBuilding.x + lastBuilding.width <= canvas.width) {
        const width = getRandomWidth();
        const height = getRandomHeight();
        const x = lastBuilding.x + lastBuilding.width + buildingSpacing;
        const y = canvas.height - height;
        buildings.push(new Building(x, y, width, height));
    }
}

function isSpidyOnBuilding(buildings, spidy) {
    const spidyMidpoint = spidy.x + 25;

    for (const building of buildings) {
        if (
            spidyMidpoint > building.x &&
            spidyMidpoint < building.x + building.width &&
            spidy.y + 30 < building.y
        ) {
            return true;  
        }
    }

    return false;
}

function moveBackground(){
    backgroundX -= backgroundSpeed;
    for (const building of buildings) {
        building.x -= buildingSpeed;
    } 
}
function resetGame(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, backgroundX, backgroundY, canvas.width, canvas.height);
    context.drawImage(backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);
    spidy.x = - 50;
    spidy.y = -50;
    ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.fillText("Nice try", 450, 300);
        ctx.fillText("Press Enter To Play again", 370, 350);

        document.addEventListener("key")
}

var spidyIsMoving = false;
var i = 0;

var playing = true;

function game() {
    draw(context);
    if(spidyIsMoving){
        moveBackground();
    }
    if(buildings[0].x + buildings[0].width < 0){
        buildings.shift();
        i--;
    }
    if(buildings[i].x + buildings[i].width < 220){
        i++;
    }
    // console.log(spidy.y);
    if(spidy.y >1100){
        playing = false;
        resetGame();
    }
    spidy.update(buildings[i].y - 50,isSpidyOnBuilding(buildings,spidy));
    if(playing)
        requestAnimationFrame(game);
}

window.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowRight' && spidy.x > 180) {
        spidyIsMoving = true;
    }    
});
window.addEventListener('keyup', (event) => {
    if (event.key == 'ArrowRight') {
        spidyIsMoving = false;
        console.log(`${spidy.x} and ${buildings[i].x} and i = ${i}`);
    }
});

game();
