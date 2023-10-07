const canvas = document.getElementsByTagName("canvas")[0];
const context = canvas.getContext("2d");

canvas.width = 1100;
canvas.height = 700;


const backgroundImage = new Image();
backgroundImage.src = "../assets/background/background.png";

console.log(backgroundImage);

const buildingImage = new Image();
buildingImage.src = "../assets/background/building.png";

let backgroundX = 0;
let backgroundY = 0;

const minWidth = 200;
const maxWidth = 500;
const backgroundSpeed = 5; // Background speed (slower than buildings)
const buildingSpeed = 11; // Buildings speed
const buildingSpacing = 90; // spacing 

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
    let x = 0; // Start adding buildings from the left edge
    
    while (x < maxWidth) { 
        const height = getRandomHeight();
        const width = getRandomWidth();
        const y = canvas.height -height;
        const building = new Building(x, y, width, height);
        buildings.push(building);
        x += (width + buildingSpacing); // Adjust the spacing
        
       
    }
}

generateBuildings(); // Generate initial buildings


function draw(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.drawImage(backgroundImage, backgroundX, backgroundY, canvas.width, canvas.height);
    context.drawImage(backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);
    

    if (backgroundX <= -canvas.width) {
        backgroundX = 0;
    }

    for (const building of buildings) {
        context.drawImage(buildingImage, building.x, building.y, building.width, building.height);
         // Move the buildings to the left
    }

    // Remove buildings that have moved off the screen
    // buildings.forEach((building, index) => {
    //     if (building.x + building.width < 0) {
    //         buildings.splice(index, 1);
    //     }
    // });

    // Generate new buildings 
    const lastBuilding = buildings[buildings.length - 1];
    if (lastBuilding.x + lastBuilding.width <= canvas.width) {
        const width = getRandomWidth();
        const height = getRandomHeight();
        const x = lastBuilding.x + lastBuilding.width + buildingSpacing;
        const y = canvas.height - height;
        buildings.push(new Building(x, y, width, height));
    }
}

function game() {
    draw(context);
    requestAnimationFrame(game);
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        backgroundX -= backgroundSpeed;
        for (const building of buildings) {
            building.x -= buildingSpeed; // Move the buildings with the background
        } // Decrement when moving right
    }
    
});

game();
