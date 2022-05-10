const { ClientOptions } = require("../../misc/constants"),
	EventEmitter = require("events");

module.exports = class BaseClient extends EventEmitter {
	constructor(options) {
		super();

		// default options
		this.options = Object.assign(ClientOptions, options);
	}

	debug(message) {
		return this.emit("debug", message);
	}
};