module.exports = class Base {
	constructor(client) {
		this.client = client;
	}

	debug(message) {
		this.client.debug(message);
	}
};