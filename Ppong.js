var rect = document.getElementById("myDiv");
var rect2 = document.getElementById("pcDiv");
var ball = document.getElementById("ball");
var dialog = document.getElementById("start");
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var hoinc = 0;
//var speed = 100000;
var veinc = 0;
var barStep = 7;
var edgeVal = 20;
var react = { ArrowUp: -1, ArrowDown: +1 };
/*const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();*/

document.addEventListener(
  "DOMContentLoaded",
  () => {
    dialog.showModal();
    /*var paddle = new Audio(
      "https://drive.google.com/u/0/uc?id=1HnpkOv1vSjBBauhmd6zE20xO4azmcmFn&export?format=mp3"
    );
    var wall = new Audio(
      "https://drive.google.com/u/0/uc?id=15u2hdAXCxBSixrSzjF19F_a0Y2cJUimO&export?format=mp3"
    );
    var score = new Audio(
      "https://drive.google.com/u/0/uc?id=1iJ2U0RV2ywnhtPWEggLj-KH6820SAwj4&export?format=mp3"
    );*/
  },
  { once: true }
);

document.addEventListener("keydown", (event) => {
  var val = parseInt(rect.style.marginTop, 10);
  var val2 = parseInt(rect2.style.marginTop, 10);
  if (react[event.code]) {
    if (
      (event.code == "ArrowUp" && rect.getBoundingClientRect().y > 0) ||
      (event.code == "ArrowDown" &&
        rect.getBoundingClientRect().y < winHeight - 30)
    ) {
      val += react[event.code] * barStep;
      rect.style["marginTop"] = val + "px";
    }
  }
});

function closeDialogAndStart() {
  hoinc = 2;
  dialog.close();
  //speed = 1;
  document.addEventListener("mousemove", (event) => {
    //console.log(event.clientY);
    rect.style["marginTop"] = event.clientY - 320 + "px";
  });
}

function resetAll() {
  veinc = 0;
  ball.style["marginTop"] = 0 + "px";
  ball.style["marginLeft"] = 50 + "px";
  rect.style["marginTop"] = 0;
  rect2.style["marginTop"] = 0;
}

function checkWin(ballB, rectB, rect2B) {
  let pS = document.getElementById("myDiv").children[0];
  let cS = document.getElementById("pcDiv").children[0];

  if (ballB.right > rect2B.right + 10) {
    //score.play();
    resetAll();
    let pSText = parseInt(pS.textContent, 10) + 1;
    pS.textContent = pSText;
    hoinc *= -1;
    if (pSText >= 5) {
      document.getElementById("text").textContent = "Player won!";
      //speed = 100000;
      dialog.show();
      resetAll();
      hoinc = 0;
      pS.textContent = 0;
      cS.textContent = 0;
    }
  }
  if (ballB.left < rectB.left - 10) {
    //score.play();
    resetAll();
    let cSText = parseInt(cS.textContent, 10) + 1;
    cS.textContent = cSText;
    hoinc *= -1;
    if (cSText >= 5) {
      document.getElementById("text").textContent = "Computer won!";
      //speed = 100000;
      dialog.show();
      resetAll();
      hoinc = 0;
      cS.textContent = 0;
      pS.textContent = 0;
    }
  }
}

function ballMove() {
  let ballB = ball.getBoundingClientRect();
  let rectB = rect.getBoundingClientRect();
  let rect2B = rect2.getBoundingClientRect();
  var mLval = parseInt(ball.style.marginLeft, 10);
  var mTval = parseInt(ball.style.marginTop, 10);
  mLval += hoinc;
  mTval += veinc;
  ball.style["marginTop"] = mTval + "px";
  ball.style["marginLeft"] = mLval + "px";
  if (hoinc > 0) {
    rect2.style["marginTop"] = mTval / 1.2 + "px";
  } else {
    rect2.style["marginTop"] = mTval / 1.3 + "px";
  }
  checkHit(ballB, rectB, rect2B);
  checkWin(ballB, rectB, rect2B);
}

setInterval(ballMove, 1);

function checkHit(ballB, rectB, rect2B) {
  let bml = parseInt(ball.style.marginLeft, 10);
  let bmt = parseInt(ball.style.marginTop, 10);
  if (
    ballB.right > rect2B.left &&
    ballB.top < rect2B.bottom &&
    ballB.bottom > rect2B.top
  ) {
    if (Math.abs(ballB.top - rect2B.bottom) <= edgeVal) {
      veinc = 2;
      ball.style["marginTop"] = bmt + 4 + "px";
    }
    if (Math.abs(ballB.bottom - rect2B.top) <= edgeVal) {
      veinc = -2;
      ball.style["marginTop"] = bmt - 4 + "px";
    }
    //paddle.play();
    hoinc *= -1;
    ball.style["marginLeft"] = bml - 4 + "px";
  }
  if (
    ballB.left <= rectB.right &&
    ballB.top < rectB.bottom &&
    ballB.bottom > rectB.top
  ) {
    if (Math.abs(ballB.top - rectB.bottom) <= edgeVal) {
      veinc = 2;
      ball.style["marginTop"] = bmt + 4 + "px";
    }
    if (Math.abs(ballB.bottom - rectB.top) <= edgeVal) {
      veinc = -2;
      ball.style["marginTop"] = bmt - 4 + "px";
    }
    //paddle.play();
    hoinc *= -1;
    ball.style["marginLeft"] = bml + 4 + "px";
  }
  if (ballB.top <= 0) {
    //wall.play();
    veinc *= -1;
    ball.style["marginTop"] = bmt + 4 + "px";
  }
  if (ballB.bottom >= window.innerHeight) {
    //wall.play();
    veinc *= -1;
    ball.style["marginTop"] = bmt - 4 + "px";
  }
}
