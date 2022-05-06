const Base = require("./");
class SubManager extends Base {
	constructor(client) {
		super(client);
	}

	get size()		{	return this._data.size;							}
	get keys()		{	return [...this._data.keys()];					}
	get values()	{	return [...this._data.values()];				}
	get entries()	{	return [...this._data.entries()];				}

	sort(fn)		{	return this.values.sort(fn);	}
	find(fn)		{	return this.values.find(fn);	}
	filter(fn)		{	return this.values.filter(fn);	}
	delete(v)		{	return this._data.delete(v);	}
	map(fn)			{	return this.values.map(f => f.value).map(fn);	}

	get	first()		{
		return [...this._data.values].sort((b, a) => a.added - b.added)[0];
	}

	get	last()		{
		return [...this._data.values].sort((a, b) => a.added - b.added)[0];
	}

	get(key) {
		return this._data.get(key).value;
	}

	set(key, value) {
		this._data.set(key, {
			added: this.size,
			value: value,
		});

		if (this[key] === void 0) {
			Object.defineProperty(this, key, {
				get: () => {
					return this.get(key);
				},
			});
		}
		return this;
	}

	toString() {
		return `Manager<${this.size}>`;
	}

	toJSON() {
		return this.toString();
	}
};

module.exports = SubManager;