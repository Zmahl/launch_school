function makeList() {
  let todos = [];
  return function(item="") {
    if (item === "") {
      if (todos.length > 0) todos.forEach(todo => console.log(todo));
      else console.log("The list is empty.")
    }

    else if (todos.includes(item)) {
      todos = todos.filter((todo) => item !== todo);
      console.log(`${item} removed!`)
    }

    else {
      todos.push(item);
      console.log(`${item} added!`)
    }
  }
}

let list = makeList();
list();
console.log()
list("make breakfast");
list("read book");
console.log()
list();
console.log()
list("make breakfast");
console.log()
list();