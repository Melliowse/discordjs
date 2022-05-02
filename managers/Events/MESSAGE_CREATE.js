const Message = require("../../structures/Message");
module.exports = class extends (require("../../structures/Event")) {
	constructor(manager) {
		super(manager);
	}
	
	async run(data) {
		let channel;
		
		if (this.manager.client.channels[data.channel_id] !== void 0) {
			channel = await this.manager.client.channels.fetch(data.channel_id, { guildID: data?.guild_id, cache: true });
		}

		if (channel === null) {
			return;
		}

		const message = new Message(this.manager.client, data, channel);

		channel.messages.set(data.id, message);
		this.manager.client.emit("message", message);
	}
};