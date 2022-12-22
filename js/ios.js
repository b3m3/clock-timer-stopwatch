export const ios = () => {
  const mp3 = new Audio('./audio/signal.mp3');
  const playBtn = document.createElement('button');
  playBtn.textContent = 'PLAY';

  document.body.append(playBtn);

  playBtn.onclick = () => {
    mp3.play();
  };
};