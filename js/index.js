import { showCurrentTime, tabs, timerCounter, addZeroToTime } from './functions.js';
import { tabsBtns, tabsContents } from './constans.js';
import { 
  timerStartBlock, 
  timerNextBlock, 
  timerStartCounter,
  timerNextCounter,
  timerCancelBtn,
  timerStartBtn,
  timerPauseBtn,
  timerHours,
  timerMinutes,
  timerSeconds
} from './constans.js';

document.addEventListener('DOMContentLoaded', () => {
  // Main Tabs
  tabsBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => tabs(tabsBtns, tabsContents, i, 'active'));
  });

  // Clock
  setInterval(() => {
    showCurrentTime('.arrow-hours', 'getHours', 12);
    showCurrentTime('.arrow-minutes', 'getMinutes', 60);
    showCurrentTime('.arrow-seconds', 'getSeconds', 60);
  }, 1000);

  // Timer
  let interval;
  let pause = false;

  // add zero start counter
  timerStartCounter.forEach(time => addZeroToTime(time));

  timerPauseBtn.addEventListener('click', () => {
    pause = !pause

    if (pause) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => {
        timerCounter(interval, timerHours, timerMinutes, timerSeconds);
      }, 1000)
    }
  });

  timerStartBtn.addEventListener('click', () => {
    timerCancelBtn.classList.add('active');
    timerNextBlock.classList.add('active');
    timerPauseBtn.classList.add('active');
    timerStartBtn.classList.add('hidden');
    timerPauseBtn.classList.remove('hidden');
    timerStartBlock.classList.remove('active');

    timerStartCounter.forEach((t, i) => {
      timerNextCounter[i].textContent = t.textContent;
    });

    interval = setInterval(() => {
      timerCounter(interval, timerHours, timerMinutes, timerSeconds);
    }, 1000)
  });
  
  timerCancelBtn.addEventListener('click', () => {
    timerStartBlock.classList.add('active');
    timerPauseBtn.classList.add('hidden');
    timerStartBtn.classList.remove('hidden');
    timerNextBlock.classList.remove('active');
    timerCancelBtn.classList.remove('active');
    
    clearInterval(interval);
    pause = false;
  });
});