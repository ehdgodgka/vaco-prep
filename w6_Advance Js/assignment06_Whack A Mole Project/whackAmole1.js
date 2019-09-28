var start=false;
var moleIndex=0;
var moleOut;
var main=document.querySelector('main');



var mole=document.createElement("img");
mole.setAttribute('class','molehole mole');
mole.setAttribute('src','./img/mole.jpg');











function result(){
var count=0;
moleCatch.forEach(item=> {
    if(item){
        count+=10 ;
    }

}
);
alert( "결과는"+count+"점 입니다.");
}