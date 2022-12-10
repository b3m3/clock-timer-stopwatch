export const showCurrentTime = (selector, getTime, maxTime) => {
  const arrow = document.querySelector(selector);
  const currentTime = eval(`new Date().${getTime}()`);
  const deg = 360 / maxTime * currentTime;

  if (deg > 360 || deg < 1) {
    arrow.style.transition = 'unset';
  } else {
    arrow.style.transition = '.3s ease';
  }
  
  arrow.style.transform = `rotate(${deg}deg)`;
};

export const tabs = (buttons, contents, index, activeClass) => {
  const removeClasses = nodeList => {
    nodeList.forEach(el => el.classList.remove(activeClass));
  };

  const addActiveClass = elem => {
    elem[index].classList.add(activeClass);
  };

  removeClasses(buttons);
  removeClasses(contents);
  addActiveClass(buttons);
  addActiveClass(contents);
};