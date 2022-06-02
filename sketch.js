var bg, bg_img;
var shooterimg,shootingimg;
var player;
var heart1,heart2,heart3,heart_img1,heart_img2,heart_img3;
var zombie_img,zombie,zombiegroup,bulletgroup;

var bullets=70;
var bullet_img;

var gameState = "fight"
var life = 3;
var score = 0;

var win,lose,explosion;


function preload(){
  shooterimg = loadImage("assets/shooter_2.png")
  shootingimg  = loadImage("assets/shooter_3.png")
  bg_img = loadImage("assets/bg.jpeg")
  heart_img1= loadImage("assets/heart_1.png")
  heart_img2=loadImage("assets/heart_2.png")
  heart_img3 = loadImage("assets/heart_3.png")
  zombie_img= loadImage("assets/zombie.png")
  bullet_img = loadImage("assets/bullet.png")
  win = loadSound ("assets/win.mp3")
  lose = loadSound("assets/lose.mp3")
  explosion = loadSound("assets/explosion.mp3")
}


function setup(){
  createCanvas(windowWidth , windowHeight)
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bg_img)
  bg.scale = 1.1

  player = createSprite(displayWidth-1150,displayHeight - 300,50,50)
  player.addImage(shooterimg)
  player.scale = 0.3


  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage(heart_img1)
  heart1.scale =0.4


  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage(heart_img2)
  heart2.scale =0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage(heart_img3)
  heart3.scale =0.4

  zombiegroup = new Group()
  bulletgroup = new Group()


}


function draw(){
  background(0)
  if(gameState==="fight"){
if(life === 3){
  heart3.visible = true
  heart2.visible = false
  heart1.visible = false
}
if(life === 2){
  heart3.visible = false
  heart2.visible = true
  heart1.visible = false
}
if(life === 1){
  heart3.visible = false
  heart2.visible = false
  heart1.visible = true
}
  if(life===0){
    gameState = "lost"

  }
  if(score === 100){
    gameState = "win"
    win.play()
  }

  if(keyDown(UP_ARROW)){
    player.y = player. y - 10
  }
  if(keyDown(DOWN_ARROW)){
    player.y = player. y + 10
  }
  if(keyWentDown("space")){
    bullet = createSprite(displayWidth - 1150 ,player.y-30,20,10)
    bullet.addImage(bullet_img)
    bullet.scale = 0.05
    bullet.velocityX = 20
    bulletgroup.add(bullet)
    player.depth = bullet.depth
    player.depth = player.depth+2
    player.addImage(shootingimg)
    bullets = bullets-1
    explosion.play()


    textSize(30)
  
  text("bullets:"+bullets,400,400)

  }
  else if(keyWentUp("space")){
    player.addImage(shooterimg)
  }
  if(bullets===0){
    gameState = "bullet"
    lose.play()
  }
  if(zombiegroup.isTouching(bulletgroup)){
    for(var i = 0 ; i< zombiegroup.length ;i++){
      if(zombiegroup[i].isTouching(bulletgroup)){
        zombiegroup[i].destroy()
        bulletgroup.destroyEach()
        score = score+2;

      }
    }
  }
  if(zombiegroup.isTouching(player)){
    lose.play()
    for(var i = 0 ; i< zombiegroup.length ;i++){
      if(zombiegroup[i].isTouching(player)){
        zombiegroup[i].destroy()
        life = life-1;

      }
    }
  }
  createZombies()
}

  drawSprites()
  textSize(20)
  fill("white")
  text("BULLETS:"+bullets,displayWidth-210,displayHeight/2-250)
  
  textSize(20)
  fill("yellow")
  text("LIFE:"+life,displayWidth-210,displayHeight/2-220)

  textSize(20)
  fill("red")
  text("SCORE:"+score,displayWidth-210,displayHeight/2-280)
  
  




  if(gameState==="lost"){
    textSize(100)
    fill("red")
    text(" YOU LOSE", 400  ,400)
    zombiegroup.destroyEach()
    player.destroy()

  }
  else if (gameState==="win"){
    textSize(100)
    fill("red")
    text(" YOU WIN", 400  ,400)
    zombiegroup.destroyEach()
    player.destroy()
  }
  else if ( gameState === "bullet"){
    textSize(50)
    fill("red")
    text(" YOU RAN OUT OF  BULLETS", 400 ,400)
    zombiegroup.destroyEach()
    player.destroy()
    bulletgroup.destroyEach()
  }
}


function createZombies(){
  if(frameCount % 100 === 0){
    zombie = createSprite(random(500,1500),random(100,500),40,40)
    zombie.addImage(zombie_img)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.lifetime = 400
    zombiegroup.add(zombie)
  }
}
