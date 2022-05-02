module.exports = class Channel {
	constructor(client, data, guild) {
		this.client		= client;
		this.guild		= guild;
		this.id			= data.id;
		this._patch(data);
	}

	get guildID() {
		return this.guild.id;
	}

	_patch(data) {
		this.name		= data?.name || this?.name || null;
		this.position	= data?.position || this?.position || null;
	}

	toString() {
		return `${this.type[0].toUpperCase()}${this.type.slice(1)}Channel`;
	}
};