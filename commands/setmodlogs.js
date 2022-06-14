const { MessageEmbed } = require("discord.js");
const db = require("quick.db")

module.exports = {
        name: "setmodlogs",
        description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
        usage: "[channel mention | channel ID | channel name]",
        execute: async (message, args) => {
            try {
                if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**☾ ⋆⁺₊ You don't have permission to use this command!**")
                if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send("**☾ ⋆⁺₊ I don't have permission to use this command!**")
                if (!args[0]) {
                let b = await db.fetch(`modlog_${message.guild.id}`);
                console.log(b);
                let channelName = message.guild.channels.cache.get(b);
                if (message.guild.channels.cache.has(b)) {
                    return message.channel.send(
                    `**☾ ⋆⁺₊ The current modlogs channel is \`${channelName.name}\`!**`
                    );
                } else
                    return message.channel.send(
                    "**☾ ⋆⁺₊ You must provide a valid channel to set the modlogs channel.**"
                    );
                }
                    let channel = message.mentions.channels.first()

                    if (!channel || channel.type !== 'text') return message.channel.send("**☾ ⋆⁺₊ Error: invalid channel. **");

                    try {
                        let a = await db.fetch(`modlog_${message.guild.id}`)

                        if (channel.id === a) {
                            return message.channel.send("**☾ ⋆⁺₊ Oops! This channel is already the modlogs channel!**")
                        } else {
                            db.set(`modlog_${message.guild.id}`, channel.id)

                            message.channel.send(`**☾ ⋆⁺₊ Modlogs channel has been successfully set.**`)
                        }
                    } catch {
                        return message.channel.send("**☾ ⋆⁺₊ Error handling this request.**");
                    }
                } catch (e) {
                return message.channel.send(`**${e.message}**`)
            }

        }
    };