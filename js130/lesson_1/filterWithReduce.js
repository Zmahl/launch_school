function filter(array, callback) {
  //remember return val here to actually return the filtered array
  return array.reduce((filteredItems, value) => {
    if (callback(value)) {
      filteredItems.push(value)
    }
    //need this return otherwise will be undefined when first val doesn't meet condition
    return filteredItems;
  }, [])
}


let numbers = [1, 2, 3, 4, 5];
console.log(filter(numbers, number => number > 3)); // => [ 4, 5 ]
console.log(filter(numbers, number => number < 0)); // => []
console.log(filter(numbers, () => true));           // => [ 1, 2, 3, 4, 5 ]

let values = [1, "abc", null, true, undefined, "xyz"];
console.log(filter(values, value => typeof value === "string"));