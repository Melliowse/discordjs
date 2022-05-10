module.exports = class Shard extends (require("events")) {
	constructor(manager, id) {
		super();
		this.manager	= manager;
		this.id			= id;
	}

	connect() {
	}
};