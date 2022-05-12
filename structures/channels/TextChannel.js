const TextBasedChannel = require("../Base/TextChannel");
module.exports = class TextChannel extends (require("./GuildChannel")) {
	constructor(client, data, guild) {
		super(client, data, guild);
		this.type = "text";
		this.__patch(data);
		(new TextBasedChannel).apply(this);
	}

	__patch(data) {
		this.topic			= data?.topic			|| "";
		this.nsfw			= data?.nsfw			|| false;
	}

	toString() {
		return `TextChannel[${this.id}]`;
	}
};