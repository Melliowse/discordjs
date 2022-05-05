module.exports = class {
	constructor(data) {
		this._count = 0;
		this._data = new Map();
	}

	get size()		{	return this._data.size;							}
	get keys()		{	return [...this._data.keys()];					}
	get values()	{	return [...this._data.values()].map(f => f.value);				}
	get entries()	{	return [...this._data.entries()].map(f => {
		console.log(f);
		return { name: f[0], value: f[1].value }
	});				}

	sort(fn)		{	return this.values.map(f => f.value).sort(fn);	}
	find(fn)		{	return this.values.map(f => f.value).find(fn);	}
	filter(fn)		{	return this.values.filter(fn);					}
	delete(v)		{	return this._data.delete(v)						}

	get	first()		{
		return this.values.sort((b, a) => a.added - b.added)[0];
	}

	get	last()		{
		return this.values.sort((a, b) => a.added - b.added)[0];
	}

	get(key) {
		return this._data.get(key)?.value || void 0;
	}

	set(key, value) {
		this._count = this._count + 1;
		this._data.set(key, {
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
};