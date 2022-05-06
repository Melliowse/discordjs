const Intents = require("./Intents"),
	{ ClientOptions } = require("../misc/constants");

/**
 * @class Client
 */
class Client extends (require("./Base/Client")) {
	#token = null;
	/**
	 * @param {ClientOptions} options
	 */
	constructor(options) {
		super();

		this.options = {
			...ClientOptions,
			...options
		};

		this.rest		= new (require("../managers/RestManager"))(this, this.#token);
		this.guilds		= new (require("../managers/GuildManager"))(this);
		this.users		= new (require("../managers/UserManager"))(this);
		this.emojis		= new (require("../managers/EmojiManager"))(this);
		this.channels	= new (require("../managers/ChannelManager"))(this);
		this.id			= null;
		this.sessionID	= null;

		this.initialGuilds = [];
		this.intents = this.options.intents;
	}

	get api() {
		return this.rest.api;
	}

	async login(token = this.token) {
		this.#token = `${token.replace(/^(Bot|Bearer) /, "")}`;
		this.shards = new (require("../managers/ShardManager"))(this, this.#token);
		this.rest.token = this.#token;

		this.debug("Logging in...");
		await this.shards.spawn();
		this.once("socketOpen", () => {
			this.shards.connect();
		});
		return;
	}
	
	_afterIdentify() {
		this.setUsername = name => {
			return this.api.users("@me").patch({username: name});
		};
	}
};
module.exports = Client;