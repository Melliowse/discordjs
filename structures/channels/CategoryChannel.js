const GuildChannel = require("./GuildChannel");

class CategoryChannel extends GuildChannel {
	constructor(client, data, guild) {
		super(client, data, guild);
		this.type = "category";
	}

	get children() {
		return this.guild.channels.filter(c => c.parentID === this.id);
	}
}

module.exports = CategoryChannel;