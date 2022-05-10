module.exports = class Container {
	_data = null;
	constructor(entries = []) {
		this._data = new Map(entries);
	}

	get values() {
		return [...this._data.values()];
	}

	get keys() {
		return [...this._data.keys()];
	}

	get size() {
		return this._data.size;
	}

	get(key) {
		return this._data.get(key);
	}

	set(key, value) {
		this._data.set(key, value);
		return this;
	}

	get first() {
		return this.values[0];
	}

	get last() {
		return this.values[this.size - 1];
	}

	toJSON() {
		return this.values;
	}

	toString() {
		return `Container<${this.size}>`;
	}

	sort(compareFn) {
		return this.values.sort(compareFn);
	}
};