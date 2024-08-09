const SystemCommands = require("./Commands").commands;
const Tokens = require("./Commands").tokens;
const TokenValues = require("./Commands").tokenValues;
const Parser = require("./Parser");
const Executor = require("./Executor");

class System {
  commands;
  tokens;
  parser;
  executor;

  constructor(commands) {
    this.commands = commands;
    this.tokens = [];
  }

  run() {
    this.validateCommands();
    this.parser = new Parser(this.tokens);
    this.executor = new Executor();
    const nodes = this.parser.parse();
    this.runChildren(nodes);
  }

  validateCommands() {
    const tempCommands = this.commands.join(" ");
    this.commands = tempCommands.split(" ");
    for (let c of this.commands) {
      this.validateToken(c);
    }
  }

  // Improve with regex
  validateToken(token) {
    const tokenCommand = TokenValues.find((s) => s.regex === token);
    if (!tokenCommand) {
      this.tokens.push({
        value: token,
        token: Tokens.INPUT,
      });
    } else {
      this.tokens.push({
        value: token,
        token: tokenCommand.id,
      });
    }
  }

  runChildren(children) {
    for (let node of children) {
      this.runCommand(node);
    }
  }

  runCommand(node) {
    switch (node.command) {
      case SystemCommands.PRINT_LISTS:
        this.executor.printLists();
        break;
      case SystemCommands.REPEAT:
        for (let i = 0; i < node.params.number; i++) {
          this.runChildren(node.children);
        }
        break;
      case SystemCommands.ADD:
        this.executor.add(node.params.data);
        break;
      default:
        throw "RUNTIME ERROR";
    }
  }
}

module.exports = System;
