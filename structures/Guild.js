module.exports = class {
	constructor(client, data) {
		this.client		= client;
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
			for (const m of data.members) {
				this.members.add(m);
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
	}
};