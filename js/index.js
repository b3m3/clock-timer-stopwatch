// Functions
import { 
  showCurrentTime,
  tabs,
  timerCounter,
  addZeroToTime,
  getTotalSeconds,
  playSignal,
  stopSignal,
  createTimeElements,
  getTimerEndTime
} from './functions.js';

// Constans
import {
  tabButtons,
  tabContents,
  timerStartBlock, 
  timerNextBlock, 
  swiperWrappers,
  timerNextCounter,
  timerCancelBtn,
  timerStartBtn,
  timerPauseBtn,
  timerHours,
  timerMinutes,
  timerSeconds,
  timerEndTime,
  circleProgress,
  bell,
  signal
} from './constans.js';

import { callback, options } from './observer.js';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';

document.addEventListener('DOMContentLoaded', () => {

  // MAIN TABS
  tabButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      tabs(tabButtons, tabContents, i, 'active');
      document.title = btn.textContent; // Change head title
    });
  });

  // CLOCK
  setInterval(() => {
    showCurrentTime('.arrow-hours', 'getHours', 12);
    showCurrentTime('.arrow-minutes', 'getMinutes', 60);
    showCurrentTime('.arrow-seconds', 'getSeconds', 60);
  }, 1000);

  // TIMER
  let interval;
  let pause = false;
  let percentPerSecond = 0;
  let totalPrecent = 0;

  createTimeElements(swiperWrappers, addZeroToTime); // Create time elements for counter
  const counterElements  = document.querySelectorAll('.tst'); // Get time elements 
  const swiper = new Swiper('.swiper', {direction: 'vertical'}); // Counter Swiper

  const observer = new MutationObserver(callback);
  observer.observe(timerStartBlock, options);

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
  }; // function for a setIntervals

  const handleClassesStartBtn = () => {
    timerCancelBtn.classList.add('active');
    timerNextBlock.classList.add('active');
    timerPauseBtn.classList.add('active');
    timerStartBtn.classList.add('hidden');
    timerPauseBtn.classList.remove('hidden');
    timerStartBlock.classList.remove('active');
  }; // function for a timerStartBtn

  const handleClassesCancelBtn = () => {
    timerStartBlock.classList.add('active');
    timerPauseBtn.classList.add('hidden');
    timerStartBtn.classList.remove('hidden');
    timerNextBlock.classList.remove('active');
    timerCancelBtn.classList.remove('active');
    timerPauseBtn.classList.remove('pause');
    bell.classList.remove('active');
    timerNextBlock.classList.remove('scale');
  }; // function for a timerCancelBtn

  timerPauseBtn.addEventListener('click', () => {
    pause = !pause

    if (pause) {
      clearInterval(interval);
      timerPauseBtn.classList.add('pause');
    } else {
      interval = setInterval(intervalBody, 1000);
      timerPauseBtn.classList.remove('pause');

      getTimerEndTime(
        getTotalSeconds(timerHours, timerMinutes, timerSeconds),
        timerEndTime
      );
    }
  }); // event pause button
  
  timerStartBtn.addEventListener('click', () => {
    handleClassesStartBtn();

    let customIndex = -1;

    counterElements.forEach(el => {
      if (el.classList.contains('swiper-slide-active')) {
        customIndex++;
        timerNextCounter[customIndex].textContent = el.textContent;
      }
    });

    getTimerEndTime(
      getTotalSeconds(timerHours, timerMinutes, timerSeconds), 
      timerEndTime
    );
  
    percentPerSecond = 284 / getTotalSeconds(timerHours, timerMinutes, timerSeconds);
    totalPrecent = 0;
    
    interval = setInterval(intervalBody, 1000);
  }); // event start button
  
  timerCancelBtn.addEventListener('click', () => {
    handleClassesCancelBtn();
    stopSignal(signal);
    clearInterval(interval);
    circleProgress.style.strokeDasharray = '0% 284%';
    pause = false;
  }); // event cancel button
});