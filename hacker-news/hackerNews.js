var tableBody = document.querySelector('.articles');
var page = 1;
var stories;

// 테이블 생성
for (var row = 0; row < 30; row++) {
  var article = document.createElement('tr');
  var articleIndex = document.createElement('td');
  var articleTitle = document.createElement('td');

  var articleDetail = document.createElement('tr');
  var blankCell = document.createElement('td');
  var detailContent = document.createElement('td');

  article.id = row + 1;
  articleTitle.className = 'title';
  articleIndex.className = 'index';
  detailContent.className = 'detail';

  article.appendChild(articleIndex);
  article.appendChild(articleTitle);
  articleDetail.appendChild(blankCell);
  articleDetail.appendChild(detailContent);

  tableBody.appendChild(article);
  tableBody.appendChild(articleDetail);
}

moreBt();
getData();

// 다음 페이지로
function moreBt() {
  //moreBt 이 눌렸을 때  다음 페이지 컨텐츠
  //TODO: css 에서 'More' 컨텐)츠를 활성화 되게 해주기
  var moreBt = document.querySelector('.more');
  moreBt.addEventListener('click', nextData);
}
function nextData(){
    page++;
    getData();
}

function getData() {

  $.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', function(data, textStatus, jqXHR) {
    //약 500개의 top 스토리 id 반환
    // console.log(data, textStatus, jqXHR);

    // 30개의 스토리
    stories = data.slice(30 * (page - 1), 30 * (page - 1) + 30);

    //스토리 데이터
    for (var index = 0; index <30; index++) {
        callFunc(index);
       function callFunc (index){
        $.get('https://hacker-news.firebaseio.com/v0/item/' + stories[index] + '.json?print=pretty', function(data) {
        
        var tableRow = document.getElementById(index + 1);
        var detailRow = tableRow.nextSibling;
          var detail = detailRow.querySelector('.detail');
        var title = tableRow.querySelector('.title');
          //story title,link
          var url = data.url ? data.url.split('/')[2] : '';
          if (url.includes('www.')) {
            url = url.replace('www.', '');
          }
          var link = document.createElement('a');
          link.textContent = url ? '(' + url + ')' : '';
          link.href = data.url;
          setTimeout(function(){
          title.innerHTML = '<a href=' + data.url + " class='link'>" + '▲' + data.title + '</a>';
          title.appendChild(link);
          //story detail
          detail.innerHTML =
          ' ' +
          data.score +
          ' points by ' +
          data.by +
          ' ' +
          timeCal(data.time) +
          ' | hide | ' +
          (data.descendants === 0 ? 'discuss' : data.descendants === 1 ? '1 comment' : data.descendants + ' comments');
           },0);
        });
      

    }
      
    }
    //인덱스 수정
    var index = document.querySelectorAll('.index');
    index.forEach((item, index) => {
      item.textContent = (page - 1) * 30 + index + 1 + '.';
    });
  });
}

function timeCal(Timestamp) {
  //story 올린후 지난 시간 계산 //  unix 시간 변환
  var TimestampNow = Math.round(new Date().getTime() / 1000);
  var seconds = TimestampNow - Timestamp;

  return seconds / 3600 >= 1
    ? Math.floor(seconds / 3600) === 1
      ? '1 hour ago'
      : Math.floor(seconds / 3600) + ' hours ago'
    : Math.floor(seconds * 60) + ' mins ago';
}
