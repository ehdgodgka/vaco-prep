var year = document.querySelector('.year');
var month = document.querySelector('.month');
var datePicked;
var today = new Date();
var year = today.getFullYear();
var days=[ 
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
    
]
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
var month = today.getMonth();
var date;
var day;

function ResetToToday() {
  year.textContent = year;
  month.textContent=month;
}



function changeMonth(){
//버튼을 받읍시당 ~ 
var buttonMonthChange=document.querySelctor('button');
buttonMonthChange.addEventListener('click',event=>{
    if(event.target.classList.contain('')){
        
    }
});
    printSelectedYearMonth();
}

function markDateSelected(){
    // highlight selected one
    //add EventListener to month table
    var dateTable=document.querySelector('.calender-table');

    dateTable.addEventListener('click',event=>{
        if(event.target.tagName==='TD'&&event.target.textContent && !parseInt(event.target.textContent).isNaN){
             //get all table cell
            var tableCell=document.querySelectorAll('td');
            tableCell.forEach(item=>{
                if(item.style.background){
                    item.style.background='';
                }
            })
            console.log(event.target);
            event.target.style.background='yellow';
            //mark date
            var dateShow=document.querySelector('.date');
            var dayShow=document.querySelector('.day');

            var datePick=new Date(year, month ,event.target.textContent);
            
            dateShow.textContent=event.target.textContent;
            dayShow.textContent=days[datePick.getDay()];
        }
    })


}


function printSelectedYearMonth() {
  // 1일의 요일을 구한다
  // 1row 의 몇번째 td 에 채울지가 정해지고
  // 차례로 채워지게 됨 ... 1row td가 full 이되면 다음 row!
  // 그렇게  그 달에대해 모두 채워나갈것
  var dateStart = new Date(year, month, 1);
  var dateTemp=dateStart;  
  var fillMonth = dateTemp.getMonth();
  var fillDay = dateTemp.getDay();

  for (let n = 1; n < 7; n++) {
    var tr = document.querySelector('.row' + n);
    for (fillDay; fillDay < 7; fillDay++) {
      if (dateStart.getMonth() === fillMonth) {
        tr.children[fillDay].textContent = dateTemp.getDate();
        dateTemp.setDate(dateTemp.getDate()+1);
      } else {
        break;
      }
    }
    if (fillDay === 7) {
      fillDay = 0;
    }
  }
}
ResetToToday();
printSelectedYearMonth();
markDateSelected();
