// export interface ContainerConstructor {
// 	new ():
// 		Container<unknown, unknown>;
// 	new <K, V>(entries: ReadonlyArray<readonly [K, V]> | null):
// 		Container<K, V>;
// 	new <K, V>(iterable: Iterable<readonly [K, V]>):
// 		Container<K, V>;
// };

// export interface Container<K, V>  {
// 	constructor: ContainerConstructor;
// }

export class Container<K, V> {
	private data: Map<K, V>;

	constructor(entries?: [K, V][]) {
		this.data = new Map(entries);
	}

	get values(): V[] {
		return [...this.data.values()];
	};

	get keys(): K[] {
		return [...this.data.keys()];
	};

	get size(): number {
		return this.data.size;
	}

	public get(key: K): V {
		return this.data.get(key);
	}

	public set(key: K, value: V): Container<K, V> {
		this.data.set(key, value);
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

	public sort(compareFn?: (a: V, b: V) => number): V[] {
		return this.values.sort(compareFn);
	}
}

// export class Container<K, V> extends Map<K, V> {
// 	getValues: () => V[];
	
// 	public constructor(data: Iterable<readonly [K, V]>) {
// 		super(data);
		
// 		this.getValues = this.values.bind(this);

// 		Object.defineProperty(this, "values", {
// 			get() {
// 				return this.values();
// 			},
// 			writable: false
// 		});
// 	}

// 	get first(): V {
// 		return this.entries()[0][1];
// 	}

// 	get last(): V {
// 		return this.entries()[this.size - 1][1];
// 	}

// 	public filter(fn: () => boolean): V[] {
// 		return this.values.filter(fn);
// 	}

// 	// public findBy(propertyName: K, value: V): object {
// 	// 	return this.data.find(p => p[propertyName] === value);
// 	// }

// 	// public get(value: V): object {
// 	// 	return this.data.find(p => p[this.options.getProperty] === value);
// 	// }

// 	// public set(key: K, value: V): Container<K, V> {
// 	// 	this.data = this.data.splice(
// 	// 		this.data.indexOf(this.data.find(p => p[this.options.getProperty] === key)),
// 	// 		1,
// 	// 		value
// 	// 	);
// 	// 	return this;
// 	// }

// 	// get keys(): K[] {
// 	// 	return this.data.map(v => v[this.options.keyProperty])
// 	// }

// 	// get size(): number {
// 	// 	return this.data.length;
// 	// }

// 	// get first(): V {
// 	// 	return this.data?.[0];
// 	// }

// 	// get last(): V {
// 	// 	return this.data[this.data.length - 1];
// 	// }
// };