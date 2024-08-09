class CodeNode {
  command;
  params;
  children;

  constructor(command) {
    this.command = command;
    this.children = [];
  }
}

module.exports = CodeNode;
