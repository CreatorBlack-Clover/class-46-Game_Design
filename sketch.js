var gameState = "start";
var bubbleImg, bubble,SceneSpeed, Edges;
var coinImg, coin, rockImg, rock, fishImg, fish, SceneImg, Scene;
var SI, startImg, start, stoneImg, stone, stoneGroup;
var Score = 0;
var Lives = 3;

function preload()
{
  BackgroundImg();
  fishImg = loadAnimation("Game_Sprites/fish_Img/fish1.png","Game_Sprites/fish_Img/fish2.png",
  "Game_Sprites/fish_Img/fish3.png","Game_Sprites/fish_Img/fish4.png");

  startImg = loadImage("Game_Sprites/Start.png");
  stoneImg = loadImage("Game_Sprites/StoneImg.png");
  coinImg = loadImage("Game_Sprites/CoinImg.png");

}

function setup() {
  createCanvas(800,650);
  SceneSpeed = 5;

  // scene of the game
  Scene = createSprite(width/2,-150,5,5);
  Scene.addImage("background",SceneImg);
  Scene.scale = 0.7;
  Scene.velocityY = SceneSpeed;

  // fish
  fish = createSprite(width/2, 570, 5,5);
  fish.addAnimation("fish",fishImg);
  fish.scale = 0.6;
  fish.setCollider("rectangle",0,0, 170, 370);
  //fish.debug = true;

  // start image
  start = createSprite(width/2, height/2 + 120, 5, 5); 
  start.addImage("start", startImg);
  start.scale = 0.2;

  Edges = createEdgeSprites();
  stoneGroup = createGroup();

}

function draw() {
  background("black");

  // When Game State is "Start"
  if(gameState === "start")
  {
    // Home Page
    Scene.scale = 2;
    Scene.y = height/2;
    Scene.velocityY = 0;

    // fish
    fish.visible = false;

    // changing game state
    if(mousePressedOver(start))
    {
      gameState = "play";
    }


  }

  // When Game State is "Play"
  if(gameState === "play")
  {

    // reseting the background
    if(Scene.y >= 900)
    {
      Scene.y = -150;
      Scene.x = random(390,410);
    }

    fish.collide(Edges[3]);
    start.visible = false;
    fish.visible = true;

    // fish movement controls

    if(keyDown("left") && fish.x > 0)
    {
      fish.x -= 5;
    }

    if(keyDown(RIGHT_ARROW) && fish.x < 800)
    {
      fish.x += 5;
    }    
    
    if(keyDown(UP_ARROW) && fish.y > 200)
    {
      fish.y -= 5;
    }    
    
    if(keyDown(DOWN_ARROW) )
    {
      fish.y += 5
    }

    // spawning obctacles
    spawnStone();

    // spawning coins
    spawnCoin();

    // failing
    if(stoneGroup.isTouching(fish))
    {
      stoneGroup.destroyEach();
      Lives = Lives - 1;
    }
    if(Lives <= 0)
    {
      fish.destroy();
      gameState = "end";
    }

    drawSprites();
  }

  // When Game State is "End"
  if(gameState === "end")
  {
    SceneSpeed = 0;
    stoneGroup.destroyEach();

  }

  drawSprites();
  if(gameState === "play")
  {
    // lives
    fill("white");
    stroke("black");
    strokeWeight(4);
    textSize(25);
    text("Lives:"+ Lives, 650, 50);
    // score
    text("Score:"+ Score, 650, 80);
  }

}


function BackgroundImg()
{
  if(gameState === "start")
  {
    SI = "Game_Sprites/HomeBG.jpg";
  }

  if(gameState === "play")
  {
    SI = "Game_Sprites/WaterBG.png";
  }
  SceneImg = loadImage(SI);

}

function spawnStone()
{
  
  if(frameCount % 100 === 0 )
  {
    stone = createSprite(random(0,800), 0, 5, 5);
    stone.addImage("obstacle", stoneImg);
    stone.scale = 0.3;
    stone.velocityY = 8;
    stone.lifetime = 80;
    stoneGroup.add(stone);
    //stone.debug = true;
  }

}

function spawnCoin()
{
  if(frameCount % 150 === 0 )
  {
    coin = createSprite(random(0,800), 0, 5, 5);
    coin.addImage("score", coinImg);
    coin.scale = 0.3;
    coin.velocityY = 7;
    coin.lifetime = 93;
    //stoneGroup.add(stone);
    //stone.debug = true;
  }
}




