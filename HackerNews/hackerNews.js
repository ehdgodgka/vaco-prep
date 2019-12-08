var tableBody = document.querySelector('.articles');
var page = 0;
var stories;
// 테이블 row 30개를 만듭니다.
for (var row = 0; row < 30; row++) {
  var article = document.createElement('tr');
  var articleIndex = document.createElement('td');
  var articleTitle = document.createElement('td');
  var articleDetail = document.createElement('tr');
  var detailContent = document.createElement('td');
  var blankCell = document.createElement('td');

  article.className = 'space';
  articleTitle.className = 'title';
  articleIndex.className = 'index';
  detailContent.className = 'detail';
  articleIndex.textContent = row + 1 + '.';
  articleDetail.appendChild(blankCell);
  articleDetail.appendChild(detailContent);
  article.appendChild(articleIndex);
  article.appendChild(articleTitle);
  article.id = row + 1;

  tableBody.appendChild(article);
  tableBody.appendChild(articleDetail);
}

moreBt();
getData();

function getData() {
  page++;
  //500개의 top 스토리 id 를 가지고 옴 !
  $.get(
    'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
    function(data, textStatus, jqXHR) {
      console.log(data, textStatus, jqXHR);
      // 30개 현재 페이지에 보여줘야할부분을 자름
      stories = data.slice(30 * page, 30 * page + 30);

      // 이제 30개의 정보를 불러서 각 테이블 자기칸에 뿌림
      //인덱스를 수정합니다
      var index = document.querySelectorAll('.index');
      index.forEach((item, index) => {
        item.textContent = (page - 1) * 30 + index + 1 + '.';
      });

      // TODO 2:현재 시간 timestamp 보기
      for (var index = 0; index < 30; index++) {
        callFunc(index);
        function callFunc(index) {
          return (function(index) {
            $.get(
              'https://hacker-news.firebaseio.com/v0/item/' +
                stories[index] +
                '.json?print=pretty',
              function(data) {
                $.get(
                  'https://hacker-news.firebaseio.com/v0/item/' +
                    stories[index] +
                    '.json?print=pretty',
                  function(data) {
                    var tableRow = document.getElementById(index + 1);
                    var title = tableRow.querySelector('.title');
                    var detailRow = tableRow.nextSibling;
                    console.log(detailRow);
                    var detail = detailRow.querySelector('.detail');
                    console.log(detail);
                    var url = data.url ? data.url.split('/')[2] : '';
                    if (url.includes('www.')) {
                      console.log('yes');
                      url = url.replace('www.', '');
                    }

                    title.textContent = '▲' + data.title;
                    var link = document.createElement('a');
                    link.textContent = url ? '(' + url + ')' : '';
                    link.href = data.url;
                    title.appendChild(link);
                    detail.innerHTML +=
                      ' ' +
                      data.score +
                      ' points by ' +
                      data.by +
                      ' ' +
                      timeCal(data.time) +
                      ' | hide | ' +
                      (data.descendants === 0
                        ? 'discuss'
                        : data.descendants === 1
                        ? '1 comment'
                        : data.descendants + ' comments');
                  }
                );
              }
            );
          })(index);
        }
      }

      // let 을 써서
      // for(let index=0;index<30; index++){

      //     $.get('https://hacker-news.firebaseio.com/v0/item/'+stories[index]+'.json?print=pretty',function(data){
      //         var tableRow=document.getElementById(index+1);
      //         var title=tableRow.querySelector('.title');
      //         var detailRow=tableRow.nextSibling;
      //         console.log (detailRow);
      //         var detail=detailRow.querySelector('.detail');
      //      console.log(detail);
      //      var url=data.url.split('/')[2];
      //      if(url.includes('www.')){
      //          console.log('yes');
      //          url=url.replace('www.','');
      //      }
      //      title.textContent+=" "+data.title ;
      //      var link=document.createElement('a');
      //      link.textContent='('+url+')'
      //      link.href=data.url;
      //      title.appendChild(link);
      //       detail.textContent+=" "+data.score+' points by '+data.by
      //         console.log(data);
      // });

      // }
    }
  );
}

function timeCal(Timestamp) {
  var TimestampNow = Math.round(new Date().getTime() / 1000);
  var seconds = TimestampNow - Timestamp;

  return seconds / 3600 >= 1
    ? Math.floor(seconds / 3600) === 1
      ? '1 hour ago'
      : Math.floor(seconds / 3600) + 'hours ago'
    : Math.floor(seconds * 60) + 'mins ago';
}

function moreBt() {
  //TODO: moreBt 이 눌렸을 때  다음 컨텐츠를 불러옴
  // css 에서 'More' 컨텐츠를 활성화 되게 해주기
  var moreBt = document.querySelector('.more');
  moreBt.addEventListener('click', getData);
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
