module.exports = class User {
	constructor(client, data) {
		this.client = client;
		this._patch(data);
	}

	_patch(data) {
		this.id				= data.id;

		this.username		= data.username;
		this.discriminator	= data.discriminator;

		this.avatarHash		= data?.avatar			|| null;
		this.bannerHash		= data?.banner			|| null;

		this.bot			= data?.bot				|| false;
		this.system			= data?.system			|| false;
		this.accentColour	= data?.accent_color	|| "#000000";
	}

	get accentColor()	{	return this.accentColour;	}

	get avatar() {
		return this.avatarHash !== null
			? `${this.client.options.api.cdn}/avatars/${this.id}/${this.avatarHash}.${/^a_/.test(this.avatarHash) ? "gif" : "png"}`
			: `${this.client.options.api.cdn}/embed/avatars/${this.discriminator}.png`;
	}

	get banner() {
		return `${this.client.options.api.cdn}/banners/${this.id}/${this.bannerHash}.${/^a_/.test(this.bannerHash) ? "gif" : "png"}`;
	}
};