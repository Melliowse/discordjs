exports.ClientOptions = {
	ws: {},
	api: {
		version: 9,
		encoding: "json",
		url: "https://discord.com/api",
		cdn: "https://cdn.discordapp.com",
	},
	intents: 98047,
	shardCount: 1,
	cache: {
		messages: {
			size: 200,
			life: 60_000,
		},
		emojis: {
			size: 500,
			life: 60_000,
		},
		channels: {
			size: 500,
			life: -1,
		},
		roles: {
			size: 500,
			life: -1,
		},
	},
};

exports.ChannelTypes = [
	"text",
	"dm",
	"voice",
	"groupDM",
	"category",
	"news",
	null,
	null,
	null,
	null,
	null,
	"newsThread",
	"publicThread",
	"privateThread",
	"stage",
	"directory",
	"forum"
];

exports.MessageTypes = [
	"default",
	"recipientAdd",
	"recipientRemove",
	"call",
	"groupNameChange",
	"groupIconChange",
	"groupMessagePinned",
	"guildMemberJoin",
	"guildBoost",
	"guildBoostTier1",
	"guildBoostTier2",
	"guildBoostTier3",
	"channelFollow",
	"guildDiscoveryDisqualified",
	"guildDiscoveryRequalified",
	"guildDiscoveryGracePeriodIntialWarning",
	"guildDiscoveryGracePeriodFinalWarning",
	"threadCreate",
	"reply",
	"chatInputCommand",
	"threadStarterMessage",
	"inviteReminder",
	"contextMenuCommand",
];

exports.MessageActivityTypes = [
	null,
	"join",
	"spectate",
	"listen",
	null,
	"joinRequest"
]