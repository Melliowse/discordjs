const Channel = require("../structures/Channel"),
	TextChannel = require("../structures/TextChannel");

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

	async fetch(id, options = { guildID: null, cache: true }) {
		if (this[id] !== void 0 && options?.cache !== false) {
			return this[id];
		}
		return await this.client.api.channels(id).get();
	}

	add(data, guild) {
		let channelType;
		switch (data.type) {
			default:
				channelType = Channel;
			case 0:
				channelType = TextChannel;
		}
		this.set(data.id, new channelType(this, data, guild));
	}
};