module.exports = shard => {
	return {
		"CHANNEL_CREATE":		new (require("../events/CHANNEL_CREATE"))(shard),
		"MESSAGE_CREATE":		new (require("../events/MESSAGE_CREATE"))(shard),
		"GUILD_CREATE":			new (require("../events/GUILD_CREATE"))(shard),
		"GUILD_DELETE":			new (require("../events/GUILD_DELETE"))(shard),
		"INTERACTION_CREATE":	new (require("../events/INTERACTION_CREATE"))(shard),
		"READY":				new (require("../events/READY"))(shard),
	};
};