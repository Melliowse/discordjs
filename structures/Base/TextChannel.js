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
			tts:				false,
		};

		if (contentOrEmbed instanceof Embed) {
			obj.embeds = [
				contentOrEmbed.toJSON(),
			];
		} else {
			obj.content = `${contentOrEmbed}`;
		}

		if (options?.reference !== void 0) {
			obj.message_reference = {
				message_id: options.reference.id,
				channel_id: options.reference.channelID,
			};
			if (options.reference?.guildID !== null) {
				obj.message_reference.guild_id = options.reference?.guildID || null;
			}
		}

		this.client.api.channels[this.id].messages.post(obj).catch(console.log);
	}
}