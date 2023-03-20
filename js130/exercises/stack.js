function Stack() {

  let stack = [];

  return {

    push(item) {
      stack.push(item)
    },

    pop() {
      return stack.pop()
    },

    printStack() {
      stack.forEach(item => {
        console.log(`${item}`)
      })
    }
  };
}