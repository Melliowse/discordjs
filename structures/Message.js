const Embed = require("./Embed");
module.exports = class Message {
	constructor(client, data, channel) {
		this.client = client;
		this.channel = channel;

		this.id = data.id;

		this._patch(data);
	}

	_patch(data) {
		this.content	= data?.content 	|| null;
		this.type		= data?.type		|| null;
		this.tts		= data?.tts			|| false;
		this.channelID	= data?.channel_id	|| null;

		this.isReply	= data?.type === 19;

		this.embeds	= [
			...(data?.embeds).map(e => new Embed(e)),
		];

		this.repliedTo = {
			messageID:	data?.message_reference?.message_id	|| null,
			guildID:	data?.message_reference?.guild_id	|| null,
			channelID:	data?.message_reference?.channel_id	|| null,
		};

		this.authorID = data?.author?.id;
		this.client.users.add(data.author)
	}

	get author() {
		return this.client.users[this.authorID];
	}

	toJSON(opts = {}) {
		opts = {
			referenceCatch: false,
			...opts,
		};

		return {
			content: this?.content || null,
			embeds: [
				...this.embeds.map(e => e.toJSON())
			],
			tts: this.tts,
			message_reference: this.isReply ? {
				message_id:			this.repliedTo.messageID,
				guild_id:			this.repliedTo.guildID,
				channel_id:			this.repliedTo.channelID,
				fail_if_not_exists:	opts.referenceCatch,
			} : null,
		}
	}

	static parse(data) {
	}
};