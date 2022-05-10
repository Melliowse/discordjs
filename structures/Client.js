const { ClientOptions } = require("../misc/constants"),
	RestManager = require("../managers/RestManager"),
	UserManager = require("../managers/UserManager"),
	GuildManager = require("../managers/GuildManager"),
	ChannelManager = require("../managers/ChannelManager"),
	BaseClient = require("./Base/Client");

module.exports = class Client extends BaseClient {
	_token = null;
	constructor(options) {
		super(options);

		this.rest = new RestManager(this, this._token);
		this.users = new UserManager(this);
		this.guilds = new GuildManager(this);
		this.channels = new ChannelManager(this);
	}

	get api() {
		return this.rest.api;
	}

	async login(token = this._token) {
		this._token = `${token.replace(/^(Bot|Bearer) /, "")}`;
		this.shards = new (require("../managers/ShardManager"))(this, this._token);
		this.rest.token = this._token;

		this.debug("Logging in...");
		await this.shards.spawn(this._token);
		return;
	}
	
	_afterIdentify() {
		this.setUsername = name => {
			return this.api.users("@me").patch({username: name});
		};
	}
};