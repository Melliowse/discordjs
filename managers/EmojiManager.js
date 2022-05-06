const Emoji = require("../structures/Emoji");

class ClientEmojiManager extends (require("../structures/Base/SubManager")) {
	constructor(client) {
		super(client);
	}

	toString() {
		return `Emojis<${this.size}>`;
	}

	get _data() {
		return this.client.guilds.map(g => g.emojis.entries).map(e => ({added: 0, value: e}));
	}
}

module.exports = class EmojiManager extends (require("../structures/Base/Manager")) {
	constructor(client, guild, data = []) {
		super(client);

		if (guild === void 0) {
			return new ClientEmojiManager(client);
		}

		this.guild = guild;

		for (const emoji of data) {
			this.client.emojis.add(emoji, this.guild);
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

	valueOf() {
		return `EmojiManager<${this.size}>`;
	}

	toJSON() {
		return {
			count: this.size,
		};
	}
};