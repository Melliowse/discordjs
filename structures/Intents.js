class Intents extends (require("./Base/BitField")) {
	missing(bits, checkAdmin = true) {
		return checkAdmin && this.has(this.constructor.FLAGS.ADMINISTRATOR) ? [] : super.missing(bits);
	}
	any(permission, checkAdmin = true) {
		return (checkAdmin && super.has(this.constructor.FLAGS.ADMINISTRATOR)) || super.any(permission);
	}
	has(permission, checkAdmin = true) {
		return (checkAdmin && super.has(this.constructor.FLAGS.ADMINISTRATOR)) || super.has(permission);
	}
	toArray() {
		return super.toArray(false);
	}
}

Intents.FLAGS = {
	GUILDS: /* ...................... */ 1n << 0n,
	GUILD_MEMBERS: /* ............... */ 1n << 1n,
	GUILD_BANS: /* .................. */ 1n << 2n,
	GUILD_EMOJIS_AND_STICKERS: /* ... */ 1n << 3n,
	GUILD_INTEGRATIONS: /* .......... */ 1n << 4n,
	GUILD_WEBHOOKS: /* .............. */ 1n << 5n,
	GUILD_INVITES: /* ............... */ 1n << 6n,
	GUILD_VOICE_STATES: /* .......... */ 1n << 7n,
	GUILD_PRESENCES: /* ............. */ 1n << 8n,
	GUILD_MESSAGES: /* .............. */ 1n << 9n,
	GUILD_MESSAGE_REACTIONS: /* ..... */ 1n << 10n,
	GUILD_MESSAGE_TYPING: /* ........ */ 1n << 11n,
	DIRECT_MESSAGES: /* ............. */ 1n << 12n,
	DIRECT_MESSAGE_REACTIONS: /* .... */ 1n << 13n,
	DIRECT_MESSAGE_TYPING: /* ....... */ 1n << 14n,
	GUILD_SCHEDULED_EVENTS: /* ...... */ 1n << 16n,
};

Intents.ALL = Object.values(Intents.FLAGS).reduce((all, p) => all | p, 0n);
Intents.defaultBit = BigInt(0);

module.exports = Intents;