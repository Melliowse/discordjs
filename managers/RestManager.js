const { default: axios } = require("axios"),
	noop = () => { },
	methods = ['get', 'post', 'delete', 'patch', 'put'],
	reflectors = [
		'toString',
		'valueOf',
		'inspect',
		'constructor',
		Symbol.toPrimitive,
		Symbol.for('nodejs.util.inspect.custom'),
	];
module.exports = class {
	#token = null;
	constructor(client, token) {
		this.client = client;
		this.#token = token;
	}

	set token(token) {
		this.#token = token;
	}

	get api() {
		return this.buildRoute();
	}

	async request(method, path, data, opts) {
		const url = `${this.client.options.api.url}${(data?.versioned || false) ? `/v${this.client.options.api.version}` : ""}${path}`;
		const headers = {
			Authorization: `Bot ${this.#token}`,
			"Content-Type": "application/json",
			"User-Agent": `DiscordBot (Discordjs, 1.0.0) Node.js/${process.version}`
		};
		console.log(opts)
		return (await axios({
			method,
			url,
			headers,
			data: opts !== void 0 ? JSON.stringify(opts) : void 0,
			body: opts !== void 0 ? JSON.stringify(opts) : void 0
		})).data;
	}

	buildRoute() {
		let route = [""];
		const manager = this,
			handler = {
			get(target, name) {
				if (reflectors.indexOf(name) !== -1) {
					return () => route.join("/");
				}

				if (methods.indexOf(name) !== -1) {
					return (data) => {
						return manager.request(
							name,
							route.join("/"),
							{
								route: route.join('/'),
								versioned: true,
								"Content-Type": "application/json"
							},
							data
						);
					};
				}

				route.push(name);
				return new Proxy(() => {}, handler);
			},
			apply(target, _, args) {
				route.push(...args.filter(x => x !== null));
				return new Proxy(() => {}, handler);
			},
		};
		return new Proxy(() => {}, handler);
	}

	_buildRoute() {
		let route = [""];
		const manager = this;
		const handler = {
			get(target, name) {
				if (methods.includes(name)) {
					const routeBucket = [];
					// for (let i = 0; i < route.length; i++) {
					// 	if (route[i - 1] === "reactions") break;
					// 	if (/\d{16,19}/g.test(route[i]) && !/channels|guilds/.test(route[i - 1])) {
					// 		routeBucket.push(":id");
					// 	} else {
					// 		routeBucket.push(route[i]);
					// 	}
					// }
					return options => 
						manager.request(
							name,
							route.join("/"),
							{
								route: routeBucket.join('/'),
								versioned: true
							},
							options
						);
				}
				route.push(name);
				return new Proxy(noop, handler);
			},
			apply(target, _, args) {
				route.push(...args.filter(x => x !== null));
				return new Proxy(noop, handler);
			},
		};
		return new Proxy(noop, handler);
	}
};