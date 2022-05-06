const Channel = require("../structures/Channel"),
	TextChannel = require("../structures/channels/TextChannel"),
	User = require("../structures/User"),
	DMChannel = require("../structures/channels/DMChannel"),
	CategoryChannel = require("../structures/channels/CategoryChannel");

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
		return this.client.channels.filter(c => c.guildID === this.guild.id).map(c => ({ added: 0, value: c}));
	}

	parse(data) {
		let channelType;
		switch (data.type) {
			default:
				channelType = Channel; break;
			case 0:
				channelType = TextChannel; break;
			case 1:
				channelType = DMChannel; break;
			case 4:
				channelType = CategoryChannel; break;
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
		if (id instanceof User) {
			const channel = await this.client.api.users["@me"].channels(id).get({
				recipients: options.recipients
			});

			this.add(channel);
			id.dmChannelID = channel.id;

			return this[channel.id];
		}

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
			case 4:
				channelType = CategoryChannel; break;
		}
		this.set(data.id, new channelType(this.client, data, guild));
	}
};