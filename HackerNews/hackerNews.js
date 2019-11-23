var tableBody= document.querySelector('.articles');
var page=0;
var stories;
// 테이블 row 30개를 만듭니다. 
for(var row = 0; row < 30 ; row++ ){
var article=document.createElement('tr');
var articleIndex=document.createElement('td');
var articleTitle=document.createElement('td');
var articleDetail=document.createElement('tr');
var detailContent=document.createElement('td');
var blankCell=document.createElement('td');

articleTitle.className='title';
detailContent.className='detail';
articleIndex.textContent=row+1;
articleDetail.appendChild(blankCell);
articleDetail.appendChild(detailContent);
article.appendChild(articleIndex);
article.appendChild(articleTitle);
article.id=row+1;

tableBody.appendChild(article);
tableBody.appendChild(articleDetail);
}
function getData(){
//500개의 top 스토리 id 를 가지고 옴 ! 
$.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', function (data, textStatus, jqXHR) {
console.log(data, textStatus, jqXHR);
// 30개 현재 페이지에 보여줘야할부분을 자름 
stories=data.slice(page,page+30); 

// 이제 30개의 정보를 불러서 각 테이블 자기칸에 뿌림 
for(let index=0;index<30; index++){
    
    $.get('https://hacker-news.firebaseio.com/v0/item/'+stories[index]+'.json?print=pretty',function(data){
        var tableRow=document.getElementById(index+1);
        var title=tableRow.querySelector('.title');
        var detailRow=tableRow.nextSibling;
        console.log (detailRow);
        var detail=detailRow.querySelector('.detail');
     console.log(detail);
     var url=data.url.split('/')[2];
     if(url.includes('www.')){
         console.log('yes');
         url=url.replace('www.','');
     }
     title.textContent+=" "+data.title ;
     var link=document.createElement('a');
     link.textContent='('+url+')'
     link.href=data.url;
     title.appendChild(link);
      detail.textContent+=" "+data.score+' points by '+data.by
        console.log(data);
});

}
}
);
}



window.onload=function(){
getData();
}
// function currentShow(){
// //보여지는 부분만 자르기
//     var thispageStories=topStories.slice(page,page+30);
//   //화면에 일단 인덱스와 제목을 배치해보자 class 를 id 로 주기 
// //   var storyObjects=thispageStories.map(item=>
// //   {return ItemObject(item)} );
// //   console.log(storyObjects);

//     console.log(result);
// thispageStories[index]=data;
// var article=document.createElement('div');
// var mainline=document.createElement('div');
// mainline.textContent=index+1+''+thispageStories;
// article.appendChild(mainline);
// tableBody.appendChild(article);

// }





// async function showItem(item){
//     //get table DOM to push articles in it
//     console.log(typeof item.id);
//     var sub=document.createElement('div');
//     var subline=document.createTextNode('subline');
//     sub.appendChild(subline);
//     article.appendChild(mainline)
//     article.appendChild(sub);
// }