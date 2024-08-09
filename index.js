const commands = require("./run.json").data;
const System = require("./System");

const system = new System(commands);

system.run();
