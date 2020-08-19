
var p = Number(localStorage.getItem('p'))-1;
var hs = [];
for(i=1;i<=p;i++)
{
   hs[i-1] = Number(localStorage.getItem('ps'+i));
}
for(var i =0;i<p;i++)
{
    for(var j=0;j<i;j++)
    {
        if(Number(hs[i])>Number(hs[j]))
        {
            var temp = hs[j];
            hs[j]=hs[i];
            hs[i]=temp;
        }
    }
}
if(localStorage.getItem('randomkkk')==null)
{   
    var u = localStorage.getItem('init');
    document.getElementById("hscore").innerHTML="<h1>Highscore<br>"+u+"</h1>";
    localStorage.setItem('randomkkk',1)
    v=localStorage.getItem('ps'+ (Number(p)-1))
    document.getElementById('currentScore').innerHTML="<h1>Highscore<br>"+v+"</h1>";
}
else
{
    document.getElementById("hscore").innerHTML="<h1>Highscore<br>"+hs[0]+"</h1>";
    v=localStorage.getItem('ps'+ (Number(p)));
    document.getElementById('currentScore').innerHTML="<h1>Your score<br>"+v+"</h1>";
}



