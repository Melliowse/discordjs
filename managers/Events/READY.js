module.exports = class extends (require("../../structures/Event")) {
	constructor(manager) {
		super(manager);
	}
	
	async run(data) {
		this.manager.client.sessionID = data.session_id;
		this.manager.client.id = data.application.id;
		this.manager.client.users.add(data.user);
		this.manager.client._afterIdentify();
		this.manager.client.emit("ready");

	}
};