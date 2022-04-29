const Guild = require("../../structures/Guild");
module.exports = class extends (require("../../structures/Event")) {
	constructor(manager) {
		super(manager);
	}
	
	async run(data) {
		this.manager.client.guilds.set(data.id, new Guild(this.manager.client, data))
	}
};