function findKey(start, swaps) {
  var position = start;

  for (var i = 0; i < swaps.length; i++) {
    const result = swaps[i].indexOf(position);
    if (result === 0) {
      position = swaps[i][1];
    } else if (result === 1) {
      position = swaps[i][0];
    }
  }
  return position;
}

var swaps = [[0, 1], [1, 2], [1, 0]];
var firstPosition = 0;
findKey(firstPosition, swaps) === 2; // true
