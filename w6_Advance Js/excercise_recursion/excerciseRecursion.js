function getElementByClassName(el, classname, result) {
  // 요소에 이 클래스가 포함되어있니 ?
  // 응있어 그러면 태그.클래스.클래스 저장
  // 없어
  //  요소에 자식이있니?
  // 없어 > 반환
  // 있어 > 자식요소(1~n 확인하기)

  //요소에이클래스가 포함되어있니 ?
  // 응있어 그러면 저장
  // 없어 >반환
  //  요소에 자식이있니?
  // 없어 > 반환
  // 있어 > 자식요소(1~n 확인하기)

  if (el.classList.contains(classname)) {
    //요소에 클래스가 포함되어있나

    var elName = el.tagName.toLowerCase() + '.';
    el.classList.forEach((item, index) => {
      elName += item;
      if (el.classList.length > 1 && index != el.classList.length - 1) {
        elName += '.';
      }
    });
    result.push(elName); // 있다  태그와 클래스를 불러서 .으로 join 시켜서 저장
  }

  if (el.childElementCount > 0) {
    for (let i = 0; i < el.childElementCount; i++) {
      getElementByClassName(el.children[i], classname, result);
    }
  } else {
    return 0;
  }

  return result;
}
