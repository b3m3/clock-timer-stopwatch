import { 
  showCurrentTime,
  tabs,
  timerCounter,
  addZeroToTime,
  getTotalSeconds,
  playSignal,
  stopSignal
} from './functions.js';
import {
  tabsBtns,
  tabsContents,
  timerStartBlock, 
  timerNextBlock, 
  timerStartCounter,
  timerNextCounter,
  timerCancelBtn,
  timerStartBtn,
  timerPauseBtn,
  timerHours,
  timerMinutes,
  timerSeconds,
  circleProgress,
  bell,
  signal
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
  let percentPerSecond = 0;
  let totalPrecent = 0;
  
  timerStartCounter.forEach(time => addZeroToTime(time));

  const intervalBody = () => {
    totalPrecent += percentPerSecond;
    timerCounter(interval, timerHours, timerMinutes, timerSeconds);
    circleProgress.style.strokeDasharray = `${totalPrecent}% 284%`;
    
    if (totalPrecent === 284) {
      timerPauseBtn.classList.remove('active');
      bell.classList.add('active');
      playSignal(signal);
      timerNextBlock.classList.add('scale');
    }
  }; // Function for a setIntervals

  const handleClassesStartBtn = () => {
    timerCancelBtn.classList.add('active');
    timerNextBlock.classList.add('active');
    timerPauseBtn.classList.add('active');
    timerStartBtn.classList.add('hidden');
    timerPauseBtn.classList.remove('hidden');
    timerStartBlock.classList.remove('active');
  }; // Function for a timerStartBtn

  const handleClassesCancelBtn = () => {
    timerStartBlock.classList.add('active');
    timerPauseBtn.classList.add('hidden');
    timerStartBtn.classList.remove('hidden');
    timerNextBlock.classList.remove('active');
    timerCancelBtn.classList.remove('active');
    timerPauseBtn.classList.remove('pause');
    bell.classList.remove('active');
    timerNextBlock.classList.remove('scale');
  }; // Function for a timerCancelBtn


  timerPauseBtn.addEventListener('click', () => {
    pause = !pause

    if (pause) {
      clearInterval(interval);
      timerPauseBtn.classList.add('pause');
    } else {
      interval = setInterval(intervalBody, 1000);
      timerPauseBtn.classList.remove('pause');
    }
  });
  
  timerStartBtn.addEventListener('click', () => {
    handleClassesStartBtn();
    
    timerStartCounter.forEach((t, i) => {
      timerNextCounter[i].textContent = t.textContent;
    });

    percentPerSecond = 284 / getTotalSeconds(timerHours, timerMinutes, timerSeconds);
    totalPrecent = 0;
    
    interval = setInterval(intervalBody, 1000);
  });
  
  timerCancelBtn.addEventListener('click', () => {
    handleClassesCancelBtn();
    circleProgress.style.strokeDasharray = '0% 284%';
    clearInterval(interval);
    pause = false;
    stopSignal(signal);
  });
});