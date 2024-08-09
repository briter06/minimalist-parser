const Tokens = require("./Commands").tokens;
const SystemCommands = require("./Commands").commands;
const CodeNode = require("./CodeNode");
const InputTypes = require("./InputTypes");

class Parser {
  tokens;

  constructor(tokens) {
    this.tokens = JSON.parse(JSON.stringify(tokens));
  }

  getNextToken(pop) {
    if (pop) {
      return this.tokens.shift();
    } else {
      return this.tokens[0];
    }
  }

  parse() {
    const nodes = this.document();
    if (this.tokens.length > 0) {
      this.error();
    } else {
      return nodes;
    }
  }

  document() {
    const nodes = [];
    let continuar = true;
    while (continuar && this.tokens.length > 0) {
      const token = this.getNextToken(false);
      switch (token.token) {
        case Tokens.REPEAT:
          nodes.push(this.repeatCommand());
          break;
        case Tokens.ADD:
          nodes.push(this.addCommand());
          break;
        case Tokens.OPEN_BLOCK:
          continuar = false;
          break;
        case Tokens.CLOSE_BLOCK:
          continuar = false;
          break;
        case Tokens.INPUT:
          continuar = false;
          break;
        default:
          nodes.push(this.basicCommand());
      }
    }
    return nodes;
  }

  basicCommand() {
    const token = this.getNextToken(true);
    const node = new CodeNode(token.token);
    return node;
  }

  repeatCommand() {
    const repeat = this.getNextToken(true);
    const input = this.getNextToken(true);
    const openBlock = this.getNextToken(true);
    const children = this.document();
    const closeBlock = this.getNextToken(true);
    const validInputs = this.validateInput(input, InputTypes.NUMBER);
    if (
      repeat.token === Tokens.REPEAT &&
      openBlock.token === Tokens.OPEN_BLOCK &&
      closeBlock.token === Tokens.CLOSE_BLOCK &&
      input.token === Tokens.INPUT &&
      validInputs
    ) {
      const node = new CodeNode(SystemCommands.REPEAT);
      node.children = children;
      node.params = {
        number: parseFloat(input.value),
      };
      return node;
    }
    // this.error()
  }

  addCommand() {
    const add = this.getNextToken(true);
    const input = this.getNextToken(true);
    const validInputs = this.validateInput(input, "");
    if (
      add.token === Tokens.ADD &&
      input.token === Tokens.INPUT &&
      validInputs
    ) {
      const node = new CodeNode(SystemCommands.ADD);
      node.params = {
        data: input.value,
      };
      return node;
    }
    this.error();
  }

  validateInput(input, type) {
    let valid = false;
    switch (type) {
      case InputTypes.NUMBER:
        const num = parseFloat(input.value);
        valid = !isNaN(num);
        break;
      default:
        valid = true;
    }
    return valid;
  }

  error() {
    throw "SYSTAX ERROR";
  }
}

module.exports = Parser;
