var rect = document.getElementById('myDiv');
var rect2 = document.getElementById('pcDiv');
var ball = document.getElementById('ball');
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var hoinc = 2;
var veinc = 0;
var barStep = 7;
var edgeVal = 15;
var react = {'ArrowUp' : -1,
'ArrowDown':+1,}

document.addEventListener('mousemove',  (event) => {
    console.log(event.clientY);
    rect.style['marginTop']=event.clientY-230+"px";
});

document.addEventListener('keydown',  (event) => {
var val = parseInt(rect.style.marginTop,10);

if(react[event.code]){
if(event.code=="ArrowUp"&&rect.getBoundingClientRect().y>0
||event.code=="ArrowDown"&&rect.getBoundingClientRect().bottom<winHeight)
{
    val += react[event.code]*barStep;
    rect.setAttribute("style","margin-top:"+val+"px;");
}
}});

function reset(){
    veinc=0;
    ball.style['marginTop']=0+"px";
    ball.style['marginLeft']=50+"px";
    rect.style['marginTop']=0+"px";
    rect2.style['marginTop']=0+"px";
}

function checkWin(ballB,rectB,rect2B){
    let pS = document.getElementById('myDiv').children[0];
    let cS = document.getElementById('pcDiv').children[0];

    if (ballB.right>rect2B.right+10){
        reset();
        let pSText = parseInt(pS.textContent,10)+1;
        pS.textContent=pSText;  hoinc*=-1;
        if(pSText>=5){console.log("Player won!");
        pS.textContent=0; cS.textContent=0;}
}
    if (ballB.left<rectB.left+10){
        reset();
        let cSText = parseInt(cS.textContent,10)+1;
        cS.textContent=cSText;   hoinc*=-1;
        if(cSText>=5){console.log("Computer won!");
        cS.textContent=0;  pS.textContent=0;}
}}

function ballMove(){
    let ballB = ball.getBoundingClientRect();
    let rectB = rect.getBoundingClientRect();
    let rect2B = rect2.getBoundingClientRect();
    var mLval = parseInt(ball.style.marginLeft,10);
    var mTval = parseInt(ball.style.marginTop,10);
    mLval+=hoinc;
    mTval+=veinc;
    ball.style['marginTop']=mTval+"px";
    ball.style['marginLeft']=mLval+"px";
    if(hoinc>0){
        rect2.style['marginTop'] = mTval/1.2+"px";}
    else{
        rect2.style['marginTop'] = mTval/1.3+"px";}
        
    checkHit(ballB,rectB,rect2B);
    checkWin(ballB,rectB,rect2B);
}

setInterval(ballMove, 0);

function checkHit(ballB,rectB,rect2B){
    let bml = parseInt(ball.style.marginLeft,10);
    let bmt = parseInt(ball.style.marginTop,10);
    if(ballB.right>rect2B.left 
         && ballB.top<rect2B.bottom
         && ballB.bottom>rect2B.top
     ){
        if(Math.abs(ballB.top-rect2B.bottom)<=edgeVal)
        {
            veinc=2; 
            ball.style['marginTop']=bmt+4+"px";
        }
        if(Math.abs(ballB.bottom-rect2B.top)<=edgeVal){
            veinc=-2; 
            ball.style['marginTop']=bmt-4+"px";
        }
        hoinc*=-1;
        ball.style['marginLeft']=bml-4+"px";
    }
    if(ballB.left<=rectB.right
        && ballB.top<rectB.bottom &&
        ballB.bottom>rectB.top)
        {
            if(Math.abs(ballB.top-rectB.bottom)<=edgeVal){
                veinc=2; 
                ball.style['marginTop']=bmt+4+"px";
            }
            if(Math.abs(ballB.bottom-rectB.top)<=edgeVal){
                veinc=-2; 
                ball.style['marginTop']=bmt-4+"px";
            }
            hoinc*=-1;
            ball.style['marginLeft']=bml+4+"px";
        }
    if(ballB.top<=0) {
        veinc*=-1;
        ball.style['marginTop']=bmt+4+"px";}
    if(ballB.bottom>=window.innerHeight){  
        veinc*=-1;
        ball.style['marginTop']=bmt-4+"px";
    }
}

