const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Help!',
    execute(client, messageCreate, args) {
        let memberHelpEmbed = new Discord.MessageEmbed()                
            .setColor("#ffc4dd")
            .setTitle("**<:pinkheart:782690240002261042> help! <:pinkheart:782690240002261042>**")
            .setDescription("here is a list of commands I respond to!")     
            .setFooter({ text: `${messageCreate.member.displayName}`, iconURL: `${messageCreate.author.displayAvatarURL()}`})
            .setTimestamp()
            .addFields(
                { name: "<:pinkdash:779144066326724650> ping:", value: "pong! returns the current approximate response time in ms"},
                { name: "<:pinkdash:779144066326724650> tonetags:", value: "returns a list of common tone tags"},
                { name: "<:pinkdash:779144066326724650> bernie:", value: "returns the bernie's basics"},
            )

        if(!messageCreate.channel.permissionsFor(messageCreate.member).has(['MANAGE_MESSAGES'])) return messageCreate.channel.send({embeds: [memberHelpEmbed]});

        let helpEmbed = new Discord.MessageEmbed()
            .setColor("#ffc4dd")
            .setTitle("**<:pinkheart:782690240002261042> help! <:pinkheart:782690240002261042>**")
            .setDescription("here is a list of commands I respond to, including moderation commands!")     
            .setFooter({ text: `${messageCreate.member.displayName}`, iconURL: `${messageCreate.author.displayAvatarURL()}`})
            .setTimestamp()
            .addFields(
                { name: "<:pinkdash:779144066326724650> ping:", value: "pong! returns the current approximate response time in ms"},
                { name: "<:pinkdash:779144066326724650> tonetags:", value: "returns a list of common tone tags"},
                { name: "<:pinkdash:779144066326724650> bernie:", value: "returns the bernie's basics"},
                { name: "<:pinkdash:779144066326724650> kick", value: "usage: !kick <id> <reason>. kicks a user."},
                { name: "<:pinkdash:779144066326724650> ban:", value: "usage: !ban <id> <reason>. bans a user with DM about ban appeals"},
                { name: "<:pinkdash:779144066326724650> unban:", value: "usage: !unban <id>. unbans a user"},
                { name: "<:pinkdash:779144066326724650> warn:", value: "usage: !warn <id> <reason>. logs a warning for a user. user is not DMed"},
                { name: "<:pinkdash:779144066326724650> warns:", value: "usage: !warns <id>. returns list of warns and mutes for user."},
                { name: "<:pinkdash:779144066326724650> mute:", value: "usage: !mute <id> <reason>. mutes a user with DM prompting them to open ticket"},
                { name: "<:pinkdash:779144066326724650> unmute:", value: "usage: !unmute <id>. unmutes a user with DM"},
                { name: "<:pinkdash:779144066326724650> setmodlogs:", value: "usage: !setmodlogs <channel>. sets the modlogs channel"},
                { name: "<:pinkdash:779144066326724650> setmoodtracker:", value: "usage: !setmoodtracker <channel>. sets the mood tracker channel"},
                { name: "<:pinkdash:779144066326724650> enablemoodtracker:", value: "usage: !enablemoodtracker. starts the mood tracker"},
                { name: "<:pinkdash:779144066326724650> postmoodtracker:", value: "usage: !postmoodtracker. posts the mood tracker manually in the mood tracker channel"},
            )

            return messageCreate.channel.send({embeds: [helpEmbed]});
    },
};
