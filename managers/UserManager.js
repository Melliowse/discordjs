const User = require("../structures/User");
module.exports = class UserManager extends (require("../structures/Base/Manager")) {
	constructor(client) {
		super();
		this.client = client;
	}

	add(data) {
		const user = new User(this.client, data);
		this[user.id]	= user;
		return user;
	}

	async fetch(id, options = { cache: true }) {
		if (this[id] !== void 0 && options?.cache !== false) {
			return this[id];
		}
		
		return this.add(await this.client.api.users(id).get());
	}
};