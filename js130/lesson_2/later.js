function later(func, message) {
  return function () {
    func(message);
  }
}

const logger = message => console.log(message);
let logWarning = later(logger, "The system is shutting down!");
logWarning(); // The system is shutting down!