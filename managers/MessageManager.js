const Message = require("../structures/Message");
module.exports = class MessageManager extends (require("../structures/Base/Manager")) {
	constructor(client, channel) {
		super();
		this.channel	= channel;
		this.client		= client;
	}

	add(...data) {
		let messages = [];
		for (const m of data.flat()) {
			const message = new Message(this.client, m, this.channel);
			
			if (this.size > 200) {
				this.delete(this.first.id);
			}

			messages.push(message);

			this.set(message.id, message);
		}
		return messages;
	}
};