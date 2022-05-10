const { Event, Message } = require("../");
module.exports = class extends Event {
	constructor(shard) {
		super(shard);
	}
	
	async run(data) {
		let channel;

		channel = await this.shard.client.channels.fetch(data.channel_id, {
			guildID: data?.guild_id,
			cache: true,
			recipients: [
				data?.author?.id || data?.user?.id
			]
		});

		if (channel === null) {
			return;
		}

		const message = new Message(this.shard.client, data, channel);

		channel.messages.set(data.id, message);
		this.shard.client.emit("message", message);
	}
};