function User(first, last) {
  this.name = first + ' ' + last;

  //When a constructor is called using the 'new'
  //keyword, it generates a new object with this instance
  //without the new keyword, this will NOT be a User object
  if (!(this instanceof User)) {
    return new User(first, last);
  }
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe