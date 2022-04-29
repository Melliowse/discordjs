module.exports = class extends (require("./BaseClient")) {
	constructor(options) {
		super();
		this.token = null;
		this.options = {
			ws: {

			},
			api: {
				version:	9,
				encoding:	"json",
				url: "https://discord.com/api"
			},
			shardCount:	1,
			...options
		};

		this.rest		= new (require("../managers/RestManager"))(this);
		this.guilds		= new (require("../managers/GuildManager"))(this);

		this.user		= null;
	}

	get api() {
		return this.rest.api;
	}

	async login(token = this.token) {
		this.token = `${token.replace(/^(Bot|Bearer) /, "")}`;
		this.shards = new (require("../managers/ShardManager"))(this);

		this.debug("Logging in...");
		await this.shards.spawn();
		this.once("socketOpen", () => {
			this.shards.connect();
		});
	}
};