import { tabsBtns, tabsContents } from './constans.js';
import { showCurrentTime, tabs } from './functions.js';

document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    showCurrentTime('.arrow-hours', 'getHours', 12);
    showCurrentTime('.arrow-minutes', 'getMinutes', 60);
    showCurrentTime('.arrow-seconds', 'getSeconds', 60);
  }, 1000);

  tabsBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => tabs(tabsBtns, tabsContents, i, 'active'));
  });

  const timerStartBlock = document.querySelector('.timer__start');
  const timerNextBlock = document.querySelector('.timer__clock');
  const timerCancelBtn = document.querySelector('.timer__buttons button:first-child');
  const timerStartBtn = document.querySelector('.timer__buttons button:last-child');

  const startTimes = document.querySelectorAll('.tst');
  const endTimes = document.querySelectorAll('.tet');

  const timerHours = document.querySelector('.teh');
  const timerMinutes = document.querySelector('.tem');
  const timerSeconds = document.querySelector('.tes');

  let interval;
  let started = false;

  const handleStatusStartBtn = () => {
    if (started) {
      timerStartBtn.textContent = 'Pause';
    } else {
      timerStartBtn.textContent = 'Start';
    }
  };
  
  timerStartBtn.addEventListener('click', () => {
    started = true;
    handleStatusStartBtn();

    timerStartBtn.textContent = 'Paused';
    timerCancelBtn.classList.add('active');
    timerNextBlock.classList.add('active');
    timerStartBlock.classList.remove('active');

    startTimes.forEach((t, i) => {
      endTimes[i].textContent = t.textContent;
    });

    // if (+timerMinutes.textContent > 0) {
    //   if (+timerSeconds.textContent < 0) {
    //     timerMinutes.textContent = +timerMinutes.textContent - 1;
    //     timerSeconds.textContent = 2;
    //   }
    // }

    // timerHours
    // timerMinutes
    // timerSeconds

    interval = setInterval(() => {
      timerSeconds.textContent--;

      if (+timerHours.textContent > 0 && 
        +timerMinutes.textContent === 0 && 
        +timerSeconds.textContent < 0)
      {
        timerHours.textContent = +timerHours.textContent - 1;
        timerMinutes.textContent = 3;
      }

      if (+timerMinutes.textContent > 0 && +timerSeconds.textContent < 0) {
        timerMinutes.textContent = +timerMinutes.textContent -1;
        timerSeconds.textContent = 2;
      }



      if (+timerHours.textContent === 0 && 
        +timerMinutes.textContent === 0 && 
        +timerSeconds.textContent <= 0) 
      {
        clearInterval(interval);
      }
    }, 1000);
  })

  timerCancelBtn.addEventListener('click', () => {
    started = false;
    handleStatusStartBtn();

    timerStartBlock.classList.add('active');
    timerCancelBtn.classList.remove('active');
    timerNextBlock.classList.remove('active');

    clearInterval(interval);
  })
});