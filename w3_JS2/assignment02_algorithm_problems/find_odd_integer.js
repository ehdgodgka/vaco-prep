function findOddInt(n) {
  var count = 1;
  var numNow = n[0]; // 세고있는 수 초기화
  // 현재 세고있는수
  for (var i = 1; i < n.length; i++) {
    if (numNow === n[i]) {
      count++;
    } else {
      if (count % 2 === 1) {
        break;
      }
      numNow = n[i];
      count = 1;
    }
  }
  // 현재 센 갯수

  return numNow;
}
