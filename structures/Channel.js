module.exports = class {
	constructor(client, data, guild) {
		this.client = client;
		this.guild = guild;
		this.id = data.id;
		this._patch(data);
	}

	_patch(data) {
		this.name		= data?.name || this?.name || null;
		this.position	= data?.position || this?.position || null;
	}
};