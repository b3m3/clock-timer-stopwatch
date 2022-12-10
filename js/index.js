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
});