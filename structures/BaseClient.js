
module.exports = class extends (require("events")) {
	constructor() {
		super();
	}

	debug(message) {
		return this.emit("debug", message);
	}
};