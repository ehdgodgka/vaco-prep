var moleNum = 0;
var moleCatch;
var hole = document.querySelectorAll('.hole');
var moleIndex =0;


const overLap = document.querySelector('.over');
const main =document.querySelector('main');
//  두더지를 클릭하면은 .... 
function moleClick(){
main.addEventListener('click',event=>{
    if(event.target.classList.contains('mole')){
        console.log ("whacked");
        moleWhacked(event.target);
    }
})
}

const startButton = document.querySelector('.bt_start');
startButton.addEventListener('click', (event) => {
  overLap.style.visibility = 'hidden';
  moleCatch=Array(9).fill(false);
  moleClick();
  setTimeout(moleOut, 1000);
});


// 몇번 두더지?
function molePick() {
  const Index = Math.floor(Math.random() * 9);
  if (moleNum !== 0 && moleIndex === Index) {
    return molePick();
  } // 첫번째 두더지가 두더지와 자리가 같으면 새로 뽑아야
  else {
    return Index;
  }
}
function moleHide(moleNum,moleIndex) {
  if (!moleCatch[moleNum - 1]) {
    hole[moleIndex].setAttribute('src','img/hole.jpg');
    hole[moleIndex].classList.toggle('mole');
    setTimeout(moleOut, 1000);
  }
}
function moleWhacked(mole){
hole[moleIndex].setAttribute('src','img/hole.jpg');
hole[moleIndex].classList.toggle('mole');
moleCatch[moleNum - 1]=true;
setTimeout(moleOut, 1000);
}

function moleOut() {
  if (moleNum < 10) {
 
     moleIndex=molePick();

     hole[moleIndex].setAttribute('src','img/mole.jpg');
     hole[moleIndex].classList.toggle('mole');
    console.log('moleIndex:' + moleIndex);
    moleNum++; // 나온 두더지 수

    console.log(moleNum+"번쨰 두더지 ")

    // //  3초 뒤에 체크하기
    setTimeout(moleHide, 3000, moleNum,moleIndex);
  } else {
     result() ;
  }
}

function result(){
    var count=0;
    moleCatch.forEach(item=> {
        if(item){
            count+=10 ;
        }
    
    }
    );
    alert( "결과는"+count+"점 입니다.");
    moleNum=0;
    
    startButton.textContent='restart';
    overLap.style.visibility = 'visible';
    
    }