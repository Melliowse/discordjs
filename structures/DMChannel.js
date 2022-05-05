const TextBasedChannel = require("./Base/TextChannel");
module.exports = class DMChannel extends (require("./Channel")) {
	constructor(client, data) {
		super(client, data);
		this.type = "dm";
		this.__patch(data);
		this.messages = new (require("../managers/MesssageManager"))(this.client, this);
		(new TextBasedChannel).apply(this);
	}

	__patch(data) {
		this.lastMessageID	= data?.last_message_id	|| null;
	}

	get lastMessage() {

	}

	toString() {
		return `TextChannel[${this.id}]`;
	}
};