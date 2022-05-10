const Container = require("../Container");


module.exports = class Manager extends Container {
	constructor(client) {
		super();
		this.client = client;
	}

	set(key, value) {
		super.set(key, value);
		
		if (this[key] === void 0) {
			Object.defineProperty(this, `${key}`, {
				get() {
					return this.get(`${key}`);
				}
			});
		}

		return this;
	}

	toJSON() {
		return this.values;
	}

	toString() {
		return `Manager<${this.size}>`;
	}
};