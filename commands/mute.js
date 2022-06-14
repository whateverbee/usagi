const { MessageEmbed } = require("discord.js");
const db = require('quick.db');


module.exports = {
        name: "mute",
        description: "Mutes a member",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        execute: async (client, messageCreate, args) => {
        try {
            if (!messageCreate.channel.permissionsFor(messageCreate.member).has("MANAGE_MESSAGES")) return messageCreate.channel.send("**☾ ⋆⁺₊ You do not have permissions to mute someone.**");

            if (!messageCreate.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return messageCreate.channel.send("**☾ ⋆⁺₊ I do not have permission to mute someone - please update my permissions.**")
            if (!args[0]) return messageCreate.channel.send("**Cannot mute without argument [user]**");

            const mutee = await messageCreate.mentions.members.first() || await messageCreate.guild.members.fetch(args[0]) || await messageCreate.guild.members.fetch(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || await messageCreate.guild.members.fetch(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || await client.users.fetch(args[0])
            if (!mutee) return messageCreate.channel.send("**User does not exist**");

            if (mutee === messageCreate.member) return messageCreate.channel.send("**☾ ⋆⁺₊ Silly goose! You can't mute yourself. **")
            if (mutee.roles && mutee.roles.highest.comparePositionTo(messageCreate.member.roles.highest) >= 0) return messageCreate.channel.send(`**☾ ⋆⁺₊ Cannot mute user with greater permissions than you. comparison value = ${mutee.roles.highest.comparePositionTo(messageCreate.client.user.roles.highest)}**`)

            let reason = args.slice(1).join(" ");
            if (mutee.user && mutee.user.bot) return messageCreate.channel.send("**☾ ⋆⁺₊ Beep boop bots are friends, I don't mute friends.**");
            const userRoles = mutee.roles.cache
                .filter(r => r.id !== messageCreate.guild.id)
                .map(r => r.id)

            let muterole;
            let dbmute = await db.fetch(`muterole_${messageCreate.guild.id}`);
            let muteerole = messageCreate.guild.roles.cache.find(r => r.name === "muted")

            if (!messageCreate.guild.roles.cache.has(dbmute)) {
                muterole = muteerole
            } else {
                muterole = messageCreate.guild.roles.cache.get(dbmute)
            }

            if (mutee.roles.cache.has(muterole.id)) return messageCreate.channel.send("**☾ ⋆⁺₊ Oops, they're already muted!**")

            await db.set(`muteeid_${messageCreate.guild.id}_${mutee.id}`, userRoles)
            let date = new Date(Date.now())
            await db.push(`muterecord_${messageCreate.guild.id}_${mutee.id}.mutes`, `${reason} - ${date.toDateString()}`)
          try {
            mutee.roles.set([muterole.id]).then(() => {
                mutee.send(`**☾ ⋆⁺₊ Hello, you have been muted in ${messageCreate.guild.name}. Please open a ticket in #muted to discuss your mute.**`).catch(() => null)
            })
            } catch (e) {
                messageCreate.channel.send(`error: ${e}`)
            }
                if (reason) {
                const sembed = new MessageEmbed()
                    .setColor("#ff80c3")
                    .setAuthor({name: `${messageCreate.guild.name}`, iconURL: `${messageCreate.guild.iconURL()}`})
                    .setDescription(`**☾ ⋆⁺₊ ${mutee.user} was successfully muted for "${reason}"**`)
                messageCreate.channel.send({embeds: [sembed]});
                } else {
                    const sembed2 = new MessageEmbed()
                    .setColor("#ff80c3")
                    .setDescription(`**☾ ⋆⁺₊ ${mutee.user} was successfully muted**`)
                messageCreate.channel.send({embeds: [sembed2]});
                }
            
            let channel = await db.fetch(`modlog_${messageCreate.guild.id}`)
            if (!channel) return;

            let embed = new MessageEmbed()
                .setColor('#ff80c3')
                .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`**<:pinkheart:782690240002261042> mute <:pinkheart:782690240002261042>**`)
                .setDescription(`**<:pinkdash:779144066326724650> user: ** ${mutee.user.tag} ${mutee.user}
    **<:pinkdash:779144066326724650> id: ** ${mutee.id}
    **<:pinkdash:779144066326724650> reason: ** ${reason || "**no reason given**"}`)
                .setFooter({ text: `${messageCreate.member.displayName}`, iconURL: `${messageCreate.author.displayAvatarURL()}` })
                .setTimestamp()

            var sChannel = messageCreate.guild.channels.cache.get(channel)
            if (!sChannel) return;
            return sChannel.send({embeds: [embed]})
        } catch (e) {
            return messageCreate.channel.send(`error: ${e}`);
        }
    }
}