// Task 1

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  deleteItem(data) {
    if (this.head === null) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next !== null && current.next.data !== data) {
      current = current.next;
    }

    if (current.next !== null) {
      current.next = current.next.next;
    }
  }

  addNthElement(data, position) {
    const newNode = new Node(data);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;
    let currentPosition = 0;

    while (current !== null && currentPosition < position) {
      current = current.next;
      currentPosition++;
    }

    if (current !== null) {
      newNode.next = current.next;
      current.next = newNode;
    } else {
      this.add(data);
    }
  }

  printList() {
    let current = this.head;
    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }
}

const myList = new LinkedList();
myList.add("first value");
myList.add("second value");
myList.add("third value");

myList.addNthElement("inserted at position 1", 1);
myList.addNthElement("inserted at end", 10);

myList.printList();

// // Task 2

class CustomCollection {
  constructor() {
    this.collection = {};
    this.count = 1;
  }

  add(value) {
    this.collection[`*${this.count}*`] = value;
    this.count++;
  }

  getCollection() {
    return this.collection;
  }

  getElement(number) {
    return this.collection[`*${number}*`];
  }
}

const myCollection = new CustomCollection();
myCollection.add("first value");
myCollection.add("second value");
myCollection.add("third value");

console.log(myCollection.getCollection());

// Task 3

class CustomCollection {
  constructor() {
    this.collection = {};
    this.count = 1;
  }

  add(value) {
    this.collection[`*${this.count}*`] = value;
    this.count++;
  }

  getCollection() {
    return this.collection;
  }

  getElement(number) {
    return this.collection[`*${number}*`];
  }

  [Symbol.iterator]() {
    const keys = Object.keys(this.collection);
    let index = 0;

    return {
      next: () => {
        if (index < keys.length) {
          const key = keys[index];
          const value = this.collection[key];
          index++;
          return { value, done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}
const myCollection = new CustomCollection();
myCollection.add("first value");
myCollection.add("second value");
myCollection.add("third value");

for (const value of myCollection) {
  console.log(value);
}

// Task 4

function checkSequence(expression) {
  const stack = [];

  for (let char of expression) {
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.length === 0 || stack.pop() !== "(") {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(checkSequence("()((()))")); // true
console.log(checkSequence("(()")); // false
function checkSequence(expression) {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
  };

  for (let char of expression) {
    if (["(", "[", "{", "<"].includes(char)) {
      stack.push(char);
    } else if ([")", "]", "}", ">"].includes(char)) {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(checkSequence("()(([]))")); // true
console.log(checkSequence("{][)")); // false
console.log(checkSequence("{[()]}")); // true
console.log(checkSequence("<{[()]}>")); // true
console.log(checkSequence("{[(])}")); // false

function checkSequence(expression, allowedPairs) {
  const stack = [];
  const openingBrackets = allowedPairs.map((pair) => pair[0]);
  const closingBrackets = allowedPairs.map((pair) => pair[1]);
  const pairs = Object.fromEntries(
    allowedPairs.map((pair) => [pair[1], pair[0]])
  );

  for (let char of expression) {
    if (openingBrackets.includes(char)) {
      stack.push(char);
    } else if (closingBrackets.includes(char)) {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(
  checkSequence("()(([]))", [
    ["(", ")"],
    ["[", "]"],
  ])
); // true
console.log(
  checkSequence("{][)", [
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
  ])
); // false
console.log(
  checkSequence("{[()]}", [
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
  ])
); // true
console.log(
  checkSequence("<{[()]}>", [
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
    ["<", ">"],
  ])
); // true
console.log(
  checkSequence("{[(])}", [
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
  ])
); // false
