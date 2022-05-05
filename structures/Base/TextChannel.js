const Embed = require("../Embed");
module.exports = class TextBasedChannel {
	apply(obj) {
		for (const prop of [
			"send"
		]) {
			Object.defineProperty(obj, prop, {
				value: this[prop].bind(obj),
			});
		}
	}

	send(contentOrEmbed, options) {
		let obj = {
			embeds:				[],
			content:			null,
			tts:				false,
			message_reference:	null,
		};

		if (Embed.is(contentOrEmbed)) {
			obj.embeds = [
				contentOrEmbed.toJSON(),
			];
		}

		if (!Object.is(contentOrEmbed)) {
			obj.content = `${contentOrEmbed}`;
		}

		if (options.reference !== void 0) {
			obj.message_reference = {
				message_id: options.reference.id,
				guild_id:	options.reference?.guildID,
				channel_id: options.reference.channelID,
			};
		}

		this.client.api.channels[this.id].messages.post(obj);
	}
}