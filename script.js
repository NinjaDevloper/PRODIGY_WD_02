let timer;
  let startTime;
  let elapsedTime = 0;
  let isRunning = false;
  const lapTimesContainer = document.getElementById('lapTimes');

  function startStopwatch() {
    if (!isRunning) {
      isRunning = true;
      startTime = Date.now() - elapsedTime;
      timer = setInterval(updateTime, 10); // update every 10 milliseconds for microseconds
    }
  }

  function pauseStopwatch() {
    if (isRunning) {
      isRunning = false;
      clearInterval(timer);
    }
  }

  function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    lapTimesContainer.innerHTML = '';
  }

  function lap() {
    if (isRunning) {
      const lapTime = formatTime(elapsedTime);
      const lapElement = document.createElement('div');
      lapElement.textContent = `Lap Time: ${lapTime}`;
      lapElement.style.color = 'green';
      lapTimesContainer.appendChild(lapElement);
    }
  }

  function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }

  function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('stopwatch').innerText = formattedTime;
  }

  function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000));
    return (
      (hours < 10 ? '0' : '') + hours + ':' +
      (minutes < 10 ? '0' : '') + minutes + ':' +
      (seconds < 10 ? '0' : '') + seconds + '.' +
      (milliseconds < 10 ? '00' : (milliseconds < 100 ? '0' : '')) + milliseconds
    );
  }