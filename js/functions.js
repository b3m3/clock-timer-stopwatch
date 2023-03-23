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

export const changeHeadTitle = (index) => {
  const names = ['Clock', 'Timer', 'Stopwatch', 'Alarm'];

  document.title = names[index];
};

export const changeHeadLinkIcon = (index) => {
  const icons = ['./icon/clock.svg', './icon/timer.svg', './icon/stopwatch.svg', './icon/alarm.svg'];
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

export const addZeroToTime = (t) => {
  return t < 10 ? '0' + t : t
};

export const addDoubleZeroToTime = (t) => {
  return t < 10 ? '00' + t : t < 100 ? '0' + t : t;
};

export const getTotalSeconds = (h, m, s) => {
  if (typeof h === 'number') {
    return (+h * 60 * 60) + (+m * 60) + (+s);
  } 

  return (+h.textContent * 60 * 60) + (+m.textContent * 60) + (+s.textContent);
};

export const playSignal = (audio) => {
  audio.currentTime = 0;
  audio.play();
};

export const stopSignal = (audio) => {
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

export const addNewAlarm = (id, wrapp, daysArr, time, include, activeDays) => {
  const checkActive = prop => activeDays && activeDays.indexOf(prop) !== -1;

  const alarm = `
    <div class="alarm__item" id="${id}">
      <div class="alarm__col">
        <input class="alarm__time" type="time" value="${time ? time : '08:00'}">

        <ul class="alarm__days">
          ${daysArr.map(day => `<li class="alarm__day${checkActive(day) ? " active" : ""}">${day}</li>`).join('')}
        </ul>
      </div>

      <div class="alarm__col">
        <div class="alarm__checkbox">
          <input type="checkbox" id="cl${id}" ${include && "checked"}>
          <label for="cl${id}"></label>
        </div>
      </div>
      <button class="alarm__del">+</button>
      <button class="alarm__stop">STOP</button>
    </div>
  `;

  const data = {id, time, include, days: activeDays ? activeDays : []}

  localStorage.setItem(id, JSON.stringify(data));
  wrapp.insertAdjacentHTML("beforeend", alarm)
};

export const removeAlarm = (event) => {
  if (event.target && event.target.classList.contains('alarm__del')) {
    localStorage.removeItem(event.target.parentNode.id)
    event.target.parentNode.remove();
  }
};

export const getAlarmsFromStorage = (wrapp, daysArr) => {
  for (const key in localStorage) {
    if (Object.hasOwnProperty.call(localStorage, key)) {
      const element = localStorage[key];

      if (element) {
        const el = JSON.parse(element);
        
        if (key !== '00000000000000') {
          addNewAlarm(key, wrapp, daysArr, el.time, el.include, el.days);
        } else {
          const defaultAlarm = document.querySelector('.default-alarm');
          const time = defaultAlarm.querySelector('.alarm__time');
          const include = defaultAlarm.querySelector('#cl');
          const days = defaultAlarm.querySelectorAll('.alarm__day');

          const checkActive = prop => el.days && el.days.indexOf(prop) !== -1;
          
          time.value = el.time;
          include.checked = el.include;

          days.forEach(day => {
            day.classList.remove('active');

            if (checkActive(day.textContent)) {
              day.classList.add('active');
            }
          })
        }

      } else {
        addNewAlarm(key, wrapp, daysArr);
      }
    }
  }
};

export const changeAlarmData = (event, daysArr, signal) => {
  if (event.target && !event.target.classList.contains('alarm__wrapp')) {
    const parent = event.target.closest('.alarm__item');

    const time = parent.querySelector('.alarm__time');
    const include = parent.querySelector('.alarm__checkbox input');
    const days = parent.querySelectorAll('.alarm__day');

    if (event.target === include) {
      const activeDay = parent.querySelector('.alarm__day.active') !== null;
      const currentDay = daysArr[new Date().getDay() - 1];
      signal.muted = false;

      if (!activeDay) {
        days.forEach(d => d.textContent === currentDay && d.classList.add("active"))
      }
    } // ------------ if no active day and "include" === active, current day = active
    
    if (event.target && event.target.classList.contains('alarm__day')) {
      if (event.target.classList.contains('active')) {
        event.target.classList.remove('active');
      } else {
        event.target.classList.add('active');
      }
    } // Active Day

    const alarmData = {
      id: parent.id, 
      time: time.value, 
      include: include.checked, 
      days: []
    };


    days.forEach(day => {
      if (day.classList.contains('active')) {
        alarmData.days.push(day.textContent)
      }
    });

    localStorage.setItem(parent.id, JSON.stringify(alarmData));
  }
};

export const startAlarm = (daysArr, signal) => {
  const alarms = document.querySelectorAll('.alarm__item');

  const date = new Date();
  const currentDay = daysArr[date.getDay() -1];
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();
  const currentSeconds = date.getSeconds();
  const currentTime = addZeroToTime(currentHours) + ':' + addZeroToTime(currentMinutes);

  alarms.forEach(el => {
    const days = el.querySelectorAll('.alarm__day');
    const include = el.querySelector('.alarm__checkbox input');
    const time = el.querySelector('.alarm__time');

    if (include.checked) {
      for (let i = 0; i < days.length; i++) {
        const day = days[i].classList.contains('active') && days[i].textContent;

        if (day === currentDay) {
          if (currentTime === time.value && currentSeconds === 0) {
            el.classList.add('active');
            signal.muted = false;
            playSignal(signal);
          }
        }
      }
    } else {
      el.classList.remove('active');

      if (currentTime === time.value && currentSeconds > 0) {
        el.classList.remove('active');
      }
    }
  })
};

export const stopAlarm = (event, signal) => {
  if (event.target && !event.target.classList.contains('alarm__wrapp')) {
    const parent = event.target.closest('.alarm__item');
    const include = parent.querySelector('.alarm__checkbox input');
  
    const storageData = JSON.parse(localStorage.getItem(parent.id));
  
    if (event.target.classList.contains('alarm__stop')) {
      parent.classList.remove('active');
      storageData.include = false;
      include.checked = false;
      localStorage.setItem(parent.id, JSON.stringify(storageData));
      stopSignal(signal);
    }
  }
};