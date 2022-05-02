module.exports = class Emoji {
	constructor(client, data, guild) {
		this.client = client;
		this.id		= data.id;

		if (guild !== void 0) {
			this.guild = guild;
		}

		this._patch(data);
	}

	_patch(data) {
		this.name			= data.name;
		this.managed		= data?.managed						|| false;
		this.animated		= data?.animated					|| false;
		this.available		= data?.available					|| true;
		this.colonsRequired	= data?.require_colons				|| true;
		this.creator		= data.user !== void 0
			? this.client.users.add(data.user)
			: null;
	}

	toString() {
		return `<${this.animated ? "a" : ""}:${this.name}:${this.id}>`;
	}
}