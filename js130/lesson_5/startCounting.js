function startCounting() {
  let count = 0;
  setInterval(function() {
    count += 1;
    console.log(count);
  }, 1000);
}

startCounting();