var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;


function Ball()
{
    this.x = W/10;
    this.y=H/2;
    this.radius=(W+H)/100;
    this.gravity= 0.6;
    this.lift = -10;
    this.velocity=0;
    
    this.update = function(){
      if(flag>=1)
      {
        this.velocity+=this.gravity;
        this.y+=this.velocity;  
      }  
    
      if(this.y > H)
      {
          this.y=H;
          this.velocity=0;
      }

    }  

    this.show = function(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        ctx.fillStyle="red";
        ctx.fill();
    }

    this.up = function(){
      this.velocity+=this.lift;
    }  
}

function Pipe()
{
    this.x=W;
    this.width = W/20;
    this.space= H/10 + Math.random()*(H/2);
    this.height = Math.random()*H/2;
    
    this.show = function(){
        ctx.beginPath();
        ctx.fillStyle='white';
        ctx.fillRect(this.x,0,this.width,this.height);
        ctx.fillRect(this.x,this.height+this.space,this.width,H-this.height-this.space);
    }
    this.update = function()
    {
        this.x=this.x-5;
    }
}

var ball = new Ball();
var pipes = []
var frameRate = 0;
function animate()
{   
    frameRate++;
    if(frameRate%80==0)
    {
        pipes.push(new Pipe());
    }
    requestAnimationFrame(animate);
    ball.update();
  
    
  
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='black';
    ctx.fillRect(0,0,W,H);
    ball.show();
    
    for(var i=0;i<pipes.length;i++)
    {   
        pipes[i].show()
        pipes[i].update();
    }
        
    
}

animate();

var flag = 0;
window.addEventListener('keypress',function(event)
{   
    flag++;
    if(event.keyCode=='32')
    {
        ball.up();
    }
})