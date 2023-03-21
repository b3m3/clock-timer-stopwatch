import { timerStartBtn } from './constans.js';
import { getTotalSeconds } from './functions.js';

let timerFirstHours = 0;
let timerFirstMinutes = 0;
let timerFirstSeconds = 0;

export const callback = (mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      if (mutation.target.classList.contains('swiper-slide-active')) {
        
        if (mutation.target.closest('.timer-first-hours')) {
          timerFirstHours = mutation.target.textContent;
        }

        if (mutation.target.closest('.timer-first-minutes')) {
          timerFirstMinutes = mutation.target.textContent;
        }

        if (mutation.target.closest('.timer-first-seconds')) {
          timerFirstSeconds = mutation.target.textContent;
        }
      }
    }
  });

  if (getTotalSeconds(+timerFirstHours, +timerFirstMinutes, +timerFirstSeconds)) {
    timerStartBtn.classList.add('active');
    timerStartBtn.disabled = false;
  } else {
    timerStartBtn.classList.remove('active');
    timerStartBtn.disabled = true;
  }
};

export const options = {
  childList: true,
  attributes: true,
  subtree: true,
  attributeFilter: ['class']
};