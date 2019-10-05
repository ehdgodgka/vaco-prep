function findOddInt(n) {
  var count = 1;
  var numNow = n[0];

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
  return numNow;
}
