class Executor {
  lists;

  constructor() {
    this.lists = [];
  }

  printLists() {
    console.log(this.lists);
  }

  add(data) {
    this.lists.push(data);
  }
}

module.exports = Executor;
