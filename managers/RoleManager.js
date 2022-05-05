const Role = require("../structures/Role"),
	Member = require("../structures/Member");

class MemberRoleManager extends (require("../structures/Base/SubManager")) {
	#roleIDs = [];
	constructor(member, data = []) {
		super();

		this.member	= member;
		this.guild	= member.guild;
		this.client	= member.client;

		for (const role of data) {
			this.add(role);
		}
	}

	add(id) {
		const role = this.guild.roles[id];
		this.#roleIDs.push(id);
		return role;
	}

	toString() {
		return `Roles<${this.size}>`;
	}

	get _data() {
		return this.guild.roles.filter(r => this.#roleIDs.indexOf(r.id) !== -1);
	}
}

module.exports = class RoleManager extends (require("../structures/Base/Manager")) {
	constructor(guildOrMember, data) {
		if (guildOrMember instanceof Member) {
			return new MemberRoleManager(guildOrMember, data);
		}

		super();
		this.guild	= guildOrMember;
		this.client	= guildOrMember.client;
	}

	toString() {
		return `Roles<${this.size}>`;
	}

	add(data) {
		if (typeof data === "string") {
			return this[data];
		}

		const role		= new Role(
			this.guild,
			data
		);
		this[role.id]	= role;
		return role;
	}
};