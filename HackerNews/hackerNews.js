var tableBody= document.querySelector('.articles');
var page=0;
var topStories;
$.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', function (list) {
    topStories=list;
console.log(topStories);
 
currentShow();
});

function currentShow(){
//보여지는 부분만 자르기
    var thispageStories=topStories.slice(page,page+30);
console.log(thispageStories);
  //화면에 일단 인덱스와 제목을 배치해보자 class 를 id 로 주기 
//   var storyObjects=thispageStories.map(item=>
//    {return ItemObject(item)} );
//   console.log(storyObjects);
for(var index=0;index<30; index++){
    var result =$.get('https://hacker-news.firebaseio.com/v0/item/'+thispageStories[index]+'.json?print=pretty',function(data){
        console.log(data);
        console.log(typeof data);
        thispageStories[index]=data;
        console.log(thispageStories);
    });
    var article=document.createElement('div');
    var mainline=document.createElement('div');
  
    console.log(result["responseJSON"]);
    mainline.textContent=index+1+'';
    article.appendChild(mainline);
    tableBody.appendChild(article);

}
}





// async function showItem(item){
//     //get table DOM to push articles in it
    
//     console.log(typeof item.id);
//     var sub=document.createElement('div');
//     var subline=document.createTextNode('subline');
//     sub.appendChild(subline);
//     article.appendChild(mainline)
//     article.appendChild(sub);

// }