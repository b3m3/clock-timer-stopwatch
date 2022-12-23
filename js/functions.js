export const handleArrowClock = (selector, getTime, maxTime) => {
  const arrow = document.querySelector(selector);
  const currentTime = eval(`new Date().${getTime}()`);
  const deg = 360 / maxTime * 
    (maxTime === 12 
      ? `${currentTime}.${addZeroToTime(Math.floor(100 / 60 * new Date().getMinutes()))}` 
      : currentTime);
  
  arrow.style.transition = deg > 360 || deg < 1 ? 'unset' : '.3s ease';
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

export const changeHeadTitle = button => {
  document.title = button.textContent;
};

export const changeHeadLinkIcon = index => {
  const icons = ['./icon/clock.svg', './icon/timer.svg', './icon/stopwatch.svg'];
  const link = document.querySelector('link[rel="icon"]');

  link.href = icons[index];
};

export const handleStartTimerCounter = (id, hou, min, sec) => {
  sec.textContent--;

  if (+sec.textContent >= 0) {
    sec.textContent = +sec.textContent < 10 ? `0${sec.textContent}` : sec.textContent;
  }
  
  if (+hou.textContent > 0 && +min.textContent === 0 && +sec.textContent < 0) {
    hou.textContent = +hou.textContent < 10 ? `0${hou.textContent -1}` : hou.textContent -1;
    min.textContent = 60;
  }
  
  if (+min.textContent > 0 && +sec.textContent < 0) {
    min.textContent = +min.textContent < 10 ? `0${min.textContent -1}` : min.textContent -1;
    sec.textContent = 59;
  }

  if (+hou.textContent === 0 && +min.textContent === 0 && +sec.textContent <= 0) {
    clearInterval(id);
  }
};

export const addZeroToTime = t => {
  return t < 10 ? '0' + t : t
};

export const addDoubleZeroToTime = t => {
  return t < 10 ? '00' + t : t < 100 ? '0' + t : t;
};

export const getTotalSeconds = (h, m, s) => {
  if (typeof h === 'number') {
    return (+h * 60 * 60) + (+m * 60) + (+s);
  } 

  return (+h.textContent * 60 * 60) + (+m.textContent * 60) + (+s.textContent);
};

export const playSignal = audio => {
  audio.currentTime = 0;
  // audio.muted = false;
  audio.play();
};

export const stopSignal = audio => {
  audio.currentTime = 0;
  audio.muted = true;
  audio.pause();
};

export const createTimeElements = (wrappers, func) => {
  wrappers.forEach(wrapp => {
    for (let index = 0; index <= 59; index++) {
      const span = document.createElement('span');
      span.classList.add('tst', 'swiper-slide');
      span.textContent = func(index);
      wrapp.append(span);
    }
  });
};

export const getTimerEndTime = (time, selector) => {
  const endTime = new Date().getTime() + (time * 1000);

  const endH = new Date(endTime).getHours();
  const endM = new Date(endTime).getMinutes();

  selector.textContent = addZeroToTime(endH) + " : " + addZeroToTime(endM);
};

export const createStopwatchSavedTimeItem = (wrapp, min, sec, msec) => {
  const li = document.createElement('li');

  const currentHours = addZeroToTime(new Date().getHours());
  const currentMinutes = addZeroToTime(new Date().getMinutes());
  const currentSeconds = addZeroToTime(new Date().getSeconds());

  li.innerHTML = `
    <span>${min.textContent}m : ${sec.textContent}s : ${msec.textContent}ms</span> / 
    <span>${currentHours} : ${currentMinutes} : ${currentSeconds}</span>
  `;
  wrapp.append(li);
};