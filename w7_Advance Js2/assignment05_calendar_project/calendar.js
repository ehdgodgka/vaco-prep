var dateChosen = {
  year: 0,
  month: 0,
  date: 0,
  day: function() {
    var day = new Date(this.year, this.month, this.date);
    return day.getDay();
  }
};
var todolistbyDate = {};
var thisTodolist = [];
var highlighted;

function calendarInit() {
  // 오늘로 dateChosen을 설정해줍니다.
  var today = new Date();
  console.log(today);
  dateChosen.year = today.getFullYear();
  dateChosen.month = today.getMonth();
  dateChosen.date = today.getDate();
  // 달력 년,월 헤드를 설정,출력합니다
  setMonthlyHead();
  // 달력 날짜 테이블을 설정,출력합니다
  setMonthlyTable();
  // 월 변경 기능을 넣습니다
  changeMonth();
  // 날짜 선택 기능을 넣습니다.
  chooseDate();
}

function setMonthlyHead() {
  var year = document.querySelector('.year');
  var month = document.querySelector('.month');
  year.textContent = dateChosen.year + '  ';
  month.textContent = monthToString(dateChosen.month);
}

function setMonthlyTable() {
  var dateStart = new Date(dateChosen.year, dateChosen.month, 1);
  var dateTemp = dateStart;
  var fillMonth = dateTemp.getMonth();
  var fillDay = dateTemp.getDay();
  for (var n = 1; n < 7; n++) {
    var tr = document.querySelector('.row' + n);
    for (var col = 0; col < 7; col++) {
      if (n === 1 && col < fillDay) {
        tr.children[col].textContent = '';
      } else {
        if (dateStart.getMonth() === fillMonth) {
          tr.children[col].textContent = dateTemp.getDate();
          dateTemp.setDate(dateTemp.getDate() + 1);
        } else {
          tr.children[col].textContent = '';
        }
      }
    }
  }
}

function changeMonth() {
  //버튼을 받읍시당 ~
  var buttonMonthChange = document.querySelectorAll('button');

  buttonMonthChange.forEach((item) =>
    item.addEventListener('click', change, event)
  );

  function change(event) {
    console.log(event);
    cancelDateHighlight();

    if (event.target.classList.contains('bt-last-month')) {
      if (dateChosen.month === 0) {
        dateChosen.month = 11;
        dateChosen.year -= 1;
        console.log(event, '이전달은 전년12월');
      } else {
        dateChosen.month -= 1;
        console.log(dateChosen.month);
        console.log(event, '이전달로 이동합시다');
      }
      setMonthlyHead();
      setMonthlyTable();
    } else if (event.target.classList.contains('bt-next-month')) {
      if (dateChosen.month === 11) {
        dateChosen.month = 0;
        dateChosen.year += 1;
        console.log(event, '다음달은 내년1월');
      } else {
        dateChosen.month += 1;
        console.log(dateChosen.month);
        console.log(event, '다음달로 이동합시다');
      }
      setMonthlyHead();
      setMonthlyTable();
    }
  }
}

function chooseDate() {
  var dateTable = document.querySelector('.monthly-table');
  var dateShow = document.querySelector('.date_chosen-date');
  var dayShow = document.querySelector('.date_chosen-day');
  dateShow.textContent = dateChosen.date;
  dayShow.textContent = dayToString(dateChosen.day());

  dateTable.addEventListener('click', (event) => {
    if (
      event.target.tagName === 'TD' &&
      event.target.textContent &&
      !parseInt(event.target.textContent).isNaN
    ) {
      //highlight delete
      cancelDateHighlight();

      console.log(event.target);
      highlighted = event.target;
      event.target.style.background = 'yellowgreen';
      //mark date

      dateChosen.date = event.target.textContent;
      dateShow.textContent = dateChosen.date;
      dayShow.textContent = dayToString(dateChosen.day());
      //TODO 0: 날짜가 바뀌면 ! todo list 가 바껴야한다
      todolistInit();
    }
  });
}

function cancelDateHighlight() {
  if (highlighted) {
    highlighted.style.background = '';
  }
}
function dayToString(day) {
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  return days[day];
}

function monthToString(month) {
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

function todolistInit() {
  console.log('todolist를 구성합니다');
  //이전 todo 들을 지웁니다
  var todolist = document.querySelector('.todolist-list');
  while (todolist.firstChild) {
    todolist.removeChild(todolist.firstChild);
  }
  thisTodolist=[];
  // DO 2:현재 날짜에 TODO 리스트가 있으면 보여준다. 수도 출력 .
  showThisdateTodolist();
  // DO 1:todolist의 기능: todo추가,현재 상태 저장
  //TODO 4: 완료 미완료 필터링 ,날짜별 todo 클리어 기능을 등록합니다.
  setTodolistFunction();

  // TODO 3:todo 체크 ,수정,삭제 , 현재 상태 저장
  setTodoFunction();
}
function showThisdateTodolist() {
  // 원하는 날짜의 todo list와 남은 todo list 개수를 보여줘야합니다
  console.log('선택된 날짜의 todolist를 구성합니다');
  // todolist-date에 현재 날짜 표기
  var keyDate = setTodolistDate();
  if (keyDate in todolistbyDate) {
    //DO 2-1: 할일이있다:
    //json을 오늘의 할일로 object 배열로 parsing
    thisTodolist = JSON.parse(todolistbyDate[keyDate]);
    //숫자가 key일때는 [] 로 불러온다는것 잊지 말기
    if (thisTodolist.length > 0) {
      //출력할 할일이 있습니까 ? 출력해 주세요.
      thisTodolist.forEach((item) => {
        //각 배열의 값에 따라 todo element를 만들어서 dom에 추가 해서 보이게 한다 .

        addTodo(item.todo, item.done);
      });
    }
  }
  printTodoLeft();
}
function printTodoLeft() {
    // 총할일
var todolist=document.querySelector('.todolist-list');
var todoNum = document.querySelector('.footer-todo-number');


if(todolist.childElementCount){ // 할일이 있을때 
    var Todo=todolist.querySelectorAll('.todo').length;
    var doneTodo = todolist.querySelectorAll('.done').length;
    var Todoleft=Todo-doneTodo;
        // 한일을 계산합니다
      if (Todoleft > 0) {
        todoNum.textContent=Todoleft + 'todo left~';
      }else{
        todoNum.textContent = 'no todo!';
      }
}else{ // 할일이 없을떄 
    todoNum.textContent = 'no todo!';
}

}
function setTodolistDate() {
  var todolistDate = document.querySelector('.todolist-date');
  todolistDate.textContent =
    '' +
    dateChosen.year +
    '.' +
    ('0' + (dateChosen.month + 1)).slice(-2) +
    '.' +
    ('0' + dateChosen.date).slice(-2) +
    '.' +
    dayToString(dateChosen.day())
      .slice(0, 3)
      .toUpperCase();
  var keyDate =
    dateChosen.year +
    ('0' + (dateChosen.month + 1)).slice(-2) +
    ('0' + dateChosen.date).slice(-2) +
    '';
  return keyDate;
}

function setTodolistFunction() {
  console.log('Todolist');
  //DO 1-1: 할일을 추가 (체크박스와 할일)
  var addTodoButton = document.querySelector('.todolist-add-submit');
  console.log(addTodoButton);
  //할일추가기능
  addTodoButton.addEventListener('click', checkNadd);

  function checkNadd() {
    // 빈칸인지 확인합니다.
    var addTodoText = document.querySelector('.todolist-add-text');
    if (addTodoText.value) {
      // 빈칸이 아니면 추가합니다.
      addTodo(addTodoText.value);
      //DO 1-2: 변경사항을 json 으로 날짜를 키로 저장합니다.
      var todoObj = { todo: addTodoText.value, done: false };
      thisTodolist.push(todoObj);
      saveThisList();
      addTodoText.value = '';
    }
  }
}
function addTodo(string, check) {
  //DOM에 append 해서반영합니다
  // input check box + todo 내용 해서 ~
  var todolist = document.querySelector('.todolist-list');
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  var todo = document.createElement('div');
  var todoText = document.createTextNode(string);
  var deleteButton=document.createElement('span');
  deleteButton.textContent='✖';
  deleteButton.classList.add('button-delete');
  deleteButton.style.display='none';
  todo.classList.add('todo');
  if (check) {
    todo.classList.add('done');
    checkbox.checked = true;
  }
  todo.appendChild(checkbox);
  todo.appendChild(todoText);
  todo.appendChild(deleteButton);
  todolist.appendChild(todo);
  printTodoLeft();

}
function saveThisList() {
  // key:날짜- value: json 으로 변경한 todo객체 배열 ...
  // json <- Array[{todo:blabla,check:true or false },{todo:blabla, check:true or false},{ },{ },{ }]
  console.log(thisTodolist);
  todolistbyDate[setTodolistDate()] = JSON.stringify(thisTodolist);
  console.log(todolistbyDate);
}




function setTodoFunction() {
  //DO 3-1: 체크박스에 상태에 따라 check클래스를 토글을 시키도록 하자.
  // check 클래스의 스타일에느 가운데 줄이 그이고 현재리스트의 체크여부, 전체리스트를 업데이트 합니다.
  checkTodo();
  //DO 3-2: 할일에 커서 올리면 생성되는 x 버튼으로 삭제할수있게 합니다. 현재리스트와 전체리스트를 업데이트 합니다
  deleteTodo();
  //TODO 3-3: 할일을 더블 클릭으로 수정할수있게 합니다 현재리스트와 전체리스트를 업데이트 합니다.
  modifyTodo();
}

function checkTodo() {
  var todos = document.querySelector('.todolist-list');
  todos.addEventListener('click', (event) => {
    if(event.target.tagName==='INPUT'){
        var index = Array.from(todos.children).indexOf(event.target.parentElement);
        if (event.target.checked) {
          event.target.parentElement.classList.add('done');
          thisTodolist[index].done = true;
        } else {
          event.target.parentElement.classList.remove('done');
          thisTodolist[index].done = false;
        }
        printTodoLeft();
        saveThisList();
    }
 
  });
}
function deleteTodo(){
    //hover 시에 삭제 버튼이 나타나게하기
         //DO 3-2:할일을 삭제합니다
    var todos = document.querySelector('.todolist-list');
    todos.addEventListener('click',event=>
    {
        if(event.target.classList.contains('button-delete')){
            console.log('delete!!');
            var index=Array.from(todos.children).indexOf(event.target.parentElement);
            todos.removeChild(event.target.parentElement);
            // 없앤애의 인텍스를 받아서 배열에서 slice 해야한다
            thisTodolist.splice(index,1);
            saveThisList();
        }
    }
    );
    todos.addEventListener("mouseover",event=>
    {   var deleteButton;
        if(event.target.classList.contains('todo')||event.target.parentElement.classList.contains('todo')){
            if(event.target.classList.contains('todo')){
                deleteButton = event.target.querySelector('.button-delete');
            }else{
                deleteButton = event.target.parentElement.querySelector('.button-delete');
            }
        }
            console.log('mouseover');
            deleteButton.style.display = 'inline';
    }
    );

    todos.addEventListener('mouseout',event=>
    {
        if(event.target.classList.contains('todo')||event.target.parentElement.classList.contains('todo')){
            console.log('mouseout');
            if(event.target.classList.contains('todo')){
                deleteButton = event.target.querySelector('.button-delete');
            }else{
                deleteButton = event.target.parentElement.querySelector('.button-delete');
            }
            deleteButton.style.display='none';
        }
    });


}

function modifyTodo(){
    
}

calendarInit();
todolistInit();
