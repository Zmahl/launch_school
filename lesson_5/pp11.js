let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];
let newArr = [];

arr.map((obj) => {
  let newObj = {}
  Object.keys(obj).forEach(element => {
    newObj[element] = obj[element];
  })
  newArr.push(newObj);

});

console.log(newArr);
