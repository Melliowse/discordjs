const Base = require("../Base"),
	{ ChannelTypes } = require("../../misc/constants");

exports.Channel = class Channel extends Base {
	constructor(client, data) {
		super(client);
		this._patch(data);
	}

	_patch(data) {
		this.id = data.id;
		this.type = ChannelTypes[data.type];
	}

	toString() {
		return `${this.type[0].toUpperCase()}${this.type.slice(1)}Channel`;
	}

	toJSON() {
		return this.toString();
	}
};