import { timerStartBtn } from './constans.js';
import { getTotalSeconds } from './functions.js';

export const callback = (mutations) => {
  let startHours = 0;
  let startMinutes = 0;
  let startSeconds = 0;

  mutations.forEach(mutation => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      if (mutation.target.classList.contains('swiper-slide-active')) {
        
        if (mutation.target.closest('.start-hours')) {
          startHours = mutation.target.textContent;
        }

        if (mutation.target.closest('.start-minutes')) {
          startMinutes = mutation.target.textContent;
        }

        if (mutation.target.closest('.start-seconds')) {
          startSeconds = mutation.target.textContent;
        }
      }
    }
  });

  if (getTotalSeconds(+startHours, +startMinutes, +startSeconds)) {
    timerStartBtn.classList.add('active');
  } else {
    timerStartBtn.classList.remove('active');
  }
};

export const observerOptions = {
  childList: true,
  attributes: true,
  subtree: true,
  attributeFilter: ['class']
};