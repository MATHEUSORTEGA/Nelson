var bg,bgImg;
var floresta,caverna,floor;
var nelson,nelson2,rato,formiga,formigaIcon,formigaIconimg,countAnts,boloDeFormigueiro,position = 0,bala,plataforma,life,life1,life2,life3,lifes,shield,shield2 = 0,bossLife1,bossLife2,bossLife3,bossLife4,bossLife5,bossLife6,bossLife,ratLifeCount = 5;
var florestaimg,cavernaimg,semiCaverna,nelsonimg,nelson2img,nelson3img,nelson4img,nelson5img,nelson6img,nelsonXimg,nelsonYimg,nelsonZimg,ratoimg,moscaimg,mosca2img,formigaimg,
formiga2img,boloDeFormigueiroimg,balaimg,plataformaimg,lifeimg,endflash,backtime = 0,backtime2 = 0;
var randomAnts, leftAntsGroup, rightAntsGroup,bulletsGroup;
var chooseDirection = 0;
var fase =1;

//sempre carregar as imagens primeiro aqui
function preload(){
  nelsonimg = loadImage("nelson 2.png")
  nelson2img = loadImage("nelson.png")
  nelson3img = loadImage("nelson 3.png")
  nelson4img = loadImage("nelson 4.png")
  nelson5img = loadImage("nelson 5.png")
  nelson6img = loadImage("nelson 6.png")
  nelsonXimg = loadImage("nelsonX.png")
  nelsonYimg = loadImage("nelsonY.png")
  nelsonZimg = loadImage("nelsonZ.png")
  ratoimg = loadImage("rato1.png")
  formigaimg = loadImage("formiga.png")
  formiga2img = loadImage("formiga 2.png")
  formigaIconimg = loadImage("antIcon.png")
  boloDeFormigueiroimg = loadImage("bolo de formigueiro.png")
  florestaimg = loadImage("floresta.png")
  cavernaimg = loadImage("caverna.png")
  semiCaverna = loadImage("semi-caverna.png")
  lifeimg = loadImage("life.png")
  balaimg = loadImage("bala.png")
  plataformaimg = loadImage("plataforma.png")
  bossLife1 = loadImage("bossLife1.png")
  bossLife2 = loadImage("bossLife2.png")
  bossLife3 = loadImage("bossLife3.png")
  bossLife4 = loadImage("bossLife4.png")
  bossLife5 = loadImage("bossLife5.png")
  bossLife6 = loadImage("bossLife6.png")

}
//aqui cria as sprites quando forem uma vez só
function setup() {
  createCanvas(windowWidth,windowHeight);
  leftAntsGroup = new Group();
  rightAntsGroup = new Group();
  bulletsGroup = new Group();
  lifes = 3;
  shield = 0;
  countAnts = 20;
  formigaIcon = createSprite(250,80)
  nelson = createSprite(700,500)
  rato = createSprite(1150,2000)
  rato.visible = false
  plataforma = createSprite(200,400)
  plataforma.scale = 0.75
  plataforma.visible = false
  floor = createSprite(680,680,windowWidth)
  life1 = createSprite(1100,80)
  life2 = createSprite(1200,80)
  life3 = createSprite(1300,80)
  bossLife = createSprite(500,50)
  bossLife.scale = 1.5
  bossLife.visible = false
  floor.visible=0
  life = createSprite(980,80)
  life.addImage("lifeimg",lifeimg)
  life1.addImage("boloDeFormigueiroimg",boloDeFormigueiroimg)
  life2.addImage("boloDeFormigueiroimg",boloDeFormigueiroimg)
  life3.addImage("boloDeFormigueiroimg",boloDeFormigueiroimg)
  nelson.addImage("nelsonimg",nelsonimg)
  nelson.addImage("nelson4img",nelson4img)
  nelson.addImage("nelson2img",nelson2img)
  nelson.addImage("nelson3img",nelson3img)
  nelson.addImage("nelson5img",nelson5img)
  nelson.addImage("nelson6img",nelson6img)
  nelson.addImage("nelsonXimg",nelsonXimg)
  nelson.addImage("nelsonYimg",nelsonYimg)
  nelson.addImage("nelsonZimg",nelsonZimg)
  bossLife.addImage("bossLife1",bossLife1)
  bossLife.addImage("bossLife2",bossLife2)
  bossLife.addImage("bossLife3",bossLife3)
  bossLife.addImage("bossLife4",bossLife4)
  bossLife.addImage("bossLife5",bossLife5)
  bossLife.addImage("bossLife6",bossLife6)
  formigaIcon.addImage("formigaIconimg",formigaIconimg)
  rato.addImage("ratoimg",ratoimg)
  rato.addImage("boloDeFormigueiroimg",boloDeFormigueiroimg)
  plataforma.addImage("plataformaimg",plataformaimg)
  nelson.scale = 0.7
  life.scale = 0.2
  life1.scale = 0.3
  life2.scale = 0.3
  life3.scale = 0.3
  formigaIcon.scale = 0.5
  
}
// o que repete várias vezes
function draw() {
  // testa a quantidade de formigas que foram matadas
  // caso seja zero, passamos de fase
  if(fase == 1){
    if(countAnts == 0){
      if(nelson.x >= width){
        fase = 2
      }
      
    }

  background(florestaimg); 
// a cada 200 frames é criado uma formiga aleatoriamente
  if(frameCount%200==0){
    randomAnts = Math.round(random(1,2))
    if(randomAnts == 1){
      formiga = createSprite(0,490)
  formiga.addImage(formiga2img)
  formiga.scale = 0.7
  formiga.velocityX = 4
  leftAntsGroup.add(formiga);
    }
    if(randomAnts == 2){
      formiga = createSprite(1300,490)
      rightAntsGroup.add(formiga);
  formiga.addImage(formigaimg)
  formiga.scale = 0.7
  formiga.velocityX = -4
    }
    
  }

  // movimentos
  if(keyDown("a")){
    nelson.x-=16
    nelson.changeImage("nelson4img")
    chooseDirection = 1
  }
  if(keyDown("d")){
    nelson.x+=16
    nelson.changeImage("nelsonimg")
    chooseDirection = 0
  }
  if(nelson.collide(floor)){
  if(keyDown("SPACE")){
    nelson.velocityY -=40

  }
}
  if(keyWentDown("q")){
    if(chooseDirection == 0){
      nelson.changeImage("nelson2img")
      nelson.overlap(rightAntsGroup,function(colector,colected){
        colected.remove()
        countAnts-=1
      })
    }
    if(chooseDirection == 1){
      nelson.changeImage("nelson3img")
      nelson.overlap(leftAntsGroup,function(colector,colected){
        colected.remove()
        countAnts-=1
      })
    }
    
  }
  if(keyWentUp("q")){
    if(chooseDirection==0){
      nelson.changeImage("nelsonimg")
    }
    if(chooseDirection==1){
      nelson.changeImage("nelson4img")
    }
  }
    if(keyWentDown("e")){
      if(chooseDirection == 0){
        nelson.changeImage("nelsonXimg")
        nelson.overlap(rightAntsGroup,function(colector,colected){
          colected.remove()
          countAnts-=1
        })
        nelson.x += 70
      }
      if(chooseDirection == 1){
        nelson.changeImage("nelsonYimg")
        nelson.overlap(leftAntsGroup,function(colector,colected){
          colected.remove()
          countAnts-=1
        })
        nelson.x -= 70
      }
    } 
//codigo para quando o e for levantado voltar ao normal
    if(keyWentUp("e")){
      if(chooseDirection==0){
        nelson.changeImage("nelsonimg")
      }
      if(chooseDirection==1){
        nelson.changeImage("nelson4img")
      }
    
    }
    
  nelson.velocityY +=2
  nelson.overlap(leftAntsGroup,function(colector,colected){
    if(shield==0){
      lifes-=1
    }
    shield+=1
    nelson.changeImage("nelson5img")
  })
  nelson.overlap(rightAntsGroup,function(colector,colected){
    if(shield==0){
      lifes-=1
    }
    shield+=1
    nelson.changeImage("nelson6img")
  })
  if(shield>=80){
    shield=0
  }
  if(lifes==2){
    life3.destroy();
  }
  if(lifes==1){
    life2.destroy();
  }
  if(lifes==0){
    life1.destroy();
  }
  if(lifes  <=0){
    nelson.changeImage("nelsonZimg")
    fase  = 4
  }
  textSize(100)
  fill("black")
text(countAnts,100,130)

drawSprites();
  }
  
  //muda o fundo com o tempo como se fosse um flash
  if(fase == 2){
    formigaIcon.destroy();
    backtime+=1;
    leftAntsGroup.destroyEach();
    rightAntsGroup.destroyEach();
    nelson.collide(floor);
    
    if(keyDown("a")){
      nelson.x-=16
      nelson.changeImage("nelson4img")
      chooseDirection = 1
    }
    if(keyDown("d")){
      nelson.x+=16
      nelson.changeImage("nelsonimg")
      chooseDirection = 0
    }
    if(backtime>=0 && backtime<=10){
      background("lightgray")
      nelson.visible=false;
      nelson.x = width/2-160
    }
    if(backtime>=10 && backtime<=20){
      background("white")
      nelson.visible=false;
    }
    if(backtime>=20 && backtime<=30){
      background(semiCaverna)
      nelson.visible=true;
      
    }
    if(backtime>=30){
      background(semiCaverna)
    }
    if(nelson.x >= 650){
      backtime2+=1
    if(backtime2>=0 && backtime2<=10){
      background("lightgray")
      nelson.visible=false;
    }
    if(backtime2>=10 && backtime2<=20){
      background("white")
      nelson.visible=false;
    }
    if(backtime2>20){
      fase=3
    }
  }
    drawSprites();
}

  if(fase==3){
    background(cavernaimg);
    nelson.visible = true;
    plataforma.visible = true;
    nelson. scale = 0.55
    rato.visible = true
    rato.y = 500
    rato.scale = 1.2
    bossLife.visible = true
    if(keyDown("a")){
      nelson.x-=16
      nelson.changeImage("nelson4img")
      chooseDirection = 1
    }
    if(keyDown("d")){
      nelson.x+=16
      nelson.changeImage("nelsonimg")
      chooseDirection = 0
    }
    if(nelson.collide(floor)){
    if(keyDown("SPACE")){
      nelson.velocityY -=40
  
    }
  }
    if(keyWentDown("q")){
      if(nelson.isTouching(rato)){
        ratLifeCount -= 1
        if(ratLifeCount == 4){
          bossLife.changeImage("bossLife2")
        }
        if(ratLifeCount == 3){
          bossLife.changeImage("bossLife3")
        }
        if(ratLifeCount == 2){
          bossLife.changeImage("bossLife4")
        }
        if(ratLifeCount == 1){
          bossLife.changeImage("bossLife5")
        }
        if(ratLifeCount == 0){
          bossLife.changeImage("bossLife6")
          fase = 5
        }
      }
      if(chooseDirection == 0){
        nelson.changeImage("nelson2img")
      }
      if(chooseDirection == 1){
        nelson.changeImage("nelson3img")
      }
      
    }
    if(keyWentUp("q")){
      if(chooseDirection==0){
        nelson.changeImage("nelsonimg")
      }
      if(chooseDirection==1){
        nelson.changeImage("nelson4img")
      }
    }
    console.log(ratLifeCount)
      if(keyWentDown("e")){
        if(nelson.isTouching(rato)){
          ratLifeCount -= 1
          if(ratLifeCount == 4){
            bossLife.changeImage("bossLife2")
          }
          if(ratLifeCount == 3){
            bossLife.changeImage("bossLife3")
          }
          if(ratLifeCount == 2){
            bossLife.changeImage("bossLife4")
          }
          if(ratLifeCount == 1){
            bossLife.changeImage("bossLife5")
          }
          if(ratLifeCount == 0){
            bossLife.changeImage("bossLife6")
            fase = 5
          }
        }
        if(chooseDirection == 0){
          nelson.changeImage("nelsonXimg")
          nelson.x += 70
        }
        if(chooseDirection == 1){
          nelson.changeImage("nelsonYimg")
          nelson.x -= 70
        }
      } 
      if(keyWentUp("e")){
        if(chooseDirection==0){
          nelson.changeImage("nelsonimg")
        }
        if(chooseDirection==1){
          nelson.changeImage("nelson4img")
        }
      
      }
      nelson.velocityY +=2
      if(frameCount%100 == 0){
      bala = createSprite(rato.x-120,rato.y-20)
      bulletsGroup.add(bala);
      bala.addImage(balaimg)
      bala.scale = 0.4
      bala.velocityX = -10
      }
      if(bulletsGroup.isTouching(nelson)){
        if(shield2==0){
          if(lifes==2){
            life3.destroy();
          }
          if(lifes==1){
            life2.destroy();
          }
          if(lifes==0){
            life1.destroy();
          }
          if(lifes  <=0){
            nelson.changeImage("nelsonZimg")
            fase  = 4
          }
          lifes-=1
          shield2=1
        }
      }
      if(shield2 == 1){
        if(frameCount%100==0){
          shield2 = 0
        }
      }
      nelson.depth = 10
      if(position == 0){
        nelson.x = 400
        nelson.y = 580
        position = 1
      }

      if(nelson.y<400){
        nelson.collide(plataforma)
        plataforma.debug = false
        plataforma.setCollider("rectangle",0,0,100,100)
      }
      
    drawSprites();
  }
  if(fase == 5){
    background(cavernaimg)
    rato.changeImage("boloDeFormigueiroimg")
    rato.scale = 0.3
    nelson.collide(floor)
    fill("black")
    stroke("white")
    strokeWeight(50000)
    textSize(60)
    text("YOU WIN",width/2-100,height/2)
    plataforma.destroy()
    bossLife.destroy()
    life.destroy()
    life1.destroy()
    life2.destroy()
    life3.destroy()
    drawSprites();
  }
}

