module.exports = class extends (require("./User")) {
	constructor(client, data, guild) {
		super(client, data.user);
		this.guild = guild;
		this.__patch(data);
	}
	
	__patch(data) {

	}
};