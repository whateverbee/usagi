const { MessageEmbed } = require("discord.js");
const db = require("quick.db")

module.exports = {
        name: "setmoodtracker",
        description: "sets the channel where usagi can send the mood tracker",
        usage: "[channel mention | channel ID | channel name]",
        execute: async (client, messageCreate, args) => {
            try {
                if (!messageCreate.channel.permissionsFor(messageCreate.member).has("ADMINISTRATOR")) return messageCreate.channel.send("**☾ ⋆⁺₊ You don't have permission to use this command!**")
                if (!messageCreate.channel.permissionsFor(client.user).has("ADMINISTRATOR")) return messageCreate.channel.send("**☾ ⋆⁺₊ I don't have permission to use this command!**")
                if (!args[0]) {
                let b = await db.fetch(`moodtracker_${messageCreate.guild.id}`);

                let channelName = messageCreate.guild.channels.cache.get(b);
                if (messageCreate.guild.channels.cache.has(b)) {
                    return messageCreate.channel.send(
                    `**☾ ⋆⁺₊ The current mood tracker channel is \`${channelName.name}\`!**`
                    );
                } else
                    return messageCreate.channel.send(
                    "**☾ ⋆⁺₊ You must provide a valid channel to set the mood tracker channel.**"
                    );
                }
                    const moodChannel = await messageCreate.mentions.channels.first() || await messageCreate.guild.channels.cache.get(args[0])
                    console.log(moodChannel)

                    if (!moodChannel || moodChannel.type !== 'GUILD_TEXT') return messageCreate.channel.send("**☾ ⋆⁺₊ Error: invalid channel. **");

                    try {
                        let a = await db.fetch(`moodtracker_${messageCreate.guild.id}`)

                        if (moodChannel.id === a) {
                            return messageCreate.channel.send("**☾ ⋆⁺₊ Oops! This channel is already the mood tracker channel!**")
                        } else {
                            await db.set(`moodtracker_${messageCreate.guild.id}`, moodChannel.id)

                            messageCreate.channel.send(`**☾ ⋆⁺₊ Mood tracker channel has been successfully set.**`)
                        }
                    } catch (e) {
                        return messageCreate.channel.send(`**☾ ⋆⁺₊ Error handling this request.**: ${e}`);
                    }
            } catch (e) {
                return console.error(`error: ${e}`);
            }

        }
    };