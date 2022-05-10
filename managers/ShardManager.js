const Base = require("../structures/Base"),
	Shard = require("../structures/Shard"),
	{ pack, unpack } = require("erlpack"),
	{ WebSocket: ws } = require("ws"),
	{ Agent } = require("https");

module.exports = class extends Base {
	#token = null;
	constructor(client) {
		super(client);
		this.shards = [];
	}

	get(id) {
		return this._shards.find(s => s.id === id);
	}

	async spawn(token, count = this.client.options.shardCount) {
		this.client.debug("Spawning shards...");
		for (let i = 0; i < count; i++) {
			const shard = new Shard(this, i, token);
			await shard.connect(token);
			this.shards.push(shard);
		}
	}

	async connect() {
	}
};