//  참여인원수 가져오기
var Num;
var startBt = document.querySelector('.start-bt');

showNum(2);
function showNum(num) {
  var Show = document.querySelector('.participants-show');
  Show.innerHTML = num + "<span id='unit'>명</span>";
}
var laddergame;
var ctx;

// DO 1-1: 사다리생성 버튼을 눌렀을 때 빈 캔버스 가져오기
function startNewLadderGame() {
  // 빈캔버스
  laddergame = document.getElementById('ladder');
  ctx = laddergame.getContext('2d');
  Num = parseInt(document.querySelector('.participants-bar').value);
  var participantForm = document.querySelector('#participants');
  participantForm.remove();

  laddergame.width = window.innerHeight * 0.9;
  laddergame.height = window.innerHeight * 0.6;
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, laddergame.width, laddergame.height);
  //TODO 1-2: 인원수에 따라 사다리 개수와 입력 박스 가져오기 간격도 고려하기

  var player=document.querySelector('.player');
  var result=document.querySelector('.result');
  for (var n = 1; n <= Num; n++) {
    var Input = document.createElement('input');
    Input.className='player';
    Input.type='text';
    Input.value='player'+n;
    Input.style.width=laddergame.width * (1/ (Num + 1))*0.9+'px';
    Input.style.marginRight=laddergame.width * (1/ (Num + 1))*0.1+'px';
    player.appendChild(Input);
    var Input2 = document.createElement('input');
    Input2.className='result';
    Input2.type='text';
    Input2.style.width=laddergame.width * (1/ (Num + 1))*0.9+'px';
    Input2.style.marginRight=laddergame.width * (1/ (Num + 1))*0.1+'px';
    Input2.value='result'+n;
    result.appendChild(Input2);
    

    ctx.beginPath();
    var a = n / (Num + 1);
    var xNow = laddergame.width * (n / (Num + 1));
    var yNow = laddergame.height+10;
    ctx.moveTo(xNow, 0);
    ctx.lineTo(xNow, yNow);
    ctx.stroke();
  }
}
function startButtonAct() {
  startBt.addEventListener('click', startNewLadderGame);
}
startButtonAct();
