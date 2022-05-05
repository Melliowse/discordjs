const Emoji = require("../structures/Emoji");

class GuildEmojiManager extends (require("../structures/Base/SubManager")) {
	constructor(client, guild, data = []) {
		super();
		this.client = client;
		
		this.guild = guild;

		for (const emoji of data) {
			this.client.emojis.add(emoji, this.guild);
		}
	}

	add(...args) {
		return this.client.emojis.add(...args);
	}

	toString() {
		return `Emojis<${this.size}>`;
	}

	get _data() {
		return this.client.emojis.filter(c => c?.guildID === this.guild.id);
	}
}

module.exports = class EmojiManager extends (require("../structures/Base/Manager")) {
	constructor(client, guild, data) {
		super();
		this.client = client;

		if (guild !== void 0) {
			return new GuildEmojiManager(client, guild, data);
		}
	}

	toString() {
		return `Emojis<${this.size}>`;
	}

	async fetch(id, guild, options = { cache: true }) {
		if (this[id] !== void 0 && options?.cache !== false) {
			return this[id];
		}

		guild = typeof guild === "string" ? guild : guild.id;

		this.add(await this.client.api.guilds(guild).emojis(id).get(), guild);
	}

	add(data, guild) {
		guild = typeof guild === "string" ? guild : guild.id;

		const emoji		= new Emoji(
			this.client,
			data,
			guild
		);
		this[emoji.id]	= emoji;
		return emoji;
	}
};