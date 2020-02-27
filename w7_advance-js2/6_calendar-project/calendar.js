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
// var todolistByDate = {};
var todolistByDate = window.localStorage;
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
          //TODO: (달력) 선택 날짜 표시
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

          //TODO:(달력)오늘 날짜 표시

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
      //   setMonthlyHead();
      //   setMonthlyTable();
    } else if (event.target.classList.contains('bt-next-month')) {
      if (monthlyShown.month === 11) {
        monthlyShown.month = 0;
        monthlyShown.year += 1;
      } else {
        monthlyShown.month += 1;
      }
    }
    setMonthly();
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
  var dateShow = document.querySelector('.date-selected-date');
  var dayShow = document.querySelector('.date-selected-day');
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
      //4.선택날짜 todolist표시
      resetTodolist();
    }
  });
}

function saveDateSelected(date) {
  dateSelected.year = monthlyShown.year;
  dateSelected.month = monthlyShown.month;
  dateSelected.date = date;
}

function highlightDate(dateTableCell) {
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

function TodolistInit() {
  //1.할일 추가 기능
  var addTodoButton = document.querySelector('.todolist-add-submit');
  addTodoButton.addEventListener('click', addTodo);

  function addTodo() {
    var addTodoText = document.querySelector('.todolist-add-text');
    if (addTodoText.value) {
      //할일 리스트를 할일 객체 배열로 저장
      var todoObj = { todo: addTodoText.value, done: false };
      thisTodolist.push(todoObj);
      appendTodo(addTodoText.value);
      addTodoText.value = '';
      saveThisList();
      //FIXME: resetTodolist가 있어야 다른 filter일때 오류가 없다.
      resetTodolist();
    }
  }
  //2. 필터링 변경 기능
  var filterButtons = document.querySelector('.footer-filter');
  filterButtons.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('button-filter') &&
      !event.target.classList.contains('filter-on')
    ) {
      // 이전 필터를 끄기
      event.currentTarget
        .querySelector('.filter-on')
        .classList.toggle('filter-on');
      // 클릭한필터를 켜기
      event.target.classList.toggle('filter-on');
      filterType = event.target.textContent;
      resetTodolist();
    }
  });
  //3. 클리어 기능
  var clearButton = document.querySelector('.footer-todo-clear');
  clearButton.addEventListener('click', (event) => {
    // var result= window.confirm('완료한 일을 지울겁니까 ? 정말 ? ');
    var all = thisTodolist.length;
    var todo = printTodoLeft();
    var done = all - todo;
    if (done > 0) {
      if (window.confirm('완료한일을 지울겁니까 정말?')) {
        while (done > 0) {
          thisTodolist.forEach((item, index) => {
            if (item.done) {
              thisTodolist.splice(index, 1);
              done--;
            }
          });
        }
        saveThisList();
        resetTodolist();
      } else {
      }
    } else {
      alert('완료한일이 없습니다! ');
    }
  });
}

function resetTodolist() {
  //1.todolist 의 todo 모두 지우기
  var todolist = document.querySelector('.todolist-list');
  while (todolist.firstChild) {
    todolist.removeChild(todolist.firstChild);
  }
  thisTodolist = [];
  //2.현재 날짜에 TODO 리스트 출력
  showTodolist();
}

function showTodolist() {
  //1. todolist 날짜 표기
  setTodolistDate();
  var keyDate = getDateKey();

  //2. todolist 내용표기
  //FIXME[localstorage]   if (keyDate in todolistByDate) {
  if (todolistByDate.getItem(keyDate)) {
    //FIXME[localstorage] thisTodolist = JSON.parse(todolistByDate[keyDate]);
    thisTodolist = JSON.parse(todolistByDate.getItem(keyDate));
    //※숫자가 key일때는 [] 로 불러온다는것 잊지 말기
    if (thisTodolist.length > 0) {
      thisTodolist.forEach((item) => {
        //값 필터링
        if (filterType === 'todo') {
          if (!item.done) {
            appendTodo(item.todo, item.done);
          }
        } else if (filterType === 'done') {
          if (item.done) {
            appendTodo(item.todo, item.done);
          }
        } else {
          appendTodo(item.todo, item.done);
        }
      });
    }
  }
  //3. todolist 남은할일 표기
  printTodoLeft();
}

function appendTodo(string, check) {
  //할일 출력
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

function setTodolistDate() {
  var todolistDate = document.querySelector('.todolist-date');
  todolistDate.textContent =
    dateSelected.year +
    '.' +
    ('0' + (dateSelected.month + 1)).slice(-2) +
    '.' +
    ('0' + dateSelected.date).slice(-2) +
    '.' +
    dayToString(dateSelected.day())
      .slice(0, 3)
      .toUpperCase();
}

function getDateKey() {
  var keyDate =
    dateSelected.year +
    ('0' + (dateSelected.month + 1)).slice(-2) +
    ('0' + dateSelected.date).slice(-2) +
    '';
  return keyDate;
}

function printTodoLeft() {
  var todo = 0;
  var done = 0;
  // 남은 할일 세기
  thisTodolist.forEach((item) => {
    item.done ? done++ : todo++;
  });

  var todoNum = document.querySelector('.footer-todo-number');
  if (todo > 0) {
    todoNum.textContent = todo + 'todo left~';
  } else {
    todoNum.textContent = 'no todo!';
  }
  return todo;
}

function saveThisList() {
  // key(날짜)- value(todo객체 배열)): json 으로 변경해서 저장
  //FIXME[localstorage] todolistByDate[getDateKey()] = JSON.stringify(thisTodolist);
  todolistByDate.setItem(getDateKey(), JSON.stringify(thisTodolist));
}

function setTodoFunction() {
  //todo 체크기능
  addCheckTodo();
  //todo 수정 삭제 기능
  addDeleteTodo();
  addModifyTodo();
}
var todos = document.querySelector('.todolist-list');
function addCheckTodo() {
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
      saveThisList();
      printTodoLeft();
      //FIXME:[지우기 대기 ]] resetTodolist();
    }
  });
}
function addModifyTodo() {
  todos.addEventListener('dblclick', (event) => {
    var thisTodo = event.target;
    if (thisTodo.classList.contains('todo')) {
      // 수정할 todo 가 몇번째인지 기록
      var index = Array.from(todos.children).indexOf(thisTodo);
      // 원래 태그를 빼와서 저장해두기
      var backup = [];
      thisTodo.childNodes.forEach((item) => backup.push(item));
      var text = backup[1].wholeText;
      //FIXME 수정시작
      todos.removeEventListener('mouseover', mouseover, event);
      todos.removeEventListener('mouseout', mouseout, event);
      // 지우고
      while (thisTodo.firstChild) {
        thisTodo.removeChild(thisTodo.firstChild);
      }
      var editbox = document.createElement('input');
      editbox.setAttribute.type = 'text';
      editbox.value = text;
      editbox.classList.add('edit');
      thisTodo.classList.add('edit');
      thisTodo.appendChild(editbox);
      var editTodo = thisTodo.firstChild;
      editTodo.focus();
      editTodo.addEventListener('focusout', (event) => {
        text = event.currentTarget.value;
        //   수정완료
        backup[1] = document.createTextNode(text); // 수정 반영 준비 완료
        thisTodo.removeChild(thisTodo.firstChild);
        backup.forEach((item) => {
          thisTodo.appendChild(item);
        });
        thisTodo.classList.remove('edit');
        //  현재 투두리스트를 수정
        thisTodolist[index].todo = text;
        //전체 투두 리스트를 수정
        deleteButtonToggle();
        saveThisList();
      });
    }
  });
}
function addDeleteTodo() {
  //할일을 삭제
  todos.addEventListener('click', (event) => {
    if (event.target.classList.contains('button-delete')) {
      var index = Array.from(todos.children).indexOf(
        event.target.parentElement
      );
      todos.removeChild(event.target.parentElement);
      // 없앤애의 인텍스를 받아서 배열에서 slice 해야한다
      thisTodolist.splice(index, 1);
      saveThisList();
      printTodoLeft();
    }
  });
  deleteButtonToggle();
}

function deleteButtonToggle() {
  //hover 시에 삭제 버튼
  todos.addEventListener('mouseover', mouseover, event);
  todos.addEventListener('mouseout', mouseout, event);
}

function mouseover(event) {
  var deleteButton;
  if (
    event.target.classList.contains('todo') ||
    event.target.parentElement.classList.contains('todo')
  ) {
    if (event.target.classList.contains('todo')) {
      deleteButton = event.target.querySelector('.button-delete');
    } else {
      deleteButton = event.target.parentElement.querySelector('.button-delete');
    }
    deleteButton.style.display = 'inline';
  }
}

function mouseout(event) {
  if (
    event.target.classList.contains('todo') ||
    event.target.parentElement.classList.contains('todo')
  ) {
    if (event.target.classList.contains('todo')) {
      deleteButton = event.target.querySelector('.button-delete');
    } else {
      deleteButton = event.target.parentElement.querySelector('.button-delete');
    }
    deleteButton.style.display = 'none';
  }
}

calendarInit();
TodolistInit();
resetTodolist();
setTodoFunction();
