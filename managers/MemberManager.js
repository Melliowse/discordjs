const Member = require("../structures/Member");
module.exports = class extends (require("../structures/Base/Manager")) {
	constructor(guild) {
		super();
		this.guild	= guild;
		this.client	= guild.client;
	}

	add(data) {
		const member = new Member(this.client, data, this.guild);
		this.set(member.id, member);
	}
};