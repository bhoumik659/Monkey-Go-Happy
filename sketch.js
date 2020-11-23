var tree, treeImage, moon, moonImage, monkey_stop
var monkey , monkey_running, ground, groundImage,invisiGround
var banana ,bananaImage, obstacle, obstacleImage
var food, obstacles
var score, survival_time
var gamestate, gameover, gameoverimage, restart, restartimage
gamestate=0
score = 0
survival_time = 0
function preload(){
  
  obstacleImage = loadImage("obstacle.png")
  bananaImage = loadImage("banana.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  groundImage = loadImage("ground.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  treeImage = loadImage("tree.png");
  moonImage = loadImage("moon.png");
  monkey_stop = loadAnimation("sprite_0.png")
  gameoverimage = loadImage("gameover.png")
  restartimage = loadImage("reset.jpg")
}


function setup() {
  createCanvas(500,600)
  
  tree = createSprite(250,340)
  tree.addImage(treeImage)
  
  gameover = createSprite(250,300)
  gameover.addImage(gameoverimage)
  gameover.scale=0.5
  
  restart = createSprite(250,480)
  restart.addImage(restartimage)
  restart.scale=0.3
  
  monkey = createSprite(50,520)
  monkey.addAnimation("monkey", monkey_running)
  monkey.addAnimation("stop",monkey_stop)
  monkey.scale=0.1
  
  ground = createSprite(300,600,600,10) 
  ground.addImage(groundImage)
  ground.scale=2.5
  
  moon = createSprite(450,90)
  moon.addImage(moonImage)
  moon.scale=0.3
  
  invisiGround = createSprite(300,550,600,10)
  invisiGround.visible=false
  
  food = new Group()
  obstacles = new Group()
  tree.depth=ground.depth
  tree.depth=tree.depth+1
  monkey.depth=tree.depth
  monkey.depth=monkey.depth+1
  gameover.depth=tree.depth
  gameover.depth=gameover.depth+1
  restart.depth=gameover.depth
  restart.depth=gameover.depth+1
}


function draw() {
  background("#1D0328") 
  fill("white")
  textSize(40)
  stroke("black")
  strokeWeight(12)
  text("SCORE: " + score,20,50)
  textSize(40)
  text("SURVIVAL TIME:" + survival_time,20,100)
  monkey.collide(invisiGround);
  
  if (gamestate === 0){
    ground.velocityX=-4
    restart.visible=false
    gameover.visible=false
    if(frameCount % 15 === 0){
      survival_time=survival_time+1
    }
    if(ground.x<90) {
      ground.x = ground.width/1.5;
    }
  
    if(keyDown("space") && monkey.y === 514.3){
      monkey.velocityY=-20
    }
    
    if(monkey.isTouching(food)){
      food.destroyEach()
      score=score+1
    }
    monkey.velocityY=monkey.velocityY+1
    
    if(monkey.isTouching(obstacles)){
      gamestate = 1;
    }
    obs()
    drawBanana()
}
  if (gamestate === 1){
    monkey.setVelocity(0,0)
    obstacles.setVelocityEach(0,0)
    food.setVelocityEach(0,0)
    ground.setVelocity(0,0)
    food.setLifetimeEach(-1)
    monkey.changeAnimation("stop",monkey_stop)
    gameover.visible=true
    restart.visible=true
    if (mousePressedOver(restart)){
      reset()
    }
  }
  
  drawSprites()
}

function drawBanana() {
  if (frameCount % 130 === 0){
    banana = createSprite(500,Math.round(random(330,420)))
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.velocityX=-4
    banana.lifetime=130
    food.add(banana)
  }
}

function obs() {
  if (frameCount % 120 === 0){
    obstacle = createSprite(500,520)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX=-5
    obstacle.scale=0.12
    obstacles.add(obstacle)
  }
}

function reset() {
  gamestate=0
  food.destroyEach();
  obstacles.destroyEach();
  monkey.changeAnimation("monkey")
  score=0
  survival_time=0
}




