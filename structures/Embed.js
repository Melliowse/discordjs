module.exports = class Embed {
	constructor(data) {
		this.title			= data?.title		|| null;
		this.description	= data?.description	|| null;
		this.url			= data?.url			|| null;
		this.timestamp		= data?.timestamp	|| null;
		this.color			= data?.color		|| null;
		this.image			= data?.image		|| null;
		this.thumbnail		= data?.thumbnail	|| null;
		this.video			= data?.video		|| null;
		this.provider		= data?.provider	|| null;
		this.author			= data?.author		|| null;
		this.fields			= [...(data?.fields || [])];
		this.type			= data?.type		|| null;

		Object.defineProperty(this, "video", {
			value: data?.video || null,
			writable: false,
		});
	}

	setTitle(title) {
		this.title = title;
		return this;
	}

	setDescription(description) {
		this.description = description;
		return this;
	}

	setColor(color) {
		if (/(#)?[A-F0-9]{3}([A-F0-9]{3})?/i.test(color)) {
			color = color.replace(/#/g, "");
			color = parseInt(`${color}${color.length === 3 ? color : ""}`.replace(/#/g, ""), 16);
		}
		this.color = color;
		return this;
	}

	setTimestamp(timestamp = Date.now()) {
		this.timestamp = new Date(timestamp).getTime();
		return this;
	}

	setURL(url) {
		this.url = url;
		return this;
	}

	setAuthor(text, icon, url) {
		if (icon === void 0 && url === void 0 && Object.is(text)) {
			this.author = text;
			return this;
		}

		this.author = {	text, icon	};
		return this;
	}

	setFooter(text, icon) {
		if (icon === void 0) {
			this.footer = text;
			return this;
		}

		this.footer = {	text, icon	};
		return this;
	}

	addFields(...fields) {
		this.fields.push(
			[...(fields.flat())].map(f => ({
				name:	f?.name		|| f?.title			|| "\u200b",
				value:	f?.value	|| f?.description	|| "\u200b",
				inline:	f?.inline	|| false,
			}))
		);
		return this;
	}

	toString() {
		return `Embed[]`;
	}

	toJSON() {
		return {
			title: /* ......... */ this.tile,
			description: /* ... */ this.description,
			url: /* ........... */ this.url,
			timestamp: /* ..... */ this.timestamp,
			color: /* ......... */ this.color,
			image: /* ......... */ this.image,
			thumbnail: /* ..... */ this.thumbnail,
			video: /* ......... */ this.video,
			provider: /* ...... */ this.provider,
			author: /* ........ */ this.author,
			fields: /* ........ */ this.fields,
			type: /* .......... */ this.type || "rich",
		};
	}
}