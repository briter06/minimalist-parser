const commands = {
  PRINT_LISTS: "PRINT_LISTS",
  REPEAT: "REPEAT",
  ADD: "ADD",
};

const tokens = {
  PRINT_LISTS: "PRINT_LISTS",
  REPEAT: "REPEAT",
  ADD: "ADD",
  INPUT: "INPUT",
  OPEN_BLOCK: "OPEN_BLOCK",
  CLOSE_BLOCK: "CLOSE_BLOCK",
};

const tokenValues = [
  {
    id: tokens.PRINT_LISTS,
    regex: "PRINT_LISTS",
  },
  {
    id: tokens.REPEAT,
    regex: "REPEAT",
  },
  {
    id: tokens.ADD,
    regex: "ADD",
  },
  {
    id: tokens.INPUT,
    regex: "INPUT",
  },
  {
    id: tokens.OPEN_BLOCK,
    regex: "<",
  },
  {
    id: tokens.CLOSE_BLOCK,
    regex: ">",
  },
];

module.exports = {
  commands: commands,
  tokens: tokens,
  tokenValues: tokenValues,
};
