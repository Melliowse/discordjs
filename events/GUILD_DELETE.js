const { Event } = require("../");

module.exports = class extends Event {
	constructor(shard) {
		super(shard);
	}
	
	async run(data) {
		console.log(data);
		this.shard.client.guilds.delete(data.id);
	}
};