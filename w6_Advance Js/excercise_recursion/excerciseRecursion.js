function getElementByClassName(el, classname, result) {
  if (result === undefined) {
    result = [];
  } else {
    if (el.classList.contains(classname)) {
      var elName = el.tagName.toLowerCase() + '.';
      el.classList.forEach((item, index) => {
        elName += item;
        if (el.classList.length > 1 && index != el.classList.length - 1) {
          elName += '.';
        }
      });
      result.push(elName);
    }
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
