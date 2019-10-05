var imgAddress =
  'https://bootcamp-prep-assets.s3.ap-northeast-2.amazonaws.com/images/';
var imgType = '.jpg';
var now = 1;
var preButton = document.querySelector('#button-pre');
var nextButton = document.querySelector('#button-next');
var imgNow = document.querySelector('#show');

nextButton.addEventListener('click', function(event) {
  now++;
  if (now === 6) {
    now = 1;
  }
  imgNow.setAttribute('src', imgAddress + now + imgType);
});

preButton.addEventListener('click', function(event) {
  now--;
  if (now === 0) {
    now = 5;
  }
  imgNow.setAttribute('src', imgAddress + now + imgType);
});
