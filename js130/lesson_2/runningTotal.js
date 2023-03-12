
let total = 0;

function add(num) {
  total += num;
  console.log(total);
}

function subtract(num) {
  total -= num;
  console.log(total);
}

add(1);       // 1
add(42);      // 43
subtract(39); // 4
add(6);       // 10