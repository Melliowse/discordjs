module.exports = class GuildManager extends (require("../structures/Base/Manager")) {
	constructor(client) {
		super();
		this.client = client;
	}

	valueOf() {
		return `GuildManager<${this.size}>`;
	}
};