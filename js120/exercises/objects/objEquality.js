function objectsEqual(obj1, obj2) {
  //of iterates over the actual values rather than the index (for in..)
  for (const [k, v] of Object.entries(obj1)){
    if (!obj2.hasOwnProperty(k)) {
      return false;
    }

    if (v !== obj2[k]) {
      return false;
    }
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false