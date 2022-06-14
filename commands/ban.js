const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
        name: "ban",
        description: "Bans the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        execute: async (client, messageCreate, args) => {
        try {
            if (!messageCreate.channel.permissionsFor(messageCreate.member).has(["BAN_MEMBERS"])) return messageCreate.channel.send("**☾ ⋆⁺₊ You don't have permission to ban users**");
            if (!messageCreate.channel.permissionsFor(client.user).has("BAN_MEMBERS")) return messageCreate.channel.send("**☾ ⋆⁺₊ I do not have permission to ban -- please update my permissions!**");

            if (!args[0]) return messageCreate.channel.send("**☾ ⋆⁺₊ Missing argument: User**")

            let banMember = await messageCreate.mentions.members.first() || await messageCreate.guild.members.cache.get(args[0]) || await messageCreate.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || await messageCreate.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || await client.users.fetch(args[0]);
            if (banMember === messageCreate.member) return messageCreate.channel.send("**☾ ⋆⁺₊  Silly goose, you can't ban yourself!**")

            var reason = args.slice(1).join(" ");

            try {
                if (reason) {
                    messageCreate.guild.members.ban(banMember)
                    await banMember.send(`**☾ ⋆⁺₊ Hello, you have been banned from ${messageCreate.guild.name}. To appeal this ban, please join our Ban Appeals server: https://discord.gg/cVEabbnPfg. Please note that you will have the best chance at appealing if you take a few days to reflect before appealing.`).catch(() => null)
                } else {
                    return messageCreate.channel.send("**☾ ⋆⁺₊ You must set a ban reason**.")
                }
            } catch (e) {
                return messageCreate.channel.send(`**${e.message}**`)
            }
            var sembed = new Discord.MessageEmbed()
                .setColor("#ff53b1")
                .setDescription(`**☾ ⋆⁺₊ ${banMember} has been banned for "${reason}"**`)
            await messageCreate.channel.send({ embeds: [sembed]})

            let channel = await db.fetch(`modlog_${messageCreate.guild.id}`)

            if (channel == null) return;

            if (!channel) return;

            let embed = new Discord.MessageEmbed()
                .setColor("#ff53b1")
                .setTitle("**<:pinkheart:782690240002261042> ban <:pinkheart:782690240002261042>**")     
                .setFooter({ text: `${messageCreate.member.displayName}`, iconURL: `${messageCreate.author.displayAvatarURL()}`})
                .setTimestamp()
                .setDescription(`<:pinkdash:779144066326724650> **user: ** ${banMember.user.tag} ${banMember.user}
    <:pinkdash:779144066326724650> **id: ** ${banMember.id}
    <:pinkdash:779144066326724650> **reason: ** ${reason}`)
                embed.setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }));

            var sChannel = await messageCreate.guild.channels.cache.get(channel)
            if (!sChannel) return;
            return sChannel.send({embeds: [embed]})
        } catch (e) {
            return messageCreate.channel.send(`**${e.message}**`)
        }
    }
};