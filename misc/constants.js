exports.ClientOptions = {
	ws: {},
	api: {
		version: 9,
		encoding: "json",
		url: "https://discord.com/api",
		cdn: "https://cdn.discordapp.com",
	},
	intents: 98047,
	shardCount: 1,
	cache: {
		messages: {
			size: 200,
			life: 60_000,
		},
		emojis: {
			size: 500,
			life: 60_000,
		},
		channels: {
			size: 500,
			life: -1,
		},
		roles: {
			size: 500,
			life: -1,
		},
	},
};