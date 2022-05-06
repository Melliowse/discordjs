const TextBasedChannel = require("../Base/TextChannel");
module.exports = class TextChannel extends (require("../GuildChannel")) {
	constructor(client, data, guild) {
		super(client, data, guild);
		this.type = "text";
		this.__patch(data);
		(new TextBasedChannel).apply(this);
	}

	__patch(data) {
		this.topic			= data?.topic			|| "";
		this.lastMessageID	= data?.last_message_id	|| null;
		this.nsfw			= data?.nsfw			|| false;
	}

	get lastMessage() {

	}

	toString() {
		return `TextChannel[${this.id}]`;
	}
};