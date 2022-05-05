module.exports = class Member extends (require("./User")) {
	constructor(client, data, guild) {
		super(client, data.user);
		this.guild = guild;

		this.roles		= new (require("../managers/RoleManager"))(this);
		this.__patch(data);
	}
	
	__patch(data) {
		if (data?.roles.length > 0) {
			for (const role of data.roles) {
				this.roles.add(role);
			}
		}
	}
};