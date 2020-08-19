var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;
var obstacleArray = [];
obstacleArray.push(new Obstacle);


function Obstacle()
{
    this.x = W/2;
    this.radius = (  W+H)/12.5;
    this.y = -2*this.radius;
    this.speed = 3;
    this.phaseAngle = 0;
    this.randomno = Math.floor(Math.random()*3)+2;
    this.random = Math.random();
    this.range = [0,0];
    this.show = function()
    {   
        var colours = ["red","yellow","blue","green"];
        for(i=0;i<this.randomno;i++)
        {
            ctx.beginPath();   
            ctx.arc(this.x,this.y,this.radius,i*(Math.PI*2/this.randomno)+this.phaseAngle ,(Math.PI*2/this.randomno)*(i+1)+this.phaseAngle,false);
            ctx.strokeStyle = colours[i];
            ctx.lineWidth = '20';   
            ctx.stroke();
            if(i==0)
            {
                this.range[0]= this.phaseAngle;
                this.range[1]=(Math.PI*2/this.randomno) +this.phaseAngle;
            }
        }
    } 

    this.update = function()
    {  
       if(flag>=1)
       {
        this.y+=this.speed;
        if(this.phaseAngle>2*Math.PI)
        {
            this.phaseAngle=0;
        }
        if(this.random>0.5)
        {
         this.phaseAngle+=0.03;
        }
        else
        {
            this.phaseAngle+=-0.03;
        }
     
    
       }
       
    
    //   console.log(this.range[0]/Math.PI  + "PI");
    //  console.log(this.range[1]/Math.PI  + "PI");
    // if(Math.abs( this.range[0])<Math.PI&& Math.abs(this.range[1])>Math.PI )
    // {
    //    console.log(this.range[0]);
       
    // }
      
      
       
       
    
    }

}

function Ball()
{
    this.x = W/2;
    this.y=7*H/10;
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

var ball = new Ball();

var frameCount = 0;
function animate()
{  
    frameCount++;
    requestAnimationFrame(animate);
    ball.update();
    ctx.clearRect(0,0,W,H);
    ball.show();
    collisionDetection();

    for(var i=0;i<obstacleArray.length;i++)
    { 
        obstacleArray[i].show();
        obstacleArray[i].update();
        // if(obstacleArray[i].y> H+obstacleArray[i].radius*2)
        // {
        //     obstacleArray.splice(i,1); 
        // }
       
    } 

    if(obstacleArray[obstacleArray.length-1].y>H/2)
    {
        obstacleArray.push(new Obstacle);   
    } 

    collisionDetection();

    

}



function distance(a, b) 
{
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
}

animate();
function collisionDetection()
{
    if(distance(ball,obstacleArray[0])<obstacleArray[0].radius + 20 && distance(ball,obstacleArray[0])>obstacleArray[0].radius)
    {
        // if(obstacleArray[0].range[0]<Math.PI && obstacleArray[0].range[1]>Math.PI)
        // {
        //     console.log(Math.random());
            
        // }
        
        for(var i=0;i<obstacleArray.length;i++)
        { 
            if(Math.abs( obstacleArray[i].range[0])<Math.PI&& Math.abs(obstacleArray[i].range[1])>Math.PI )
            {
               console.log(obstacleArray[i].range[1]);
               
            }
        } 
        
    }
    console.log("l"+obstacleArray[0].range);
    console.log("u"+obstacleArray[0].range[1]/Math.PI);
    
}
var flag = 0;
window.addEventListener('keypress',function(event)
{   
    flag++;
    if(event.keyCode=='32')
    {
        ball.up();
    }
})


