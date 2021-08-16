var PLAY = 1;
var END = 0;
var gameState = PLAY;


var ship,earth,arrow,Score;
var arrowGroup,enemyG;
var backgroundImg,shipImg,earthImg,scoreImg,rewardImg,restartImg,enemyImg,enemyImg1,weaponImg,gameOverImg;
var score = 0;

function preload(){
  shipImg = loadImage("ship1.png")
  backgroundImg = loadImage("backG.png")
  earthImg = loadImage("earth.png")
  scoreImg = loadImage("score.png")
  rewardImg = loadImage("reward.png")
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  enemyImg = loadImage("enemy.png")
  enemyImg1 = loadImage("enemy1.png")
  weaponImg = loadImage("weapon.png")
  
}

function setup(){
  createCanvas(1000,800)
  
  earth = createSprite(500,800,30,30)
  earth.addImage("earth",earthImg)
  earth.rotationSpeed = 2
  earth.scale = 0.8
  
  ship = createSprite(500,700,30,30)
  ship.addImage("ship",shipImg)
  ship.scale = 1.2
  
  score = 0;
  arrowGroup= new Group();
  enemyG= new Group();
  
  gameOver = createSprite(500,320);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.1;
  
  restart = createSprite(500,400);
  restart.addImage(restartImg);

   gameOver.visible = false;
   restart.visible = false;
  
  Score = createSprite(50,50,30,30)
  Score.addImage("scor",scoreImg)
  Score.scale = 1.3
  }

function draw(){
  background(backgroundImg)
  
  if(gameState === PLAY){

  
  if(keyDown(RIGHT_ARROW)){
    ship.x = ship.x+7
  }
  if(keyDown(LEFT_ARROW)){
    ship.x = ship.x-7
  }
  
  if(keyDown("space")){
    createArrow();
  }
  
  
    
  spawnEnemy();
  
  if(arrowGroup.isTouching(enemyG)){
    enemyG.destroyEach();
    arrowGroup.destroyEach()
    score = score+1
  }
     
  if(enemyG.isTouching(ship)){
    gameState = END;
      }  
  
  } else {
    
    
    enemyG.destroyEach();
    arrowGroup.destroyEach();
    ship.visible  = false;
    
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)) {
      reset();
    }

  }
  drawSprites();
  stroke("purple")
  textSize(50)
  text(score,36,67)
  
}

function reset(){
  
     gameState = PLAY;
    
     gameOver.visible = false;
     restart.visible = false;
     ship.visible  = true;
     
     score = 0;
}



function spawnEnemy(){
 if (frameCount % 50 === 0){
   var arrow = createSprite(Math.round(random(50,950)),0,30,40);
   arrow.velocityY = (5 + score/5);
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: arrow.addImage(enemyImg);
              break;
      case 2: arrow.addImage(enemyImg1);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    arrow.scale = 0.2;
    arrow.lifetime = 400;
   
   //add each obstacle to the group
    enemyG.add(arrow);
 }
}

function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(weaponImg);
  arrow.x= ship.x-9;
  arrow.y= ship.y-58;
  arrow.velocityY = -5;
  arrow.lifetime = 130;
  arrow.scale = 0.5;
  arrowGroup.add(arrow);
  
}