const Message = require("../structures/Message");
module.exports = class MessageManager extends (require("../structures/Base/Manager")) {
	constructor(client, channel) {
		super();
		this.channel	= channel;
		this.client		= client;
	}

	add(...data) {
		for (const m of data.flat()) {
			const message = new Message(this.client, m, this.channel);
			
			if (this.size > 200) {
				this.delete(this.first.id);
			}

			this.set(message.id, message);
		}
	}
};