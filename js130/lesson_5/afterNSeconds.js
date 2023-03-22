function afterNSeconds(callback, duration) {
  setTimeout(callback, duration * 1000);
}

afterNSeconds(() => console.log('Hi'), 3)