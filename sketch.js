var gameState = "start",number;
var startState, clone, bgImage, bg, ghost, turtleImg, enemyImg, enemy, kale, kaleImg, fish, fishImg;
var kaleScore = 0, turtleLife = 3, fishScore = 0;
var bgMusic, shark, sharkImg;

function preload() {
  bgImage = loadImage("images.png")
  turtleImg = loadImage("turtle.png")
  enemyImg = loadImage("enemy1.png")
  kaleImg = loadImage("kale.png")
  fishImg = loadImage("fish-removebg-preview (1).png")
  bgMusic = loadSound("background_music.wav");
  sharkImg = loadImage("shark.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  startState = new StateChange();

  bg = createSprite(windowWidth / 2, windowHeight / 2);
  bg.addImage("infinite bg", bgImage);
  bg.scale = 8;

  clone = createSprite(100, windowHeight / 2 - 100);
  clone.shapeColor = "blue"
  clone.scale = 0.35
  clone.visible = false;
  clone.addImage(turtleImg);
  //clone.debug = true;
  clone.setCollider("rectangle", 0, 0, 150, 170);
 
  enemyGroup = new Group();
  kaleGroup = new Group();
  sharkGroup = new Group();
  fishGroup = new Group();

}

function draw() {
  background(0);
  drawSprites();

   //player control
  if (keyIsDown(UP_ARROW)) {
    clone.y = clone.y - 3.75
  }
  if (keyIsDown(DOWN_ARROW)) {
    clone.y = clone.y + 3.75
  }
  if (keyIsDown(LEFT_ARROW)) {
    clone.x = clone.x - 3.75
  }
  if (keyIsDown(RIGHT_ARROW)) {
    clone.x = clone.x + 3.75
  }

  //infinite bg
  if (bg.x < windowWidth / 2 - 100) {
    bg.x = windowWidth / 2;
  }

  // if(!bgMusic.isPlaying()){
  //     bgMusic.play()
  // }

  //THE MOUSE CURSOR
  // fill("white");
  // text(mouseX + "," + mouseY, mouseX, mouseY);

  textSize(40);
  fill ("white");
  
  text("Life Remaining: "  + turtleLife , windowWidth/2 - 100 , 60);

  if (gameState === "start") {
    startState.display();
  }
  if (gameState === "play") {
  
    text("Kale Consumed: "  + kaleScore , windowWidth - 400 , 60);
    
    clone.visible = true;
    bg.velocityX = -3;
   
    //fish.visible = false;

    createEnemyLevel1();
   

    //infinite bg
    // if (bg.x < windowWidth / 2 - 100) {
    //   bg.x = windowWidth / 2;
    // }

    //Resetting the clone to it's initial position
    if (enemyGroup.isTouching(clone)) {
      clone.x = 100;
      clone.y = windowHeight / 2 - 100;
      turtleLife = turtleLife -1;
      
    }

    if(turtleLife <=0){
      gameState="over"
    }

    createKale();

    if ( kaleGroup.isTouching(clone)) {
      kaleGroup[0].destroy();
      kaleScore = kaleScore + 5;
    }

    if(kaleScore == 10){
     gameState = "level2"
     swal({
        title:"Congratulations",
        text: "LEVEL 2",
        imageUrl: "https://media.tenor.com/3pISrJViDtYAAAAC/level2-swim.gif",
        imageSize: "300x300",
        confirmButtonText:"Continue?"
      },
      function(isConfirm){
       if(isConfirm){
        gameState = "level2"
       }
      }
     )
    
    }

  }

  if(gameState === "level2"){

    text("Fish Consumed: "  + fishScore , windowWidth - 400 , 60);
    createEnemyLevel1();
    sharksNPC();
    createFish();

    if ( fishGroup.isTouching(clone)) {
      fishGroup[0].destroy();
      fishScore = fishScore + 5;
    }

    if(fishScore == 10){
     swal({
        title:"Congratulations",
        text: "YOU WIN",
        imageUrl: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2tkM3Z0Nzh1ZXkzY3ZibWl4MXJ2MDk1dWIzMnVmbzAzc3A5bmc5bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6KoZJly4uLqMg/giphy.gif",
        imageSize: "300x300",
        confirmButtonText:"PLAY AGAIN"
      },
      function(isConfirm){
       if(isConfirm){
       window.location.reload();
       }
      }
     )

    if (enemyGroup.isTouching(clone)) {
      clone.x = 100;
      clone.y = windowHeight / 2 - 100;
      turtleLife = turtleLife -1; 
    }

    if (sharkGroup.isTouching(clone)) {
      clone.x = 100;
      clone.y = windowHeight / 2 - 100;
      turtleLife = turtleLife -1;
    }

    if(turtleLife <=0){
      gameState="over";  
    }
  }
}

  if(gameState === "over"){
    swal({
      title:"YOU LOSE",
      text: "Better Luck next time",
      imageUrl: "https://media.tenor.com/nxhUu3oob8wAAAAM/turtle-upsidedownturtle.gif",
      imageSize: "300x300",
      confirmButtonText:"Play Again?"
    },
    function(isConfirm){
     if(isConfirm){
      window.location.reload()
     }
    }
   )
  }
}

//NPC
function createEnemyLevel1() {
  if (frameCount % 35 == 0) {
    enemy = createSprite(random(windowWidth / 2 - 400, windowWidth / 2 + 600), windowHeight / 2 - 300)
    enemy.addImage(enemyImg)
    enemy.scale = 0.45
    enemy.velocityY = 5;
    enemy.lifetime = windowHeight / 5;
    //enemy.debug = true;
    enemyGroup.add(enemy);
  }
} 


function sharksNPC() {
  if(frameCount % 35 == 0) {
    shark = createSprite(windowWidth, random(40, windowHeight-40));
    shark.addImage(sharkImg)
    shark.scale = 0.4
    shark.velocityX = -5
    shark.lifetime = windowWidth / 5;
    sharkGroup.add(shark)
  }
}

function createKale(){
  if(frameCount% 200 ===0){
    kale = createSprite(random(60,windowWidth - 100), (60,windowHeight-200))
    kale.addImage(kaleImg);
    kale.scale = 0.35;
    kaleGroup.add(kale);
  }
}

function createFish() {
  if(frameCount% 200 ===0) {
    fish = createSprite(random(60,windowWidth - 100), (60,windowHeight-200));
    fish.addImage(fishImg);
    fish.scale = 0.35;
    fishGroup.add(fish);
  }
}

