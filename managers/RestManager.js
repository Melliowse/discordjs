const { default: axios } = require("axios"),
	methods = ["get", "post", "delete", "patch", "put"],
	reflectors = [
		"toString",
		"valueOf",
		"inspect",
		"constructor",
		Symbol.toPrimitive,
		Symbol.for("nodejs.util.inspect.custom"),
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
				get(_target, name) {
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
					return new Proxy(() => { }, handler);
				},
				apply(_target, _, args) {
					route.push(...args.filter(x => x !== null));
					return new Proxy(() => { }, handler);
				},
			};
		return new Proxy(() => { }, handler);
	}
};