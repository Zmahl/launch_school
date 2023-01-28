Object.prototype.ancestors = function(chain=[]) {
  if (Object.getPrototypeOf(this) === Object.prototype) {
    chain.push('Object.prototype');
    return chain;
  }

  else {
    chain.push(Object.getPrototypeOf(this).name);
    return Object.getPrototypeOf(this).ancestors(chain);
  }
}

// name property added to make objects easier to identify
let foo = {name: 'foo'};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']