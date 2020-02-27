var str = 'Vanilla Coding';
str = str.toUpperCase();
for (var i = 0; i < str.length; i++) {
  console.log(str[i]);
  document.write(str[i] + '<br>');
}
document.write('<hr>');

// str.forEach(element=>console.log(element));
str.split('').forEach((c) => {
  document.write(c + '<br>');
  console.log(c);
});
