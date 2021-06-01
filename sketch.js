//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 590);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(400,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2; 
}

function draw() {  
  background("brown");
  if(foodS!== undefined){
    textSize(20);
    fill(255);
    text("NOTE: Press UP Arrow to feed DRAGO milk",200,50);
    text("Food Remaining: "+foodS, 50,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }

    if(foodS === 0){
      foodS = 20;
   }


    drawSprites();
  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}