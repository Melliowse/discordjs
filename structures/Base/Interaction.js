const TextBasedChannel = require("./TextChannel");

/**
 * @class Interaction
 */
class Interaction {
	constructor(client, data) {
		this.client = client;
		this.id		= data?.id;
		this.token	= data?.token;
		this.type	= {
			1: "PING",
			2: "APPLICATION_COMMAND",
			3: "MESSAGE_COMPONENT",
			4: "APPLICATION_COMMAND_AUTOCOMPLETE",
			5: "MODAL_SUBMIT",
		}[data.type];
	}

	async think() {
		return await this.client.api.interactions[this.id][this.token]
			.post({ type: 1 });
	}

	async reply(contentOrEmbed, options) {
		return await this.client.api.interactions[this.id][this.token]
			.post({
				type: 4,
				data: TextBasedChannel.parse(contentOrEmbed, options)
			});
	}

	async edit(contentOrEmbed, options) {
		return await this.client.api.interactions[this.id][this.token]
			.post({
				type: 7,
				data: TextBasedChannel.parse(contentOrEmbed, options)
			});
	}

	// Alias for discord.js users
	update(contentOrEmbed, options) {
		return this.edit(contentOrEmbed, options);
	}
}

module.exports = Interaction;