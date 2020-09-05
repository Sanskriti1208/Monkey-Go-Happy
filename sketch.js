// global variables
var play = 1;
var end = 0;
var gameState = play;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var ground, groundImage, base;

// score
var SurvivalTime = 0;

// preloading images
function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundImage = loadImage("9aed3687fef740909aae57bedaf90998.jpg");
}

// setting up yhe canvas and sprites present in game
function setup() {
  createCanvas(400, 400);

  // ground sprite
  ground = createSprite(300, 200, 20, 20);
  ground.addImage(groundImage);
  ground.scale = 1.5;

  // monkey sprite
  monkey = createSprite(70, 300, 20, 20);
  monkey.addAnimation("monakey", monkey_running);
  monkey.scale = 0.15;

  // making groups
  FoodGroup = new Group();
  obstacleGroup = new Group();

  // making base
  base = createSprite(200, 390, 1000, 50);
}

// loop
function draw() {
  // background color
  background("green");
  
  if (gameState === play){

  // jumping function but i don't know what error came
  if (keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  // moving ground
  base.velocityX = -6;
  if (base.x < 0) {
    base.x = ground.width / 2;
  }

  // moving background
  ground.velocityX = -15;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  // calling food function
  food();
  // calling obstacle function
  obstacles();
    
  SurvivalTime = Math.ceil(frameCount / frameRate());
  }
    
  
  
  // monkey colliding with base
  monkey.collide(base);
  
  // drawing the sprites
  drawSprites();
  
  // text functions but i can't do
  fill(0);
  stroke(0);
  textSize(20);
  text("Score: " + SurvivalTime, 270, 50);
}

// making food function
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(700, 200, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -15;
    banana.y = Math.round(random(120, 200));
    banana.lifetime = 150;
    FoodGroup.add(banana);
  }
}

// making obstacle function
function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(500, 360, 20, 20);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.5;
    obstacle.velocityX = -15;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}