//행,열
const BEGINNER = 9;
var row = BEGINNER;
var col = BEGINNER;

// 판짜기
// 판을 그냥 ... div 로 짜면될것같은데

var gameboard = document.querySelector('.gameboard');
var row = document.createElement('div');
var block = document.createElement('div');
block.className = 'block';
for (var i = 0; i < BEGINNER; i++) {
  console.log(i);
  row.append(block);
  console.log(row);
}

for (var col = 0; col < BEGINNER; col++) {
  gameboard.append(row);
}
row.append(block);
