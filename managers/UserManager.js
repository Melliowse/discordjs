const User = require("../structures/User");
module.exports = class extends (require("../structures/BaseManager")) {
	constructor(client) {
		super();
		this.client = client;
	}

	add(data) {
		const user = new User(this.client, data);
		this.set(user.id, user);
	}
};