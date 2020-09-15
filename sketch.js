//Store the sprites
var PLAY =1;
var END = 0;
var gameState = PLAY;
var monkey,monkey_running,ground,obstacle1,obstacle2,obstacle3;
var banana,bananaImage,obstacle,obstacleImage,obstacle4,obstacle5;
var  FoodGroup,obstacleGroup,bananaGroup,obstacle6,obstacle7,obstacle8;
var score , jumpSound,obstacle9,obstacle9Image;
var background , backgroundImage , restart,restartImage;
var obstacle1Image,obstale2Image,obstacle3Image,obstacle4Image;
var obstacle5Image,obstacle6Image,obstacle7Image,obstacle8Image

function preload(){
  
  //Load the  images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("photo2.jpg");
  jumpSound  = loadSound("jumpSound.mp3");
  restartImage = loadImage("restart.png");
}



function setup() {
  
  createCanvas(600,400);
  
  ground = createSprite(300,330,1300,17);
 
  monkey = createSprite(80,280);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.18;
  
 
  
  bananaGroup = createGroup();
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
  
  score = 0;
}


function draw() {
 
  background(220);
  
  text("Score: "+ score, 500,50);
  
  monkey.collide(ground);
  
  if (gameState === PLAY){
    ground.velocityX = -6;
    score = score + Math.round(getFrameRate()/60);
    
  if (ground.x < 0){
      ground.x = ground.width/2;
   }
  
  if (keyDown("space") && monkey.y >=159){
    monkey.velocityY = -18;
    jumpSound.play();
   }
  
  monkey.velocityY = monkey.velocityY + 0.8;
    
  food();
  obstacles();
    
      
  if(obstaclesGroup.isTouching(monkey)){
    obstacle.velocityX= 0;
    banana.velocityX = 0;
    monkey.velocityY = 0;
    gameState = END;
  }
  }
  
  else if (gameState === END){
    ground.velocityX = 0;
    
    if (keyDown("r")){
      gameState = PLAY;
      reset();
        }
    
    
  }
  
    
  
  
  
  
 
  

  
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  
  bananaGroup.destroyEach();
  obstaclesGroup.destroyEach();
  
  
  score = 0;
}
function food(){
   if (frameCount % 90=== 0){
     banana = createSprite(430,200,30,30);
     banana.y = Math.round(random(120,200));
     banana.velocityX = -5;
     banana.addImage(bananaImage);
     
     //adjust size
     banana.scale = 0.2;
     
     //assign lifetime
     banana.lifetime = -1;
     
     //adjust the depth
     monkey.depth = banana.depth
     monkey.depth = monkey.depth+1;
     
     bananaGroup.add(banana);
   }
}

function obstacles(){
  
  if (frameCount % 80 === 0){
    obstacle = createSprite(442,275,30,30);
    
    obstacle.addImage(obstacleImage);
    
    obstaclesGroup.add(obstacle);
                                                    obstacle.setCollider("rectangle",0,0,333,333);
  obstacle.debug = true;  
   
  obstacle.lifetime = -1;
  
  obstacle.velocityX = -6;
  obstacle.scale = 0.2;
  }
    
   
}
