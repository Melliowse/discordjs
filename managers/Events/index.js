module.exports = manager => {
	return {
		client: manager.client,
		"CHANNEL_CREATE":	new (require("./handlers/CHANNEL_CREATE"))(manager),
		"MESSAGE_CREATE":	new (require("./handlers/MESSAGE_CREATE"))(manager),
		"GUILD_CREATE":		new (require("./handlers/GUILD_CREATE"))(manager),
		"GUILD_DELETE":		new (require("./handlers/GUILD_DELETE"))(manager),
		"INTERACTION_CREATE":		new (require("./handlers/INTERACTION_CREATE"))(manager),
		"READY":			new (require("./handlers/READY"))(manager),
	};
};