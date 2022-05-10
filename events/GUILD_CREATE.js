const { Event, Guild } = require("../");

module.exports = class extends Event {
	constructor(shard) {
		super(shard);
	}
	
	async run(data) {
		this.shard.client.guilds.add(data.id, new Guild(this.shard.client, data));
	}
};