var dateChosen={
year:0,
month:0,
date:0 ,
day:function(){
    var day=new Date(this.year,this.month,this.date);
    return day.getDay();
}
}
var highlighted;

function calendarInit(){
// 오늘로 dateChosen을 설정해줍니다.
var today = new Date();
console.log(today);
dateChosen.year=today.getFullYear();
dateChosen.month=today.getMonth();
dateChosen.date=today.getDate();
// 달력 년,월 헤드를 설정,출력합니다
setMonthlyHead();
// 달력 날짜 테이블을 설정,출력합니다
setMonthlyTable();
// 월 변경 기능을 넣습니다
changeMonth();
// 날짜 선택 기능을 넣습니다.
chooseDate();
}


function setMonthlyHead(){
var year = document.querySelector('.year');
var month = document.querySelector('.month');
year.textContent=dateChosen.year;
month.textContent=monthToString(dateChosen.month);
}

function setMonthlyTable(){
    var dateStart = new Date(dateChosen.year, dateChosen.month, 1);
    var dateTemp=dateStart;
    var fillMonth = dateTemp.getMonth();
    var fillDay = dateTemp.getDay();
    for (var n = 1; n < 7; n++) {
      var tr = document.querySelector('.row' + n);
      for (var col=0; col < 7; col++) {
        if(n===1&& col<fillDay){
            tr.children[col].textContent = '';
        }else{
            if (dateStart.getMonth() === fillMonth) {
                tr.children[col].textContent = dateTemp.getDate();
                dateTemp.setDate(dateTemp.getDate()+1);
              } else {
                tr.children[col].textContent = '';
              }
        }
      }
    }
}

function changeMonth(){
    //버튼을 받읍시당 ~
    var buttonMonthChange=document.querySelectorAll('button');

    buttonMonthChange.forEach(item=>item.addEventListener('click',change,event));

    function change(event){
        console.log(event);
        cancelDateHighlight();

        if(event.target.classList.contains('bt-last-month')){
            if(dateChosen.month===0){
                dateChosen.month=11;
                dateChosen.year-=1;
                console.log(event, '이전달은 전년12월');
            }else{
                dateChosen.month-=1;
                console.log(dateChosen.month);
                console.log(event, '이전달로 이동합시다');
            }
            setMonthlyHead();
             setMonthlyTable();
        }
        else if(event.target.classList.contains('bt-next-month')){
            if(dateChosen.month===11){
                dateChosen.month=0;
                dateChosen.year+=1;
                console.log(event, '다음달은 내년1월');
            }else{
                dateChosen.month+=1;
                console.log(dateChosen.month);
                console.log(event, '다음달로 이동합시다');
            }
            setMonthlyHead();
             setMonthlyTable();
        }
    }
    }

function chooseDate(){
    var dateTable=document.querySelector('.monthly-table');
    var dateShow=document.querySelector('.date_chosen-date');
    var dayShow=document.querySelector('.date_chosen-day');
    dateShow.textContent=dateChosen.date;
    dayShow.textContent=dayToString(dateChosen.day());

    dateTable.addEventListener('click',event=>{
        if(event.target.tagName==='TD'&&event.target.textContent && !parseInt(event.target.textContent).isNaN){
            //highlight delete
            cancelDateHighlight();

             //get all table cell
            // var tableCell=document.querySelectorAll('td');
            // tableCell.forEach(item=>{
            //     if(item.style.background){
            //         item.style.background='';
            //     }
            // })
            console.log(event.target);
            highlighted =event.target;
            event.target.style.background='yellow';
            //mark date

            dateChosen.date=event.target.textContent;
            dateShow.textContent=dateChosen.date;
            dayShow.textContent=dayToString(dateChosen.day());
        }
    })
}

function cancelDateHighlight(){
    if(highlighted){
        highlighted.style.background='';
    }
}
function dayToString(day){
    var days=[
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    return days[day];
}

function monthToString(month){
    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
    return months[month];
}

calendarInit();
