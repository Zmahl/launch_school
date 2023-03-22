function delayLog() {
  for (let delay = 1; delay <= 10; delay += 1) {
    setTimeout(() => console.log(delay), delay * 1000);
  }
}


delayLog();