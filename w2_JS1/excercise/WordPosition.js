var word = 'dolphin';
var sentence = 'Where did Jane get the dolphin from John? ';

var indexOfD = sentence.indexOf(word);
var indexOfN = indexOfD + word.length - 1;
console.log(indexOfD, indexOfN);
console.log(sentence[indexOfD], sentence[indexOfN]);
