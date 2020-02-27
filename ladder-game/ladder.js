//  참여인원수 가져오기
var playerNum;
var startBt = document.querySelector('.start-bt');

showNum(2);
function showNum(num) {
  var Show = document.querySelector('.participants-show');
  Show.innerHTML = num + "<span id='unit'>명</span>";
}
var laddergame;
var bridge;
var ctx;
var ctx2;
function setCanvas(canvas, canvasClass) {
  canvas = canvasClass.getContext('2d');
  canvasClass.width = window.innerHeight * 0.9;
  canvasClass.height = window.innerHeight * 0.6;
  canvas.fillStyle = 'transparent';
  canvas.fillRect(0, 0, canvasClass.width, canvasClass.height);
  return canvas;
}

// DO 1-1: 사다리생성 버튼-> 캔버스에 사다리
function startNewLadderGame() {
  // 빈캔버스
  laddergame = document.getElementById('ladder');

  ctx = setCanvas(ctx, laddergame);
  playerNum = parseInt(document.querySelector('.participants-bar').value);

  var player = document.querySelector('.player');
  var result = document.querySelector('.result');
  // 결과 버튼
  var resultBt = document.createElement('button');
  resultBt.className = 'createBridge';
  resultBt.textContent = '결과보기!!';
  var main = document.querySelector('#main');
  main.appendChild(resultBt);
  resultBt = document.querySelector('.createBridge');
  resultBt.addEventListener('click', randomBridge);
  var participantForm = document.querySelector('#participants');
  participantForm.remove();

  for (var n = 1; n <= playerNum; n++) {
    var Input = document.createElement('input');
    Input.className = 'player';
    Input.type = 'text';
    Input.value = 'player' + n;
    Input.style.width = laddergame.width * (1 / (playerNum + 1)) * 0.9 + 'px';
    Input.style.marginRight = laddergame.width * (1 / (playerNum + 1)) * 0.1 + 'px';
    player.appendChild(Input);
    var Input2 = document.createElement('input');
    Input2.className = 'result';
    Input2.type = 'text';
    Input2.style.width = laddergame.width * (1 / (playerNum + 1)) * 0.9 + 'px';
    Input2.style.marginRight = laddergame.width * (1 / (playerNum + 1)) * 0.1 + 'px';
    Input2.value = 'result' + n;
    result.appendChild(Input2);

    ctx.beginPath();
    var a = n / (playerNum + 1);
    var xNow = laddergame.width * (n / (playerNum + 1));
    var yNow = laddergame.height + 10;
    ctx.moveTo(xNow, 0);
    ctx.lineTo(xNow, yNow);
    ctx.stroke();
  }
  newBridge();
}
function newBridge() {
  //DO 1-2: 인원수에 따라 사다리 개수와 입력폼  가져오기 간격도 고려하기
  ctx.clearRect(0, 0, laddergame.width, laddergame.height);

  for (var n = 1; n <= playerNum; n++) {
    ctx.beginPath();
    var a = n / (playerNum + 1);
    var xNow = laddergame.width * (n / (playerNum + 1));
    var yNow = laddergame.height + 10;
    ctx.moveTo(xNow, 0);
    ctx.lineTo(xNow, yNow);
    ctx.stroke();
  }
}
// DO 2 : 사다리를 랜덤하게 생성하기
function randomBridge() {
  newBridge();
  //   bridge = document.getElementById('bridge');

  //   ctx2 = setCanvas(ctx2, bridge);
  var bridgeNums = [];
  var bridgeArrays = [];
  for (var i = 0; i < playerNum - 1; i++) {
    var bridge = {};
    //이전다리를 불러오자
    if (i > 0) {
      for (var key in bridgeArrays[i - 1]) {
        if (bridgeArrays[i - 1][key] === 'R') {
          bridge[key] = 'L';
        }
      }
    }
    //다리개수 정하기 2~ 9개 로 할까
    var bridgeNum = i > 0 ? bridgeNums[i - 1] + Math.ceil(Math.random() * 3) : Math.ceil(Math.random() * 5);
    bridgeNums.push(bridgeNum);
    console.log(bridgeNum);
    // 다리개수가 정해졌다. 이음새를 표시를 해주자
    while (Object.keys(bridge).length < bridgeNum) {
      var value = 30 + 20 * Math.round(Math.random() * ((laddergame.height - 30) / 20));
      //   console.log(value);
      if (!(value in bridge)) {
        bridge[value] = 'R';
      }
    }
    // console.log(bridge);
    bridgeArrays.push(bridge);

    // 각 라인에 높이를 키로하고 오른쪽 왼쪽을 값으로 넣어준다

    // if (i === playerNum - 2) {
    //   var bridge = {};
    //   for (var key in bridgeArrays[i]) {
    //     bridge[key] = 'L';
    //   }
    //   bridgeArrays.push(bridge);
    // }
    // console.log(bridgeArrays);
  }
  drawLadder(bridgeArrays);
}

// todo3: 사다리 그리기
function drawLadder(bridgeArr) {
  console.log(bridgeArr);
  for (var n = 0; n <= playerNum; n++) {
    for (var height in bridgeArr[n]) {
      console.log(n + 'line 그리자!' + height);
      if (bridgeArr[n][height] === 'R') {
        ctx.beginPath();
        console.log(playerNum, n);
        var xNow = laddergame.width * ((n + 1) / (playerNum + 1));
        var xNext = laddergame.width * ((n + 2) / (playerNum + 1));
        console.log('(' + xNow, height + ')->(' + xNext, height + ')');

        ctx.moveTo(xNow, height);
        ctx.lineTo(xNext, height);
        ctx.stroke();
      }
    }
  }
}
// todo4: 결과 반환 하기
function result() {
  //각라인 다리 y 위치 배열 형성
  // 플레이어 순서 대로 소환
}

function startButtonAct() {
  startBt.addEventListener('click', startNewLadderGame);
}
startButtonAct();
