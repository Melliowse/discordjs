const Shard = require("../structures/Shard"),
	{ pack, unpack } = require("erlpack"),
	{ WebSocket: ws } = require("ws"),
	{ Agent } = require("https");
module.exports = class {
	constructor(client) {
		this.client = client;
		this.events = require("./Events")(this);
		this._shards = [];

		this.socket		= new ws(
			`wss://gateway.discord.gg/?v=9&encoding=etf`,
			{
				agent: new Agent({ keepAlive: true}),
				headers: {
					Authorization: `Bot ${this.client.token}`	
				}
			}
		);

		this.heartbeatInterval	= null;
		this.opened				= false;
		this.heartbeat			= null;

		this.socketQueue = [];

		this.socket.on("close", (code, reason) => console.log(code, reason.toString()))
		this.socket.on("open", () => {
			this.opened = true;
			this.client.emit("socketOpen");

			if (this.heartbeatInterval !== null) {
				this.startHeartbeat();
			}

			for (const queueEntry of this.socketQueue) {
				setTimeout((() => {
					this[queueEntry[0]](...queueEntry[1]);
				}, 2000).bind(this))
			}
		});

		this.socket.on("message", _data => {
			const data = unpack(_data);
			switch (data.op) {
				default:
					console.log(data);
					break;
				case 0:
					if (this.events[data.t] !== void 0) {
						this.events[data.t].run(data.d, data.s);
					}
					break;
				case 10:
					this.heartbeatInterval	= data.d.heartbeat_interval;

					if (this.socket.readyState === 1) {
						this.startHeartbeat();
					}
					break;
				case 11: break;
			}
		});
	}

	get(id) {
		return this._shards.find(s => s.id === id);
	}

	async spawn() {
		this.client.debug("Spawning shards...");
		for await (const id of Array.from({ length: this.client.options.shardCount }, (_, index) => index)) {
			const shard = new Shard(this, id);
			this._shards.push(shard);
		}
	}

	startHeartbeat() {
		this.client.debug(`[WS] Heartbeat started.`);
		this.heartbeat = setInterval(() => {
			this.send(1);
		}, this.heartbeatInterval);
	}

	send(op, d, t, s) {
		if (this.opened === false && op !== 1) {
			return this.socketQueue.push(["send", [op, d, t, s]]);
		}
		const _d = pack({
			op, d, t, s,
		});
		this.socket.send(_d);
	}
	
	async connect() {
		// await this.client.api.gateway.bot.get();
		// // console.log(this.client.api.gateway.bot)
		// // const h = await this.client.api.gateway.bot.get();
		// //   console.log(h);
		this.send(2, {
			token: this.client.token,
			compress: false,
			large_threshold: 250,
			properties: {
				"$os": "linux",
				"$browser": "disco",
				"$device": "disco"
			},
			"presence": {
			  "activities": [{
				"name": "Cards Against Humanity",
				"type": 0
			  }],
			  "status": "dnd",
			  "since": 91879201,
			  "afk": false
			},
			intents: 513,
		}, true);
		// // this.ws.send({
		// 	op: 2,
		// 	d: {
		// 	  token: "my_token",
			//   properties: {
			// 	$os: "linux",
			// 	$browser: "disco",
			// 	$device: "disco"
			//   },
		// 	  compress: true,
		// 	  large_threshold: 250,
		// 	  shard: [0, 1],
		// 	  presence: {
		// 		activities: [{
		// 		  name: "Cards Against Humanity",
		// 		  type: 0
		// 		}],
		// 		status: "dnd",
		// 		since: 91879201,
		// 		afk: false
		// 	  },
		// 	  // This intent represents 1 << 0 for GUILDS, 1 << 1 for GUILD_MEMBERS, and 1 << 2 for GUILD_BANS
		// 	  // This connection will only receive the events defined in those three intents
		// 	  intents: 7
		// 	}
		//   });
	}
};