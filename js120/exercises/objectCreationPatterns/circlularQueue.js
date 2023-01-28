class CircularQueue {
  constructor(buffer) {
    this.buffer = buffer;
    this.container = [];
    this.last = 0;
    this.first = 0;

    for (let i = 0; i < buffer; i++) {
      this.container.push(null);
    }
  }

  dequeue() {
    if (!this.isempty()) {
      let returnVal = this.container[this.last];
      this.container[this.last] = null;
      this.incrementLast()
      return returnVal
    }

    return null;
  }

  enqueue(newNum) {
    if (this.isFull()) {
      this.container[this.first] = newNum
      this.incrementFirst();
      this.incrementLast();
    }

    else {
      this.container[this.first] = newNum
      this.incrementFirst();
    }

  }

  incrementLast() {
    this.last += 1;
    if (this.last === this.buffer) {
      this.last = 0;
    }
  }

  incrementFirst() {
    this.first += 1;
    if (this.first === this.buffer) {
      this.first = 0;
    }
  }

  isempty() {
    return this.container[this.last] === null;
  }

  isFull() {
    return (this.first === this.last) && (this.container[this.last] !== null);
  }
}

let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1)
anotherQueue.enqueue(2)
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3)
anotherQueue.enqueue(4)
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5)
anotherQueue.enqueue(6)
anotherQueue.enqueue(7)
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);