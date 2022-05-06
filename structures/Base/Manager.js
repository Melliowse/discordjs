const Base = require("./");
class BaseManager extends Base {
	#data = new Map();
	#count = 0;
	constructor(client, data) {
		super(client);
	}

	get size()		{	return this.#data.size;							}
	get keys()		{	return [...this.#data.keys()];					}
	get values()	{	return [...this.#data.values()].map(f => f.value);				}
	get entries()	{	return [...this.#data.entries()].map(f => {
		console.log(f);
		return { name: f[0], value: f[1].value }
	});				}

	sort(fn)		{	return this.values.map(f => f.value).sort(fn);	}
	find(fn)		{	return this.values.map(f => f.value).find(fn);	}
	filter(fn)		{	return this.values.filter(fn);					}
	map(fn)			{	return this.values.map(f => f.value).map(fn);	}
	delete(v)		{	return this.#data.delete(v)						}

	get	first()		{
		return this.values.sort((b, a) => a.added - b.added)[0];
	}

	get	last()		{
		return this.values.sort((a, b) => a.added - b.added)[0];
	}

	get(key) {
		return this.#data.get(key)?.value || void 0;
	}

	set(key, value) {
		this._count = this._count + 1;
		this.#data.set(key, {
			added: this._count,
			value: value,
		});

		if (this[key] === void 0) {
			Object.defineProperty(this, key, {
				get: () => {
					return this.get(key);
				},
				set(v) {
					this.set(key, v);
				}
			});
		}
		return this;
	}

	toString() {
		return `Manager<${this.size}>`;
	}

	valueOf() {
		return `Manager<${this.size}>`;
	}

	toJSON() {
		return `Manager<${this.size}>`;
	}
};

module.exports = BaseManager;