var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;
var numberOfObstacles=50;
var playerScore = 0;
var Highscore = [];

//function to draw the ball.
window.onload = function(){
    ctx.beginPath();
    ctx.arc(W/2,9*H/10,(W+H)/150,0,Math.PI*2,true);
    ctx.fillStyle="#c70039";
    ctx.fill();
}
var toggle=0;
document.querySelector("body").addEventListener('keypress',function(){
    
    
    if(toggle==0)
    {
       toggle=1;
       
    }
    else
    {
      toggle=0;
     
    }
   
    
});

var initVal = [];//Array storing Phase angles.
for(i=0;i<numberOfObstacles;i++)
{
    initVal.push(Math.random()*Math.PI);
}
var ycord=[] ; // Array storing y-coordinates of obstacles.
var y_obst = H/2;
var dy_obst= 2;
var obstacleRadius = (W+H)/20;

//function to animate the obstacles.
function animateObstacle()
{ 
  requestAnimationFrame(animateObstacle);
  //function to translate obstacles if ball crosses H/2.
    if(y<H/2)
    {
    
      for(i=0;i<numberOfObstacles;i++)
      { 
        ctx.clearRect(W/2 - obstacleRadius-10, ycord[i] - obstacleRadius-10, 2*obstacleRadius+40, 2*obstacleRadius+40);
        ctx.clearRect(W/2-W/80,ycord[i+1]+(ycord[i]-ycord[i+1])/2-W/80, 2*W/80, 2*W/80);
        if(toggle==0)
        {
            ycord[i]=ycord[i]+dy_obst;
        }
        
        colorRatio();
      }
    }

   //making the obstacle rotate.
    for(i=0;i<numberOfObstacles;i++)
    {   
        colorRatio();
        if(toggle==0)
        {
            initVal[i]+=0.03;
        }
      
        if(initVal[i]>=100*Math.PI)
        {
            initVal[i]==0;
        }
        // if(y<ycord[i]+obstacleRadius && y>(ycord[i]-obstacleRadius))
        // {    
        //     if(y-(ycord[i+1]+(ycord[i]-ycord[i+1])/2)<5 &&y-(ycord[i+1]+(ycord[i]-ycord[i+1])/2)>-(ycord[i]-ycord[i+1])/2)
        //     {
        //        ctx.clearRect(W/2-W/80,ycord[i+1]+(ycord[i]-ycord[i+1])/2-500,2*W/80,1000);
        //     }
        //     else
        //     {   
        //         ctx.beginPath();
        //         ctx.arc(W/2,ycord[i+1]+(ycord[i]-ycord[i+1])/2,W/90,0,Math.PI*2,true);
        //         ctx.fill();
        //     }
         
        // }
    }

}
var randomno = Math.floor(Math.random()*3)+2;


function colorRatio()
{  
    // this.i = i;
    // var colors = ['red','yellow','blue','green'];
 ctx.beginPath()
 ctx.arc(W/2,ycord[i],obstacleRadius,initVal[i],initVal[i] + Math.PI*3/2,true);
 ctx.strokeStyle="#511845";
 ctx.lineWidth="10";
 ctx.stroke();
 ctx.beginPath()
 ctx.arc(W/2,ycord[i],obstacleRadius,Math.PI*3/2 + initVal[i],Math.PI+ initVal[i] ,true);
 ctx.strokeStyle="#f9b384";
 ctx.stroke();
 ctx.beginPath()
 ctx.arc(W/2,ycord[i],obstacleRadius,Math.PI + initVal[i],Math.PI/2+ initVal[i] ,true);
 ctx.strokeStyle="#c70039";
 ctx.stroke(); 
 ctx.beginPath()
 ctx.arc(W/2,ycord[i],obstacleRadius,Math.PI/2 + initVal[i],2*Math.PI+ initVal[i] ,true);
 ctx.strokeStyle="#ff5733";
 ctx.stroke();
//    ctx.lineWidth="10";
//  for(var j=0;j<randomno;j++)
//   { 
//     ctx.beginPath();
//     ctx.arc(W/2,ycord[this.i],obstacleRadius,(Math.PI*2/randomno)*j+ (Math.PI*2/randomno)*(j+1) ,false);
//     ctx.strokeStyle=colors[j];
//     ctx.stroke();
//   }
  
}
var obstacleDistance = (W+H)/5.5;

var count = 0 ;
//function to draw the obstacles.
function obstacle()
{   count++;
    for(var i=0;i<numberOfObstacles;i++)
    {   
        if(count==1)
        {
            y_obst= H/2- i*obstacleDistance;
            ycord.push(y_obst);
        }
    }
}

obstacle();
animateObstacle();

//responsivity
window.addEventListener('resize',function()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    W = canvas.width;
    H = canvas.height;
})

var clickCount=0; //stores the number of click value.
var flag=0;
window.addEventListener('click',function(){
  
    if(flag==bounceHeight)
    {
        flag=0;
    }
    animate();
     var audio = new Audio('1.mp3');
    audio.play();
    clickCount++;
    if(clickCount==1)
    {
     gravity();
    }
});

//function to make the ball bounce up when clicked.
var y = 9*H/10; //y-coordinate of the ball
var dy = 4; //velocity of the ball
var bounceHeight = 8;
function animate()
{  
  if(flag<bounceHeight)
    {   
        for(var j =1; j<=dy;j++)
        {
            ctx.clearRect(W/2 - ballRadius-1 , y - ballRadius-5, 2*ballRadius+2 , 2*ballRadius+10);
            y=y-j;
            ctx.beginPath();
            ctx.arc(W/2,y,(W+H)/150,0,Math.PI*2,false);
            ctx.fillStyle="#c70039";
            ctx.fill();
        }
       
        flag++;
        requestAnimationFrame(animate); //causes recursivity.
    }
    
 
}

//function that pulls the ball downwards
var ballRadius = (W+H)/150;
function gravity()
{   var ddy;
    requestAnimationFrame(gravity)
    if(y<H)
    { 
       
       if(toggle==0)
       { 
        if(y<H/2)
        {
          ddy= 0.75*dy;
        } 
        else
        {
          ddy = dy/1.5;
        }
       } 
    
      for(var j =1; j <=ddy;j++)
        {
            ctx.clearRect(W/2 - ballRadius-1 , y - ballRadius-5 , 2*ballRadius+2 , 2*ballRadius+10);
            y+=j
           ctx.beginPath();
           ctx.arc(W/2,y,ballRadius,0,Math.PI*2,false);
           ctx.fillStyle="#c70039";
           ctx.fill();
        }
    }

    obstacle();
}

var val=0;
// function governing gameflow.
function gameFlow()
{  requestAnimationFrame(gameFlow);
  for(i=0;i<numberOfObstacles;i++)
    { 
      if(-ycord[i]-obstacleRadius+y<5&&-ycord[i]-obstacleRadius+y>-5||-ycord[i]+obstacleRadius+y<5&&-ycord[i]+obstacleRadius+y>-5)
        { 
             if(initVal[i]< 2*Math.PI)
             { 
                 if(initVal[i]>Math.PI*3/2&&initVal[i]<2*Math.PI&&y-ycord[i]>0||initVal[i]>Math.PI*1/2&&initVal[i]<Math.PI&&y-ycord[i]<0)
                 {
                     
                 }
                 else
                 {   
                     incorrectAudio();
                     console.log("out");
                     setTimeout(function(){
                        window.location.href="gameover.html";
                     },100);
                    if(val==0)
                     {
                         highScore();
                     }
                     val++;
                 }
             }
             else if(initVal[i] > 2*Math.PI)
             {
                if( ((initVal[i]/Math.PI)%2)*Math.PI >3/2*Math.PI && ((initVal[i]/Math.PI)%2)*Math.PI <2*Math.PI&&y-ycord[i]>0||((initVal[i]/Math.PI)%2)*Math.PI >1/2*Math.PI && ((initVal[i]/Math.PI)%2)*Math.PI <Math.PI&&y-ycord[i]<0 )
                {
                    
                }
                else
                {  
                    incorrectAudio();
                    setTimeout(function(){
                        window.location.href="gameover.html";
                     },100);
                    if(val==0)
                    {
                        highScore();
                    }
                    val++;
                }  
            }
        }
    }
}
gameFlow();



//function to calculate & display score
var num = 0;
function calcScore()
{   requestAnimationFrame(calcScore);
    for(i=0;i<numberOfObstacles;i++)
    {
       if(y-ycord[i]>-5&&y-ycord[i]<5)
       {
          playerScore=i+1;
       }
       ctx.clearRect(H/3-200,W/10-200,400,400);
       ctx.font = "30px Georgia";
       ctx.fillText("Score: "+playerScore,H/3,W/10);
    }
    
}
calcScore();

//function to display highScore
function highScore()
{   
    if(localStorage.getItem('randomxxx')==null)
    {   
        localStorage.setItem('p',0);
        localStorage.setItem('randomxxx',1);
        localStorage.setItem('init',playerScore);
    }
    var p =  localStorage.getItem('p');
    localStorage.setItem('ps'+p, playerScore);
    for(var i=0;i<=p;i++)
    {
        Highscore[i]=localStorage.getItem('ps' +i);
    }
    localStorage.setItem('p',Number(p)+1);

}

function incorrectAudio()
{
    var incorrect = new Audio('2.mp3');
    incorrect.play();
}











