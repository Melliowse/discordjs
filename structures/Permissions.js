class Permissions extends (require("./Base/BitField")) {
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

Permissions.FLAGS = {
	CREATE_INSTANT_INVITE: 1n << 0n,
	KICK_MEMBERS: 1n << 1n,
	BAN_MEMBERS: 1n << 2n,
	ADMINISTRATOR: 1n << 3n,
	MANAGE_CHANNELS: 1n << 4n,
	MANAGE_GUILD: 1n << 5n,
	ADD_REACTIONS: 1n << 6n,
	VIEW_AUDIT_LOG: 1n << 7n,
	PRIORITY_SPEAKER: 1n << 8n,
	STREAM: 1n << 9n,
	VIEW_CHANNEL: 1n << 10n,
	SEND_MESSAGES: 1n << 11n,
	SEND_TTS_MESSAGES: 1n << 12n,
	MANAGE_MESSAGES: 1n << 13n,
	EMBED_LINKS: 1n << 14n,
	ATTACH_FILES: 1n << 15n,
	READ_MESSAGE_HISTORY: 1n << 16n,
	MENTION_EVERYONE: 1n << 17n,
	USE_EXTERNAL_EMOJIS: 1n << 18n,
	VIEW_GUILD_INSIGHTS: 1n << 19n,
	CONNECT: 1n << 20n,
	SPEAK: 1n << 21n,
	MUTE_MEMBERS: 1n << 22n,
	DEAFEN_MEMBERS: 1n << 23n,
	MOVE_MEMBERS: 1n << 24n,
	USE_VAD: 1n << 25n,
	CHANGE_NICKNAME: 1n << 26n,
	MANAGE_NICKNAMES: 1n << 27n,
	MANAGE_ROLES: 1n << 28n,
	MANAGE_WEBHOOKS: 1n << 29n,
	MANAGE_EMOJIS_AND_STICKERS: 1n << 30n,
	USE_APPLICATION_COMMANDS: 1n << 31n,
	REQUEST_TO_SPEAK: 1n << 32n,
	MANAGE_EVENTS: 1n << 33n,
	MANAGE_THREADS: 1n << 34n,
	CREATE_PUBLIC_THREADS: 1n << 35n,
	USE_PRIVATE_THREADS: 1n << 36n,
	CREATE_PRIVATE_THREADS: 1n << 36n,
	USE_EXTERNAL_STICKERS: 1n << 37n,
	SEND_MESSAGES_IN_THREADS: 1n << 38n,
	START_EMBEDDED_ACTIVITIES: 1n << 39n,
	MODERATE_MEMBERS: 1n << 40n,
};

Permissions.ALL = Object.values(Permissions.FLAGS).reduce((all, p) => all | p, 0n);
Permissions.DEFAULT = BigInt(104324673);
Permissions.STAGE_MODERATOR = Permissions.FLAGS.MANAGE_CHANNELS | Permissions.FLAGS.MUTE_MEMBERS | Permissions.FLAGS.MOVE_MEMBERS;

Permissions.defaultBit = BigInt(0);

module.exports = Permissions;