const Base = require("./Base"),
	EventManager = require("../managers/EventManager.js"),
	{ WebSocket } = require("ws"),
	{ Agent } = require("https"),
	{ unpack, pack } = require("erlpack");

module.exports = class Shard extends Base {
	constructor(manager, id, token) {
		super(manager.client);
		this.manager = manager;
		this.id = id;
		this.opened = false;
		this.heartbeatInterval = null;
		this.socketQueue = [];
		this.events = EventManager(this);

		this.socket = new WebSocket(
			`wss://gateway.discord.gg/?v=9&encoding=etf`,
			{

				agent: new Agent({ keepAlive: true }),
				headers: {
					Authorization: `Bot ${token}`,
				}
			}
		);


		this.socket.on("close", (code, reason) => {
			this.client.debug(`[SHARD ${this.id}] Websocket closed. (${code} ${reason})`);
		});

		this.socket.on("open", () => {
			this.opened = true;
			this.client.emit("socketOpen");

			if (this.heartbeatInterval !== null) {
				this.startHeartbeat();
			}

			for (const queueEntry of this.socketQueue) {
				setTimeout((() => {
					this[queueEntry[0]](...queueEntry[1]);
				}).bind(this), 2000);
			}
		});

		this.socket.on("message", (_data) => {
			const data = unpack(_data);
			switch (data.op) {
				default:
					console.log(data);
					break;
				case 0:
					if (this.events[data.t] !== void 0) {
						this.events[data.t].run(data.d);
					}
					break;
				case 10:
					this.heartbeatInterval = data.d.heartbeat_interval;

					if (this.socket.readyState === 1) {
						this.startHeartbeat();
					}
					break;
				case 11: break;
			}
		});
	}

	async send(op, d = null, t = null, s = null) {
		if (this.opened === false && op !== 1) {
			return this.socketQueue.push(["send", [op, d, t, s]]);
		}
		const _d = pack({
			op, d, t, s,
		});
		return this.socket.send(_d);
	}

	startHeartbeat() {
		this.client.debug(`[WS] Heartbeat started.`);
		this.heartbeat = setInterval(() => {
			this.send(1);
		}, this.heartbeatInterval);
	}

	async connect(token) {
		this.client.debug(`[SHARD ${this.id} => WS] Identifying...`);
		return await this.send(2, {
			token: token,
			compress: false,
			large_threshold: 250,
			properties: {
				"$os": "linux",
				"$browser": "disco",
				"$device": "disco"
			},
			presence: {
				status: "online",
				since: 91879201,
				afk: false,
				activities: [],
			},
			shard: [this.id, this.client.options.shardCount],
			intents: this.client.options.intents,
		}, true);
	}
};