var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var bgImage = new Image();
bgImage.src = "Images/bg.png";

function draw()
{
    drawBackground();
    
    requestAnimationFrame(draw);
}

draw();

function drawBackground()
{
    ctx.drawImage(bgImage, 0, 0);
}