// Functions
import { 
  handleArrowTime,
  tabs,
  changeHeadTitle,
  timerCounter,
  changeHeadLinkIcon,
  addZeroToTime,
  addDoubleZeroToTime,
  getTotalSeconds,
  playSignal,
  stopSignal,
  createTimeElements,
  getTimerEndTime,
} from './functions.js';

// Constans
import {
  tabButtons,
  tabContents,
  timerFirst,
  timerNext, 
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
  signal,
  stopwatchArrrow,
  stopwatchCounterMinutes,
  stopwatchCounterSeconds,
  stopwatchCounterMilliseconds,
  stopwatchStartBtn,
  stopwatchStopBtn,
  stopwatchResetBtn,
  stopwatchCircleBtn,
  stopwatchCircleList
} from './constans.js';

import { callback, options } from './observer.js';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';

document.addEventListener('DOMContentLoaded', () => {

  // MAIN TABS
  tabButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      tabs(tabButtons, tabContents, i, 'active');
      changeHeadTitle(btn);
      changeHeadLinkIcon(i);
    });
  });

  // CLOCK
  setInterval(() => {
    handleArrowTime('.clock-arrow-hours', 'getHours', 12);
    handleArrowTime('.clock-arrow-minutes', 'getMinutes', 60);
    handleArrowTime('.clock-arrow-seconds', 'getSeconds', 60);
  }, 1000);

  // TIMER
  let timerInterval;
  let pause = false;
  let percentPerSecond = 0;
  let totalPrecent = 0;

  createTimeElements(swiperWrappers, addZeroToTime); // Create time elements for counter
  const counterElements  = document.querySelectorAll('.tst'); // Get time elements 
  const swiper = new Swiper('.swiper', {direction: 'vertical'}); // Counter Swiper

  const observer = new MutationObserver(callback);
  observer.observe(timerFirst, options);

  const intervalBody = () => {
    totalPrecent += percentPerSecond;
    timerCounter(timerInterval, timerHours, timerMinutes, timerSeconds);
    circleProgress.style.strokeDasharray = `${totalPrecent}% 284%`;
    
    if (totalPrecent === 284) {
      timerPauseBtn.classList.remove('active');
      bell.classList.add('active');
      playSignal(signal);
      timerNext.classList.add('scale');
    }
  }; // function for a setIntervals

  const handleClassesStartBtn = () => {
    timerCancelBtn.classList.add('active');
    timerNext.classList.add('active');
    timerPauseBtn.classList.add('active');
    timerStartBtn.classList.add('hidden');
    timerPauseBtn.classList.remove('hidden');
    timerFirst.classList.remove('active');
  }; // function for a timerStartBtn

  const handleClassesCancelBtn = () => {
    timerFirst.classList.add('active');
    timerPauseBtn.classList.add('hidden');
    timerStartBtn.classList.remove('hidden');
    timerNext.classList.remove('active');
    timerCancelBtn.classList.remove('active');
    timerPauseBtn.classList.remove('pause');
    bell.classList.remove('active');
    timerNext.classList.remove('scale');
  }; // function for a timerCancelBtn

  timerPauseBtn.addEventListener('click', () => {
    pause = !pause

    if (pause) {
      clearInterval(timerInterval);
      timerPauseBtn.classList.add('pause');
    } else {
      timerInterval = setInterval(intervalBody, 1000);
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
    
    timerInterval = setInterval(intervalBody, 1000);
  }); // event start button
  
  timerCancelBtn.addEventListener('click', () => {
    handleClassesCancelBtn();
    stopSignal(signal);
    clearInterval(timerInterval);
    circleProgress.style.strokeDasharray = '0% 284%';
    pause = false;
  }); // event cancel button

  // STOPWATCH
  let stopwatchInterval;
  let startTime = 0;
  let stopwatchArrowStep = 0;
  let stopwatchCounterStep = 1;

  const handleArrowStopwatch = () => {
    stopwatchArrowStep += 360 / (60000 / 4);
    stopwatchArrrow.style.transform = `rotate(${stopwatchArrowStep}deg)`;
  };

  const handleStartStopwatchCounter = () => {
    stopwatchCounterStep += 1 * 4;

    if (stopwatchCounterStep >= 999 && +stopwatchCounterSeconds.textContent >= 59) {
      stopwatchCounterStep = 0;
      stopwatchCounterSeconds.textContent = 0;
      stopwatchCounterMinutes.textContent++;
    }

    if (stopwatchCounterStep >= 999) {
      stopwatchCounterStep = 0;
      stopwatchCounterSeconds.textContent++
    }
    
    stopwatchCounterMilliseconds.textContent = addDoubleZeroToTime(stopwatchCounterStep);

    stopwatchCounterSeconds.textContent = addZeroToTime(+stopwatchCounterSeconds.textContent);
    stopwatchCounterMinutes.textContent = addZeroToTime(+stopwatchCounterMinutes.textContent);
  };

  const createCircleTimeItem = (wrapp) => {
    const li = document.createElement('li');

    const currentHours = addZeroToTime(new Date().getHours());
    const currentMinutes = addZeroToTime(new Date().getMinutes());
    const currentSeconds = addZeroToTime(new Date().getSeconds());

    const m = stopwatchCounterMinutes.textContent;
    const s = stopwatchCounterSeconds.textContent;
    const ms = stopwatchCounterMilliseconds.textContent;

    li.innerHTML = `
      <span>${m}m : ${s}s : ${ms}ms</span> / 
      <span>${currentHours} : ${currentMinutes} : ${currentSeconds}</span>
    `;
    wrapp.append(li);
  };

  stopwatchStartBtn.addEventListener('click', () => {
    stopwatchStartBtn.classList.remove('active');
    stopwatchStopBtn.classList.add('active');
    stopwatchResetBtn.classList.add('active');
    stopwatchCircleBtn.classList.add('active');
    startTime = new Date().getTime();
    stopwatchInterval = setInterval(() => {
      handleArrowStopwatch();
      handleStartStopwatchCounter(
        stopwatchCounterStep, 
        stopwatchCounterMinutes, 
        stopwatchCounterSeconds, 
        stopwatchCounterMilliseconds
      );
    });
  }); // event start button

  stopwatchStopBtn.addEventListener('click', () => {
    stopwatchStartBtn.classList.add('active');
    stopwatchStopBtn.classList.remove('active');
    stopwatchCircleBtn.classList.remove('active');

    clearInterval(stopwatchInterval);
  }); // event stop button

  stopwatchResetBtn.addEventListener('click', () => {
    stopwatchStartBtn.classList.add('active');
    stopwatchStopBtn.classList.remove('active');
    stopwatchResetBtn.classList.remove('active');
    stopwatchCircleBtn.classList.remove('active');

    stopwatchCounterSeconds.textContent = '00';
    stopwatchCounterMinutes.textContent = '00';
    stopwatchCounterMilliseconds.textContent = '000';

    startTime = 0;
    stopwatchArrowStep = 0;
    stopwatchCounterStep = 1;
    stopwatchCircleList.innerHTML = '';
    stopwatchArrrow.style.transform = `rotate(${0}deg)`;
    clearInterval(stopwatchInterval);
  }); // event reset button

  stopwatchCircleBtn.addEventListener('click', () => {
    createCircleTimeItem(stopwatchCircleList, startTime);
  }); // event circle button
});