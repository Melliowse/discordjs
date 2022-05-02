const Permissions = require("./Permissions");

module.exports = class Role {
	constructor(client, data, guild) {
		this.client = client;

		this.id		= data.id;

		this.guild = guild;
		this._patch(data);
	}

	_patch(data) {
		this.name			= data.name;
		this.colourValue	= data?.color			|| 0;
		this.position		= data?.position		|| 0;

		this.hoist			= data?.hoist			|| false;
		this.mentionable	= data?.mentionable		|| false;
		this.managed		= data?.managed			|| false;
		this.unicode		= data?.unicode_emoji	|| null;
		this.permissions	= new Permissions(data?.permissions);
		console.log(this);
	}

	toJSON() {
		return {
			color:	
		};
	}

	get colour() {
		return this.colourValue.toString(16);
	}
	
	toString()	{	return `<@&${this.id}>`;	}
	get color()	{	return this.colour;			}
}