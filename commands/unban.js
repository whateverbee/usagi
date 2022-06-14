const Discord = require("discord.js")
const db = require('quick.db');

module.exports = {
        name: "unban",
        description: "Unban a user from the server",
        usage: "[name | tag | mention | ID] <reason> (optional)",
        execute: async (client, messageCreate, args) => {
            try {
                if (!messageCreate.channel.permissionsFor(messageCreate.member).has(["BAN_MEMBERS"])) return messageCreate.channel.send("**☾ ⋆⁺₊ You don't have permission to unban users.**")
                if (!messageCreate.channel.permissionsFor(client.user).has("BAN_MEMBERS")) return messageCreate.channel.send("**☾ ⋆⁺₊ I do not have permission to unban -- please update my permissions!**");
                if (!args[0]) return messageCreate.channel.send("**☾ ⋆⁺₊ Argument missing: user.**")
            
                let bannedMemberInfo = await messageCreate.guild.fetchBans()

                let bannedMember = await bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || await bannedMemberInfo.get(args[0]) || await bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()) || await client.users.fetch(args[0])
                if (!bannedMember) return messageCreate.channel.send("**☾ ⋆⁺₊ Either the username you provided is invalid, or the user is not banned from this server.**")
                
                let reason = args.slice(1).join(" ")

                try {
                    if (reason) {
                        messageCreate.guild.members.unban(bannedMember.user.id, reason)
                        var sembed = new Discord.MessageEmbed()
                            .setColor("#ffc4dd")
                            .setDescription(`**☾ ⋆⁺₊ ${bannedMember.user.tag} has been unbanned for "${reason}"**`)
                        messageCreate.channel.send({embeds: [sembed]})
                    } else {
                        messageCreate.guild.members.unban(bannedMember.user.id, reason)
                        var sembed2 = new Discord.MessageEmbed()
                            .setColor("#ffc4dd")
                            .setDescription(`**☾ ⋆⁺₊ ${bannedMember.user.tag} has been unbanned**`)
                        messageCreate.channel.send({embeds: [sembed2]})
                    }
                } catch (e) {
                    return messageCreate.channel.send(`**${e.message}**`)
                }

            let channel = await db.fetch(`modlog_${messageCreate.guild.id}`)
            if (!channel) return;

            let embed = new Discord.MessageEmbed()
                .setColor("#ffc4dd")
                .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
                .setTitle("**<:pinkheart:782690240002261042> unban <:pinkheart:782690240002261042>**")     
                .setFooter({ text: `${messageCreate.member.displayName}`, iconURL: `${messageCreate.author.displayAvatarURL()}`})
                .setDescription(`<:pinkdash:779144066326724650> **user: ** ${bannedMember.user.tag} ${bannedMember.user}
    <:pinkdash:779144066326724650> **id: ** ${bannedMember.user.id}
    <:pinkdash:779144066326724650> **reason: ** ${reason || "no reason set"}`)
                .setTimestamp();

            var sChannel = await messageCreate.guild.channels.cache.get(channel)
            if (!sChannel) return;
            return sChannel.send({embeds: [embed]})

        } catch {
            return messageCreate.channel.send(`**error**`)
        }
    }
}