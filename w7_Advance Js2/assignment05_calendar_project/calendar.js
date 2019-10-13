function getToday() {
  var today = new Date();
  var todayObj = {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate()
  };
  return todayObj;
}
var dateSelected = {
  year: 0,
  month: 0,
  date: 0,
  day: function() {
    var day = new Date(this.year, this.month, this.date);
    return day.getDay();
  },
  print: function() {
    console.log('dateSelected:' + this.year, this.month, this.date);
  }
};
var monthlyShown = {
  year: 0,
  month: 0,
  set: function(year, month) {
    this.year = year;
    this.month = month;
  },
  print: function() {
    console.log('monthlyShown:' + this.year, this.month);
  }
};
var todolistbyDate = {};
var thisTodolist = [];
var highlighted;
var todayMark = null;
var filterType = 'all';

function calendarInit() {
  //1.이번달로 초기화
  var today = getToday();
  monthlyShown.set(today.year, today.month);
  setMonthly();
  //2.날짜선택 초기화: 오늘
  saveDateSelected(today.date);
  highlightDate(todayMark);
  //3.월 변경 기능 추가
  addChangeMonth();
  //4.날짜 선택 기능 추가
  addSelectDate();
  //5.바로가기 버튼 활성화
  addGoButton();
}

function setMonthly() {
  setMonthlyHead();
  setMonthlyTable();
}

function setMonthlyHead() {
  var calYear = document.querySelector('.year');
  var calMonth = document.querySelector('.month');
  calYear.textContent = monthlyShown.year;
  calMonth.textContent = monthToString(monthlyShown.month);
}

function setMonthlyTable() {
  var dateStart = new Date(monthlyShown.year, monthlyShown.month, 1);
  var fillDate = dateStart;
  var fillMonth = fillDate.getMonth();
  var fillDay = fillDate.getDay();
  //fill Monthly-table
  for (var row = 1; row < 7; row++) {
    var calRow = document.querySelector('.row' + row);

    for (var col = 0; col < 7; col++) {
      if (row === 1 && col < fillDay) {
        calRow.children[col].textContent = '';
      } else {
        if (fillDate.getMonth() === fillMonth) {
          calRow.children[col].textContent = fillDate.getDate();

          var today = getToday();
          //TODO: 선택 날짜 표시
          if (
            monthlyShown.year === dateSelected.year &&
            monthlyShown.month === dateSelected.month
          ) {
            if (fillDate.getDate() == dateSelected.date) {
              highlightDate(calRow.children[col]);
            }
          } else {
            removeHighlight(highlighted);
          }

          //TODO:오늘 표시

          if (
            monthlyShown.year === today.year &&
            monthlyShown.month === today.month
          ) {
            if (fillDate.getDate() === today.date) {
              todayMark = calRow.children[col];
              calRow.children[col].classList.add('today');
            }
          } else {
            todayMark.classList.remove('today');
          }

          fillDate.setDate(fillDate.getDate() + 1); //다음날짜 채우기
        } else {
          //이번달 날짜가 아니면 비우기
          calRow.children[col].textContent = '';
        }
      }
    }
  }
}

function addChangeMonth() {
  //월 변경 버튼 
  var buttonMonthChange = document.querySelectorAll('button');

  buttonMonthChange.forEach((item) =>
    item.addEventListener('click', change, event)
  );

  function change(event) {
    removeHighlight(highlighted);

    if (event.target.classList.contains('bt-last-month')) {
      if (monthlyShown.month === 0) {
        monthlyShown.month = 11;
        monthlyShown.year -= 1;
      } else {
        monthlyShown.month -= 1;
      }
      setMonthlyHead();
      setMonthlyTable();
    } else if (event.target.classList.contains('bt-next-month')) {
      if (monthlyShown.month === 11) {
        monthlyShown.month = 0;
        monthlyShown.year += 1;
      } else {
        monthlyShown.month += 1;
      }
      setMonthly();
    }
  }
}
//  DO : 바로 이동 구현하기
function addGoButton() {
  var goTodayButton = document.querySelector('.button-go-today');
  var goChosenButton = document.querySelector('.button-go-chosen');
  [goTodayButton, goChosenButton].forEach((item) => {
    item.addEventListener('click', gotoCal, event);
  });
  function gotoCal() {
    if (event.target.className === 'button-go-today') {
      var today = getToday();
      AlreadyThere(today);
    } else if (event.target.className === 'button-go-chosen') {
      AlreadyThere(dateSelected);
    }
    setMonthly();
    function AlreadyThere(object) {
      if (
        object.year === monthlyShown.year &&
        object.month === monthlyShown.month
      ) {
        return true;
      } else {
        monthlyShown.year = object.year;
        monthlyShown.month = object.month;
        return false;
      }
    }
  }
}
function addSelectDate() {
  var dateShow = document.querySelector('.date_chosen-date');
  var dayShow = document.querySelector('.date_chosen-day');
  var dateTable = document.querySelector('.monthly-table');
  dateShow.textContent = dateSelected.date;
  dayShow.textContent = dayToString(dateSelected.day());

  dateTable.addEventListener('click', (event) => {
    if (
      event.target.tagName === 'TD' &&
      event.target.textContent &&
      !parseInt(event.target.textContent).isNaN
    ) {
      //1. 선택날짜 강조
      removeHighlight(highlighted);
      highlightDate(event.target);
      //2. 선택날짜 저장
      saveDateSelected(event.target.textContent);
      //3.선택날짜 표시
      dateShow.textContent = dateSelected.date;
      dayShow.textContent = dayToString(dateSelected.day());
      //4.선택날짜 todolist
      todolistInit();
    }
  });
}

function saveDateSelected(date) {
  dateSelected.year = monthlyShown.year;
  dateSelected.month = monthlyShown.month;
  dateSelected.date = date;
}

function highlightDate(dateTableCell) {
  console.log(dateTableCell);
  highlighted = dateTableCell;
  dateTableCell.style.background = 'yellowgreen';
  dateTableCell.style.borderRadius = '50px';
}

function removeHighlight(dateHighlighted) {
  if (dateHighlighted) {
    dateHighlighted.style.background = '';
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

setTodolistFunction();
function todolistInit() {
  console.log('todolist를 구성합니다');
  //이전 todo 들을 지웁니다
  var todolist = document.querySelector('.todolist-list');
  while (todolist.firstChild) {
    todolist.removeChild(todolist.firstChild);
  }
  thisTodolist = [];
  // DO 2:현재 날짜에 TODO 리스트가 있으면 보여준다. 수도 출력 .
  showThisdateTodolist();
  // DO 1:todolist의 기능: todo추가,현재 상태 저장
  //DO 4: 완료 미완료 필터링 ,날짜별 todo 클리어 기능을 등록합니다.

  // DO 3:todo 체크 ,수정,삭제 , 현재 상태 저장
  setTodoFunction();
}
function showThisdateTodolist() {
  //DO4-2 : 필터링 기능
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
        if (filterType === 'todo') {
          if (!item.done) {
            addTodo(item.todo, item.done);
          }
        } else if (filterType === 'done') {
          if (item.done) {
            addTodo(item.todo, item.done);
          }
        } else {
          addTodo(item.todo, item.done);
        }
      });
    }
  }
  printTodoLeft();
}
function printTodoLeft() {
  var todo = 0;
  var done = 0;
  // 총할일
  thisTodolist.forEach((item) => {
    item.done ? done++ : todo++;
  });

  //   var todolist = document.querySelector('.todolist-list');
  var todoNum = document.querySelector('.footer-todo-number');
  if (todo > 0) {
    // 할일이 있을때
    todoNum.textContent = todo + 'todo left~';
  } else {
    todoNum.textContent = 'no todo!';
  }
  return todo;
  //   if (todolist.childElementCount) {
  //     // 할일이 있을때
  //     var Todo = todolist.querySelectorAll('.todo').length;
  //     var doneTodo = todolist.querySelectorAll('.done').length;
  //     var Todoleft = Todo - doneTodo;
  //     // 한일을 계산합니다
  //     if (Todoleft > 0) {
  //       todoNum.textContent = Todoleft + 'todo left~';
  //     } else {
  //       todoNum.textContent = 'no todo!';
  //     }
  //   } else {
  //     // 할일이 없을떄
  //     todoNum.textContent = 'no todo!';
  //   }
}
function setTodolistDate() {
  var todolistDate = document.querySelector('.todolist-date');
  todolistDate.textContent =
    '' +
    dateSelected.year +
    '.' +
    ('0' + (dateSelected.month + 1)).slice(-2) +
    '.' +
    ('0' + dateSelected.date).slice(-2) +
    '.' +
    dayToString(dateSelected.day())
      .slice(0, 3)
      .toUpperCase();
  var keyDate =
    dateSelected.year +
    ('0' + (dateSelected.month + 1)).slice(-2) +
    ('0' + dateSelected.date).slice(-2) +
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
      //DO 1-2: 변경사항을 json 으로 날짜를 키로 저장합니다.
      var todoObj = { todo: addTodoText.value, done: false };
      thisTodolist.push(todoObj);
      // 빈칸이 아니면 추가합니다.
      addTodo(addTodoText.value);
      saveThisList();
      todolistInit();
      addTodoText.value = '';
    }
  }
  // DO 4-1:필터링 변경 기능
  var filterButtons = document.querySelector('.footer-filter');
  filterButtons.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('button-filter') &&
      !event.target.classList.contains('filter-on')
    ) {
      // 먼저 현재 필터를 끄고
      event.target.parentElement
        .querySelector('.filter-on')
        .classList.toggle('filter-on');
      // 지금 필터를 키자!
      event.target.classList.toggle('filter-on');
      filterType = event.target.textContent;
      console.log(filterType);
      todolistInit();
    }
  });
  //DO 4-2 클리어 기능추가 및 확인: 한번더 확인하는 절차를 거치면 좋을것같은데
  var clearButton = document.querySelector('.footer-todo-clear');
  clearButton.addEventListener('click', (event) => {
    // var result= window.confirm('완료한 일을 지울겁니까 ? 정말 ? ');
    var all = thisTodolist.length;
    var todo = printTodoLeft();
    var done = all - todo;
    if (done > 0) {
      //     console.log('done:'+done);
      //DO4-3 : 한일클리어 기능
      if (window.confirm('완료한일을 지울겁니까 정말?')) {
        while (done > 0) {
          thisTodolist.forEach((item, index) => {
            console.log(index, item);
            if (item.done) {
              thisTodolist.splice(index, 1);
              done--;
            }
          });
        }
        saveThisList();
        todolistInit();
      } else {
      }
    } else {
      alert('완료한일이 없습니다! ');
    }
  });
}
function addTodo(string, check) {
  //DOM에 append 해서반영합니다
  // input check box + todo 내용 해서 ~
  var todolist = document.querySelector('.todolist-list');
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  var todo = document.createElement('div');
  var todoText = document.createTextNode(string);
  var deleteButton = document.createElement('span');
  deleteButton.textContent = '✖';
  deleteButton.classList.add('button-delete');
  deleteButton.style.display = 'none';
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
  deleteNmodifyTodo();
  //DO 3-3: 할일을 더블 클릭으로 수정할수있게 합니다 현재리스트와 전체리스트를 업데이트 합니다.
}

function checkTodo() {
  var todos = document.querySelector('.todolist-list');
  todos.addEventListener('click', (event) => {
    if (event.target.tagName === 'INPUT') {
      var index = Array.from(todos.children).indexOf(
        event.target.parentElement
      );
      if (event.target.checked) {
        event.target.parentElement.classList.add('done');
        thisTodolist[index].done = true;
      } else {
        event.target.parentElement.classList.remove('done');
        thisTodolist[index].done = false;
      }
      printTodoLeft();
      saveThisList();
      todolistInit();
    }
  });
}
function deleteNmodifyTodo() {
  //hover 시에 삭제 버튼이 나타나게하기
  //DO 3-2:할일을 삭제합니다
  var todos = document.querySelector('.todolist-list');
  todos.addEventListener('click', (event) => {
    if (event.target.classList.contains('button-delete')) {
      console.log('delete!!');
      var index = Array.from(todos.children).indexOf(
        event.target.parentElement
      );
      todos.removeChild(event.target.parentElement);
      // 없앤애의 인텍스를 받아서 배열에서 slice 해야한다
      thisTodolist.splice(index, 1);
      saveThisList();
    }
  });
  todos.addEventListener('mouseover', (event) => {
    var deleteButton;
    if (
      event.target.classList.contains('todo') ||
      event.target.parentElement.classList.contains('todo')
    ) {
      if (event.target.classList.contains('todo')) {
        deleteButton = event.target.querySelector('.button-delete');
      } else {
        deleteButton = event.target.parentElement.querySelector(
          '.button-delete'
        );
      }
    }
    console.log('mouseover');
    deleteButton.style.display = 'inline';
  });

  todos.addEventListener('mouseout', (event) => {
    if (
      event.target.classList.contains('todo') ||
      event.target.parentElement.classList.contains('todo')
    ) {
      console.log('mouseout');
      if (event.target.classList.contains('todo')) {
        deleteButton = event.target.querySelector('.button-delete');
      } else {
        deleteButton = event.target.parentElement.querySelector(
          '.button-delete'
        );
      }
      deleteButton.style.display = 'none';
    }
  });

  todos.addEventListener('dblclick', (event) => {
    var thisTodo = event.target;
    if (thisTodo.classList.contains('todo')) {
      // 수정할 todo 가 몇번째인지 기록
      var index = Array.from(todos.children).indexOf(thisTodo);
      // 원래 태그를 빼와서 저장해두기
      var backup = [];
      thisTodo.childNodes.forEach((item) => backup.push(item));

      console.log(backup);
      var text = backup[1].wholeText;
      console.log(text);
      //   var text = event.target.textContent;
      // 수정이 시작 되다.

      // 싹지우고
      while (thisTodo.firstChild) {
        thisTodo.removeChild(thisTodo.firstChild);
      }
      var editbox = document.createElement('input');
      editbox.setAttribute.type = 'text';
      editbox.value = text;
      editbox.classList.add('edit');

      thisTodo.classList.add('edit');
      thisTodo.appendChild(editbox);
      //    thisTodo.firstChild.focus();
      var editTodo = thisTodo.firstChild;
      editTodo.focus();
      editTodo.addEventListener('focusout', (event) => {
        text = event.currentTarget.value;
        //   수정완료
        backup[1] = document.createTextNode(text); // 수정 반영 준비 완료
        console.log(backup);

        thisTodo.removeChild(thisTodo.firstChild);
        backup.forEach((item) => {
          thisTodo.appendChild(item);
        });
        thisTodo.classList.remove('edit');
        //  현재 투두리스트를 수정
        console.log(index);
        thisTodolist[index].todo = text;
        //전체 투두 리스트를 수정
        saveThisList();
      });
    }
  });
}

calendarInit();
todolistInit();
