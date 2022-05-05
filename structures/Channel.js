module.exports = class Channel {
	constructor(client, data, guild) {
		this.client		= client;
		this.id			= data.id;
		if (guild !== void 0) {
			this.guild		= guild;
			Object.defineProperty(this, "guildID", {
				get: () => {
					return this.guild.id;
				}
			});
		} else {
			this.guildID = null;
		}
		this._patch(data);
	}

	_patch(data) {
		this.name		= data?.name || this?.name || null;
		this.position	= data?.position || this?.position || null;
	}

	toString() {
		return `${this.type[0].toUpperCase()}${this.type.slice(1)}Channel`;
	}
};