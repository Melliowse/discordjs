module.exports = class extends (require("../../../structures/Event")) {
	constructor(manager) {
		super(manager);
	}
	
	async run(data) {
		console.log(data);
		this.manager.client.guilds.delete(data.id);
	}
};