class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return {
      x: this.x + vector.x,
      y: this.y + vector.y,
    };
  }

  minus(vector) {
    return {
      x: this.x - vector.x,
      y: this.y - vector.y,
    };
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
console.log(new Vec(3, 4).length);

class Group {
  values = [];

  add(value) {
    if (!this.has(value)) {
      this.values.push(value);
    }
  }

  delete(value) {
    const index = this.values?.indexOf(value);
    if (index > -1) {
      this.values.splice(index, 1);
    }
  }

  has(value) {
    const index = this.values?.indexOf(value);
    if (index > -1) {
      return true;
    } else return false;
  }

  static from(arrayValues) {
    let newGroup = new Group();
    arrayValues.forEach(value => newGroup.add(value));
    return newGroup;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));

class GroupIterator {
  currentIndex = -1;

  constructor(group) {
    this.group = group;
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex < this.group.values.length) {
      return { value: this.group.values[this.currentIndex], done: false };
    } else {
      return { done: true };
    }
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

for (let value of Group.from(['a', 'b', 'c'])) {
  console.log(value);
}


let map = {one: true, two: true, hasOwnProperty: true};

console.log(Object.prototype.hasOwnProperty.call(map, "one"));