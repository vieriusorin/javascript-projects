var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var bgImage = new Image();
bgImage.src = "Images/bg.png";

var copterImg = new Image();
copterImg.src = "Images/copter.png";

var acceleration = false;

function update()
{
    updateBackground();
    updateCopter();
    
    requestAnimationFrame(update);
}

function draw()
{
    drawBackground();
    drawCopter();
    
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
}

function drawCopter()
{
    ctx.drawImage(copterImg, copterWidth *frameIndex, 0, 
                  copterWidth, copterHeight, copterX, copterY, copterWidth, copterHeight);
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


