 var enemyImage=new Image();
enemyImage.src="../assets/enemy/venom-original.png";


export function drawEnemy(context,x, y, width){
//    if(i==true){
    context.drawImage(enemyImage,x+(width/2),y-50,50,50);


}
    