module.exports = class GuildManager extends (require("../structures/Base/Manager")) {
	_initial = [];
	constructor(client) {
		super();
		this.client = client;
	}

	setInitial(array) {
		this._initial = array;
	}

	add(id, guild) {
		this.set(id, guild);
		if (this._initial.indexOf(id) === -1)  {
			this.client.emit("guildCreate", guild);
		}
	}

	valueOf() {
		return `GuildManager<${this.size}>`;
	}
};