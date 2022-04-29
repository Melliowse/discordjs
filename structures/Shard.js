module.exports = class extends (require("events")) {
	constructor(manager, id) {
		super();
		this.manager	= manager;
		this.id			= id;
	}

	connect() {
	}
};