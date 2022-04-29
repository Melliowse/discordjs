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
	constructor(client) {
		this.client = client;
	}

	get api() {
		return this.buildRoute();
	}

	request(method, path, data, opts = {}) {
		const url = `${this.client.options.api.url}${(opts?.versioned || false) ? `/v${this.client.options.api.version}` : ""}${path}`;
		const headers = {
			Authorization: this.client.token,
			"Content-Type": "application/json",
			"User-Agent": `DiscordBot (Discordjs, 1.0.0) Node.js/${process.version}`
		};
		console.log(url);
		return axios({
			method,
			url,
			headers,
			data: JSON.stringify(opts)
		}).catch(console.log);
	}

	buildRoute() {
		let route = [""];
		const manager = this;
		const handler = {
			get(target, name) {
				if (reflectors.includes(name)) {
					return () => route.join("/");
				}
				if (methods.includes(name)) {
					const routeBucket = [];
					for (let i = 0; i < route.length; i++) {
						if (route[i - 1] === "reactions") break;
						if (/\d{16,19}/g.test(route[i]) && !/channels|guilds/.test(route[i - 1])) {
							routeBucket.push(":id");
						} else {
							routeBucket.push(route[i]);
						}
					}
					return options =>
						manager.request(
							name,
							route.join("/"),
							Object.assign(
								{
									versioned: true,
									route: routeBucket.join('/'),
								},
								options,
							),
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