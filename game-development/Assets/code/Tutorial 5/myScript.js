var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var bgImage = new Image();
bgImage.src = "Images/bg.png";

var copterImg = new Image();
copterImg.src = "Images/copter.png";

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

var frameIndex = 0;

function updateCopter()
{
    frameIndex++;
    
    frameIndex = frameIndex%3;
}

function drawCopter()
{
    ctx.drawImage(copterImg, copterWidth *frameIndex, 0, 
                  copterWidth, copterHeight, copterX, copterY, copterWidth, copterHeight);
}