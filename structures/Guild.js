module.exports = class Guild {
	constructor(client, data) {
		this.client		= client;
		this.emojis		= new (require("../managers/EmojiManager"))(this.client, this);
		this.members	= new (require("../managers/MemberManager"))(this);
		this._patch(data);
	}

	get owner() {
		return this.members?.[this.ownerID] || null;
	}

	get icon() {
		return `${this.client.options.api.cdn}/icons/${this.iconHash}.${/^a_/.test(this.iconHash) ? "gif" : "png"}`;
	}

	_patch(data) {
		if (data?.members?.length > 0) {
			for (const member of data.members) {
				this.members.add(member);
			}
		}

		if (data?.emojis?.length > 0) {
			for (const emoji of data.emojis) {
				this.emojis.add(emoji, this);
			}
		}

		if (data?.channels?.length > 0) {
			for (const channel of data.channels) {
				this.client.channels.add(channel);
			}
		}

		this.id				= data.id;
		this.name			= data.name;
		this.description	= data?.description;

		this.boosting		= {
			tier:				data.premium_tier,
			count:				data.premium_subscription_count ?? null,
			progressbar:		data.premium_progress_bar_enabled,
		};

		this.locale			= data.preferred_locale ?? "en-US";

		this.nsfwLevel		= data.nsfw_level || 0;
		this.mfaLevel		= data.mfa_level;

		this.ownerID		= data?.owner_id || null;
		this.iconHash		= data?.icon || null;

		this.afk			= {
			timeout:			data?.afk_timeout || 0,
			channelID:			data?.afk_channel_id || null,
			get channel() {
				return;
			},
		};

		this.channels	= new (require("../managers/ChannelManager"))(this.client, this, data?.channels);
	}

	async leave() {
		this.client.api.users("@me").guilds(this.id).delete();
	}

	toString() {
		return "Guild";
	}
};