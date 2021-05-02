var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;


//create feed and lastFed variable here
var feed , lastFed ;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feeddog = createButton("Feed the Dog");
  feeddog.position(400,95);
  feeddog.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database
  fedtime = database.ref('FeedTime');
  fedtime.on("value",
  function (data){
    lastFed = data.val();
  }) 
  
 
  //write code to display text lastFed time here
  fill(0);
  textSize(15);
  if(lastFed<12){
    text("Last feeding time is" + lastfed + "AM" , 350,30);
  }

  else if(lastfed>12){
    text("Last feeding time is" + lastfed + "PM" , 350,30);
  }

  else if(lastfed===12){
    text("Last feeding time is" + lastfed + "12 Noon" , 350,30);
  }

  else if(lastfed===0){
    text("Last feeding time is " + lastfed + "12 AM" , 350 ,30); 
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()

  })

   var foodval = foodObj.getFoodStock();
   if(foodval <= 0){
     foodObj.updateFoodStock(foodval * 0);

  }

  else {
    foodObj.updateFoodStock(foodval - 1);
  }

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

