// Functions
import { 
  showCurrentTime,
  tabs,
  timerCounter,
  addZeroToTime,
  getTotalSeconds,
  playSignal,
  stopSignal,
  createTimeElements
} from './functions.js';

// Constans
import {
  tabsBtns,
  tabsContents,
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
  circleProgress,
  bell,
  signal
} from './constans.js';

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';

document.addEventListener('DOMContentLoaded', () => {

  // MAIN TABS
  tabsBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => tabs(tabsBtns, tabsContents, i, 'active'));
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


  //*************************************************************************** */
  const callback = (mutations) => {
    let h = 0;
    let m = 0;
    let s = 0;

    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (mutation.target.classList.contains('swiper-slide-active')) {
          if (mutation.target.closest('.h')) {
            h = mutation.target.textContent;
          }

          if (mutation.target.closest('.m')) {
            m = mutation.target.textContent;
          }

          if (mutation.target.closest('.s')) {
            s = mutation.target.textContent;
          }
        }
      }
    });

    if (getTotalSeconds(+h, +m, +s)) {
      timerStartBtn.classList.add('active');
    } else {
      timerStartBtn.classList.remove('active');
    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(timerStartBlock, {
    childList: true,
    attributes: true,
    subtree: true,
    attributeFilter: ['class'],
  });
  //*************************************************************************** */
});