const Base = require("./Base");
class Channel extends Base {
	constructor(client, data, guild) {
		super(client);
		this.type = "unknown";

		this.id			= data.id;
		this._patch(data);
	}

	_patch(data) {
	}

	toString() {
		return `${this.type[0].toUpperCase()}${this.type.slice(1)}Channel`;
	}

	toJSON() {
		return this.toString();
	}
};

module.exports = Channel;