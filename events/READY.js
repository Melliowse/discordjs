const { Event } = require("../");
module.exports = class extends Event {
	constructor(shard) {
		super(shard);
	}
	
	async run(data) {
		this.shard.client.sessionID = data.session_id;
		this.shard.client.user = this.shard.client.users.add(data.user);
		this.shard.client.guilds.setInitial([
			...data.guilds.map(g => g.id),
		]);
		
		this.shard.client._afterIdentify();
		this.shard.client.emit("ready");
	}
};