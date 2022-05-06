exports.Client	= require("./structures/Client");
exports.Embed	= require("./structures/Embed");
exports.Guild	= require("./structures/Guild");
exports.Base	= require("./structures/Base");
exports.User	= require("./structures/User");
exports.Message	= require("./structures/Message");
exports.Role	= require("./structures/Role");
exports.TextChannel	= require("./structures/channels/TextChannel");
exports.DMChannel	= require("./structures/channels/DMChannel");
exports.Emoji	= require("./structures/Emoji");
exports.Member	= require("./structures/Member");
exports.Channel	= require("./structures/Channel");

exports.BaseManager	= require("./structures/Base/Manager");
exports.TextBasedChannel = require("./structures/Base/TextChannel");

exports.ChannelManager	= require("./managers/ChannelManager");
exports.EmojiManager	= require("./managers/EmojiManager");
exports.GuildManager	= require("./managers/GuildManager");
exports.MemberManager	= require("./managers/MemberManager");
exports.MessageManager	= require("./managers/MessageManager");
exports.RoleManager		= require("./managers/RoleManager");
exports.UserManager		= require("./managers/UserManager");