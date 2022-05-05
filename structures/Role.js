const Permissions = require("./Permissions");

module.exports = class Role {
	constructor(guild, data) {
		this.guild	= guild;

		this.id		= data.id;
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
	}

	toJSON() {
		return {
			color: this.color
		};
	}

	get colour() {
		return this.colourValue.toString(16);
	}
	
	toString()	{	return `<@&${this.id}>`;	}
	get color()	{	return this.colour;			}
}