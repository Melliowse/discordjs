const Channel = require("../structures/Channel"),
	TextChannel = require("../structures/TextChannel"),
	DMChannel = require("../structures/DMChannel");

class GuildChannelManager extends (require("../structures/Base/SubManager")) {
	constructor(client, guild, data) {
		super();
		this.client = client;
		
		this.guild = guild;

		for (const channel of data) {
			this.client.channels.add(channel, this.guild);
		}
	}

	get _data() {
		return this.client.channels.filter(c => c.guildID === this.guild.id);
	}

	parse(data) {
		let channelType;
		switch (data.type) {
			default:
				channelType = Channel;
			case 0:
				channelType = TextChannel;
		}
		return new channelType(this, data, this.guild);
	}
}

module.exports = class extends (require("../structures/Base/Manager")) {
	constructor(client, guild, data) {
		super();

		this.client = client;
		if (guild !== void 0) {
			return new GuildChannelManager(client, guild, data);
		}
	}

	async fetch(id, options = { guildID: null, cache: true, recipients: [] }) {
		if (this[id] !== undefined && options?.cache !== false) {
			return this[id];
		}

		const channel = await this.client.api.channels(id).get().catch(console.log);
		this.add(channel);
		return this[channel.id];
	}

	add(data, guild) {
		let channelType;
		switch (data.type) {
			default:
				channelType = Channel; break;
			case 0:
				channelType = TextChannel; break;
			case 1:
				channelType = DMChannel; break;
		}
		this.set(data.id, new channelType(this.client, data, guild));
	}
};