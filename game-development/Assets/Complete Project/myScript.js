var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var score = 0;

var bird = new Image();
bird.src = "Images/bird.png";

var bgImage = new Image();
bgImage.src = "Images/bg.png";

var copterImg = new Image();
copterImg.src = "Images/copter.png";

var coin = new Image();
coin.src = "Images/coin.png";

var acceleration = false;

var running = true;

function update()
{
    if(running)
    {
        updateBackground();
        updateCopter();
        updateCoin();
        updateBirds();

        requestAnimationFrame(update);
    }
}

function draw()
{
    drawBackground();
    drawCopter();
    drawCoin();
    drawScore();
    drawBirds();
    
    requestAnimationFrame(draw);
}

update();
draw();

//BACKGROUND
var bgX = 0;
var bgY = 0;

function updateBackground()
{
    bgX = bgX - 2;
    
    if(bgX <= -856)
    {
        bgX = 0;    
    }
}

function drawBackground()
{
    ctx.drawImage(bgImage, bgX, bgY);
    ctx.drawImage(bgImage, bgX + 856, bgY);
}



//COPTER
var copterX = 30;
var copterY = 200;
var copterWidth = 131;
var copterHeight = 34;
var dy = 0;

var frameIndex = 0;

function updateCopter()
{
    frameIndex++;
    
    frameIndex = frameIndex%3;
    
    if(acceleration)
    {
        dy = dy - 0.5;  
    }
    else
    {
        dy = dy + 0.5;        
    }
    
    if(dy > 14)
    {
        dy = 14;  
    }
    if(dy < -14)
    {
        dy = -14;
    }
    
    copterY = copterY + dy*1.1;
    
    if(copterY < 0)
    {
        dy = 0;
        copterY = 0;
    }
    
    if(copterY + copterHeight > 480)
    {
        running = false;    
    }
}

function drawCopter()
{
    ctx.drawImage(copterImg, copterWidth *frameIndex, 0, 
                  copterWidth, copterHeight, copterX, copterY, copterWidth, copterHeight);
}


//coins
var coinWidth = 31;
var coinHeight = 46;

var coins = [];

var m = 0;

function addCoin() {
    var randomNumber = Math.floor(Math.random() * (450 - 10)) + 10;

    coins.push(860);
    coins.push(randomNumber);
    coins.push(0);
}

function drawCoin() {
    var i = 0;
    while (coins!= undefined && i < coins.length) {
        ctx.drawImage(coin, 0, coins[i + 2] * coinHeight, coinWidth, coinHeight, coins[i], coins[i + 1], coinWidth, coinHeight);
        i = i + 3;
    }
}

var d = new Date();
var d1 = d.getTime();

function updateCoin() {
    var f = new Date();
    diff = (f.getTime() - d1) / 1000;

    if (diff > 4) {
        var temp = new Date();
        d1 = temp.getTime();
        addCoin();
    }

    var i = 0;
    while (coins!= undefined && i < coins.length) {
        if (m % 3 == 0) {
            coins[i + 2] = coins[i + 2] + 1;
            coins[i + 2] = coins[i + 2] % 8;
            m = 0;
            
        }
        
        coins[i] = coins[i] - 2;
        
     
        if(coins[i] <= -10){
            var tempCount = i;
            var temp1 = coins[i]; 
            var temp2 = coins[i+1];
            var temp3 = coins[i+2];
            
            while(tempCount < coins.length){
                coins[tempCount] = coins[tempCount+3];
                coins[tempCount+1] = coins[tempCount+4];
                coins[tempCount+2] = coins[tempCount+5];
                tempCount = tempCount + 3;
            }
            coins.pop();
            coins.pop();
            coins.pop();
        }
        
        if (copterX < coins[i] + coinWidth &&
            copterX + copterWidth > coins[i] &&
            copterY < coins[i+1] + coinHeight &&
            copterHeight + copterY > coins[i+1]) {
                var tempCount = i;
                var temp1 = coins[i]; 
                var temp2 = coins[i+1];
                var temp3 = coins[i+2];

                while(tempCount < coins.length){
                    coins[tempCount] = coins[tempCount+3];
                    coins[tempCount+1] = coins[tempCount+4];
                    coins[tempCount+2] = coins[tempCount+5];
                    tempCount = tempCount + 3;
                }
            
                score++;
                
                coins.pop();
                coins.pop();
                coins.pop();
            }
        
        i = i + 3;
      
    }
    
    m++;
}


//BIRDS
var birdWidth = 101;
var birdHeight = 110;

var birds = [];

function addBirds() {
    var randomNumber = Math.floor(Math.random() * (450 - 10)) + 10;

    birds.push(860);
    birds.push(randomNumber);
    birds.push(0);
}

function drawBirds() {
    var i = 0;
    while (birds != undefined && i < birds.length) {
        ctx.drawImage(bird, 0, birds[i + 2] * birdHeight, birdWidth, birdHeight, birds[i], birds[i + 1], birdWidth, birdHeight);
        i = i + 3;
    }
}

var db = new Date();
var db1 = db.getTime();

var co = 0;

function updateBirds() {
    var f = new Date();
    
    //time difference in seconds
    diff = (f.getTime() - db1) / 1000;  

    if (diff > 8) {
        var temp = new Date();
        db1 = temp.getTime();
        addBirds();
    }

    var i = 0;
    while (birds != undefined && i < birds.length) {
        if (co % 7 == 0) {
            birds[i + 2] = birds[i + 2] + 1;
            birds[i + 2] = birds[i + 2] % 4;
            co = 0;
        }
        
        birds[i] = birds[i] - 4;
        
     
        if(birds[i] <= -10){
            var tempCount = i;
            var temp1 = birds[i]; 
            var temp2 = birds[i+1];
            var temp3 = birds[i+2];
            
            while(tempCount < birds.length){
                birds[tempCount] = birds[tempCount+3];
                birds[tempCount+1] = birds[tempCount+4];
                birds[tempCount+2] = birds[tempCount+5];
                tempCount = tempCount + 3;
            }
            
            birds.pop();
            birds.pop();
            birds.pop();
        }
        
       
        
        if (copterX < birds[i] + birdWidth &&
            copterX + copterWidth > birds[i] &&
            copterY < birds[i+1] + birdHeight &&
            copterHeight + copterY > birds[i+1]) {
                
                running = false;
                
            }
        
        i = i + 3;
      
    }
    
    co++;
}


//DRAW SCORE
function drawScore()
{
    ctx.font="25px Georgia";
    ctx.textAlign="right"; 
    ctx.fillText("Score : " + score, 846, 25);
}


//HANDLING KEYBOARD INPUT
document.onkeydown = function (event)
{
    if(event.keyCode == 32)
    {
        acceleration = true;    
    }
}

document.onkeyup = function (event)
{
    if(event.keyCode == 32)
    {
        acceleration = false;    
    }
}


