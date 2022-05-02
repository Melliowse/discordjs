module.exports = manager => {
	return {
		"GUILD_CREATE":		new (require("./GUILD_CREATE"))(manager),
		"MESSAGE_CREATE":		new (require("./MESSAGE_CREATE"))(manager),
		"READY":			new (require("./READY"))(manager),
	};
};