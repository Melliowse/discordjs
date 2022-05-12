const Base = require("./Base"),
	Emoji = require("./Emoji");

module.exports = class Reaction extends Base {
	constructor(client, message, data) {
		super(client);
		this.message = message;
		this._patch(data);
	}
	_patch(data) {
		this.me = data.me;
		this.count = data.count;
		this.emoji = new Emoji(this.client, data, this.message?.guild);
	}

	delete(users = "self") {
		if (users === "self") {
			
		}
	}
};