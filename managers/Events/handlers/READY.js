module.exports = class extends (require("../../../structures/Event")) {
	constructor(manager) {
		super(manager);
	}
	
	async run(data) {
		this.manager.client.sessionID = data.session_id;
		this.manager.client.user = this.manager.client.users.add(data.user);
		this.manager.client.initialGuilds = [
			...this.manager.client.initialGuilds,
			...data.guilds.map(g => g.id),
		];
		this.manager.client._afterIdentify();
		this.manager.client.emit("ready");

	}
};