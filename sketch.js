//Create variables here
var GameState = 0;
var Goku,GokuImg,GokuImg2,GokuImg3,GokuImg4;
var Enemy,EnemyImg,EnemyIMg2,EnemyGroup;
var Restart,RestartImg;
var GameOver,GamerOverImg;
var PowerBall,PowerBallImg;
var Dragonball,DragonballImg,DragonballGroup,Dragonball1,DragonballGroup2;
var Img,Imgimage;
var BAckground,BAckgroundImg;
var Mypower,MypowerImg;
var Direction = "MOVE"

function preload()
{
  //load images here
  GokuImg = loadImage("23-237025_goku-pixel-art-dragon-ball-z-goku-clipart.png")
  BAckgroundImg = loadImage("Background.png")
  EnemyImg = loadImage("2.png")
  EnemyIMg2 = loadImage("images.png")
  RestartImg = loadImage("555-5555165_restart-button-being-more-experienced-team-leaders-so.png")
  PowerBallImg = loadImage("dragon-ball.png")
  GamerOverImg = loadImage("gameover.png")
  DragonballImg = loadImage("hakai-energy-energy-of-destruction-illustration-of-pink-ball-png-clipart.png")
  Imgimage = loadImage("download.png")
  MypowerImg = loadImage("pngtree-red-heart-icon-isolated-png-image_1726594.png")
  GokuImg2 = loadImage("468-4687320_goku-super-saiyan-pixel-art-hd-png-download.png")
  GokuImg3 = loadImage("468-4687320_goku-super-saiyan-pixel-art-hd-png-download2.png")
  
}

function setup() {
  createCanvas(900, 600);
  BAckground = createSprite(450,300,20,20)
  BAckground.addImage("back",BAckgroundImg)
  BAckground.scale = 1.5
  BAckground.visible = false;
  BAckground.velocityX = -6
 Goku = createSprite(450,500,20,20)
 Goku.addImage("Gokurightwalk",GokuImg2);
 Goku.addImage("Gokuleftwalk",GokuImg3);

 Goku.scale = 0.3;
 Goku.visible = false;

 Img = createSprite(450,300,20,20)
 Img.addImage("image",Imgimage)

 Mypower = createSprite(50,50,20,20)
 Mypower.addImage("Power",MypowerImg)
 Mypower.scale = 0.1;
 

 invisibleGround = createSprite(450,570,1300,10);
 invisibleGround.visible = false;

 gameOver = createSprite(450,300);
 restart = createSprite(440,420);

 gameOver.addImage(GamerOverImg);
 gameOver.scale = 0.3;

 restart.addImage(RestartImg);
 restart.scale = 0.18;

 gameOver.visible = false;
 restart.visible = false;

 Goku.setCollider("circle",40,25,200)
 
 


 PowerBallGroup = new Group()
 DragonballGroup = new Group();
 DragonballGroup2 = new Group();
 EnemyGroup   = new Group()
  score = 0
  Point = 0
  health = 3
}


function draw() {  
  background("white");
  
  BAckground.velocityX = -6
      if (BAckground.x < 0){
        BAckground.x = BAckground.width/2;
      }
      Goku.collide(invisibleGround);
  if (GameState === 0){
    fill("black")
    textSize(20)
    text("Before you start the game a very important details for you",100,100)
    text("To start the game press e, to throw power ball press q , to jump press space",100,140)
    text("To go Right press Right Arrow, and to go Left press Left Arrow",100,180)
    text("To get PowerBall power reach 10 Dragon ball",100,250)
    text("You have only 3 lives",100,220)
    textSize(30)
    text("Welcome to ",100,325)
    if (keyDown("e")) {
      GameState = 1
      
    }
  }


 if (GameState === 1){
  BAckground.visible = true;
  Goku.visible = true; 
  Img.visible = false;
  if(Point>0){
    if (keyDown("q") && Direction === "RIGHT") {
      createBall();
      
    }else if(keyDown("q") && Direction === "LEFT"){
      createBall2();
    }
  }
  if(Point>9){ 
    if(keyDown("space") && Goku.y >= 470 ) {
      Goku.velocityY = -22;
      
      }
  
      Goku.velocityY = Goku.velocityY + 0.9
     
  }
  else
  {
    if(keyDown("space") && Goku.y >= 470) {
      Goku.velocityY = -19;
     
      }
  
      Goku.velocityY = Goku.velocityY + 0.9
  }
  

  



   if(keyDown("LEFT_ARROW")){
    Goku.x = Goku.x-10;
    if(Goku.y>=470){
      Goku.changeImage("Gokuleftwalk",GokuImg3);
    }
    Direction = "LEFT"
   }
   if(keyDown("RIGHT_ARROW")){
    Goku.x = Goku.x+10;
    if(Goku.y>=470){
    Goku.changeImage("Gokurightwalk",GokuImg2);
    }
    Direction = "RIGHT"
   }

  if(DragonballGroup.isTouching(EnemyGroup)){
    score=score+1;
    DragonballGroup.destroyEach();
    EnemyGroup.destroyEach();
  }

  if(DragonballGroup2.isTouching(EnemyGroup)){
    score=score+1;
    DragonballGroup2.destroyEach();
    EnemyGroup.destroyEach();

  }

  if(Goku.isTouching(PowerBallGroup)){
    Point=Point+1;
    PowerBallGroup.destroyEach();

  }

  Spawnenemy();
  spawnPowerBall()


 if(Goku.isTouching(EnemyGroup)){
  health = health-1;
  EnemyGroup.destroyEach()
 }

 if(health === 0 && GameState === 1){
  GameState = 2
 }



 }



 if (GameState === 2){
  gameOver.visible = true;
  restart.visible = true;
  Img.visible = false;
  restart.depth = Goku.depth;
  restart.depth =  restart.depth+1
 //set velcity of each game object to 0
 BAckground.velocityX = 0;
  Goku.velocityY = 0;
  Goku.velocityX = 0;
  EnemyGroup.setVelocityXEach(0);
 PowerBallGroup.setVelocityXEach(0);
 DragonballGroup.setVelocityXEach(0);
 //set lifetime of the game objects so that they are never destroyed
 EnemyGroup.setLifetimeEach(-1);
 PowerBallGroup.setLifetimeEach(-1);
 DragonballGroup.setLifetimeEach(-1);
 DragonballGroup2.setLifetimeEach(-1);
 if(mousePressedOver(restart)){
   reset();
 }
 }

 




 

   drawSprites();
   fill("black")
   textSize(20)
   text("Score: "+ score, 500,50);
   text("DragonBall: "+ Point, 500,70);
   textSize(28)
   text(health, 80,57);
 }


 function createBall() {
  var Dragonball= createSprite(50, 500, 60, 10);
  Dragonball.addImage(DragonballImg);
  Dragonball.x = Goku.x+40;
  Dragonball.y=Goku.y;
  Dragonball.velocityX = 15;
  Dragonball.lifetime = 150;
  Dragonball.scale = 0.1;
  DragonballGroup.add(Dragonball);
  Dragonball.depth = Goku.depth;
  Goku.depth =  Goku.depth + 1;
  return Dragonball;

}

function createBall2() {
  var Dragonball1= createSprite(50, 500, 60, 10);
  Dragonball1.addImage(DragonballImg);
  Dragonball1.x = Goku.x-40;
  Dragonball1.y=Goku.y;
  Dragonball1.velocityX = -15;
  Dragonball1.lifetime = 150;
  Dragonball1.scale = 0.1;
  DragonballGroup2.add(Dragonball1);
  Dragonball1.depth = Goku.depth;
  Goku.depth =  Goku.depth + 1;
  return Dragonball1;

}

 function Spawnenemy(){
  if(frameCount % 200 === 0) {
    var Enemy = createSprite(920,495,10,40);
    position = Math.round(random(1,2))
    
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: Enemy.addImage(EnemyImg);
              break;
      case 2: Enemy.addImage(EnemyIMg2);
              break;     
      default: break;
    }

    Enemy.scale = 0.5;
    Enemy.lifetime = 250;
     if(position == 1){
     Enemy.x = 920;
     Enemy.velocityX = -(6 + 3*score/20);
     }
     else
     {
      if(position == 2){
        Enemy.x = -20;
        Enemy.velocityX = (6 + 3*score/20);
      }

     }
    
    //add each obstacle to the group
    EnemyGroup.add(Enemy);

    Enemy.depth = Goku.depth;
    Goku.depth =  Goku.depth + 1;

  }

}





function spawnPowerBall() {
  //write code here to spawn the cheese
  if (frameCount % 150 === 0) {
    PowerBall= createSprite(920,250,40,10);
    PowerBall.y = Math.round(random(150,380));
    PowerBall.addImage(PowerBallImg);
    PowerBall.scale = 0.1;
    PowerBall.velocityX = -(6 + 3*score/20);
   //assign lifetime to the variable
   PowerBall.lifetime = 220;
  
   //adjust the depth
   PowerBall.depth = Goku.depth;
   Goku.depth =  Goku.depth + 1;
  
    //add each cheese to the group
    PowerBallGroup.add(PowerBall);
}

}
function reset(){
  GameState=1;
  gameOver.visible=false;
  restart.visible=false;
  EnemyGroup.destroyEach();
  PowerBallGroup.destroyEach();
  DragonballGroup.destroyEach();
  score=0;
  Point = 0;
  health = 3;
  Goku.x = 650;
  Goku.y = 500;
}