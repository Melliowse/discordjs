const Message = require("../../../structures/Message");
module.exports = class extends (require("../../../structures/Event")) {
	constructor(manager) {
		super(manager);
	}
	
	async run(data) {
		let channel;

		channel = await this.manager.client.channels.fetch(data.channel_id, {
			guildID: data?.guild_id,
			cache: true,
			recipients: [
				data?.author?.id || data?.user?.id
			]
		});

		if (channel === null) {
			return;
		}

		const message = new Message(this.manager.client, data, channel);

		channel.messages.set(data.id, message);
		this.manager.client.emit("message", message);
	}
};