const Channel = require("./");

class GuildChannel extends Channel {
	constructor(client, data, guild) {
		super(client, data);
		
		this.guild = guild;
		this.guildID = data.guild_id;
		this.parentID = data?.parent_id;
		this.name = data?.name || this?.name || null;
		this.position = data?.position || this?.position || null;
	}

	get parent() {
		return this.guild.channels[this.parentID];
	}
};

module.exports = GuildChannel;