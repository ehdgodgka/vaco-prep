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
year.textContent=dateChosen.year+"  ";
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

            console.log(event.target);
            highlighted =event.target;
            event.target.style.background='yellowgreen';
            //mark date

            dateChosen.date=event.target.textContent;
            dateShow.textContent=dateChosen.date;
            dayShow.textContent=dayToString(dateChosen.day());
            //TODO 0: 날짜가 바뀌면 ! todo list 가 바껴야한다 
            todolistInit();
        }
    });
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

function todolistInit(){
    // TODO 1:현재 날짜에 TODO 리스트가 있으면 보여줍니다
    showTodolistThisDate();
    // TODO 2:todo 체크기능 추가 
    checkTodo();
     // TODO 3:todo기능 추가 수정 삭제 기능을 등록합니다.
     setTodoFunction();
    // TODO 4:완료 미완료에 따라 필터링을 해서 보여줘야합니다 
    filterTodolist();
    // TODO 5:clear 기능 :날짜별 Todo 를 Clear 할수있는 기능이 필요하다
   
    
}
function showThisdateTodolist(){ 
    // 원하는 날짜의 todo list와 남은 todo list 개수를 보여줘야합니다 
    // todolist-date에 현재 날짜를 박습니다 
    // Todolist 객체에 현재 날짜가 있냐 ?
        // 있다:
            //json을 object로 변경한다.
            //배열의 길이를 체크한다: 체크리스트의 수
            //각 배열의 값에 따라 todo element를 만들어서 dom에 추가 해서 보이게 한다 .
        // 없다
            // 할일이 없습니다를 출력한다.
}
function checkTodo(){

}
function setAddTodo(){
    // 할일을 추가할수있게 합니다 
    //add 버튼 이벤트 리스너 -> 

    // 할일을 더블 클릭으로 수정할수있게 합니다 

    // 할일을 올리면 생성되는 x 버튼으로 삭제할수있게 합니다. 

// 변경사항을 다시저장해야합니다 
// 날짜- json 객체에다가 저장 저장 ... 
// json <- Array[{todo:blabla,check:true or false },{todo:blabla, check:true or false},{ },{ },{ }]
}

function filterTodolist(){

}
function setTodoFunction(){
// TodoCheck
}





calendarInit();
todolistInit();