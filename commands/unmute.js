const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
        name: "unmute",
        description: "Unmutes a member in the discord!",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        execute: async (client, messageCreate, args) => {
        try {
            if (!messageCreate.channel.permissionsFor(messageCreate.member).has("MANAGE_MESSAGES")) return messageCreate.channel.send("**☾ ⋆⁺₊ You do not have permissions to unmute someone.**");
            if (!messageCreate.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return messageCreate.channel.send("**☾ ⋆⁺₊ I do not have permission to unmute someone - please update my permissions.**");

            if (!args[0]) return messageCreate.channel.send("**☾ ⋆⁺₊ Cannot unmute without argument [user]**");
            let mutee = await messageCreate.mentions.members.first() || await messageCreate.guild.members.cache.get(args[0]) || await messageCreate.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || await messageCreate.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!mutee || !mutee.user) return messageCreate.channel.send("**☾ ⋆⁺₊ User does not exist**");

            if (mutee === messageCreate.member) return messageCreate.channel.send("**☾ ⋆⁺₊ Silly goose! You can't unmute yourself. **")
            if (mutee.roles.highest.comparePositionTo(messageCreate.member.roles.highest) >= 0) return messageCreate.channel.send('**☾ ⋆⁺₊ Cannot unmute user with greater permissions than myself.**')

            let muterole;
            let dbmute = await db.fetch(`muterole_${messageCreate.guild.id}`);
            let muteerole = await messageCreate.guild.roles.cache.find(r => r.name === "muted")

            if (!messageCreate.guild.roles.cache.has(dbmute)) {
                muterole = muteerole
            } else {
                muterole = messageCreate.guild.roles.cache.get(dbmute)
            }
        
            let rolefetched = await db.fetch(`muteeid_${messageCreate.guild.id}_${mutee.id}`)
            if (!rolefetched) return messageCreate.channel.send("**☾ ⋆⁺₊ The database has no roles stored for this user. Manually unmute user.**");

            if (!muterole) return messageCreate.channel.send("**☾ ⋆⁺₊ There is no mute role to remove.**")
            if (await !mutee.roles.cache.has(muterole.id)) return messageCreate.channel.send("**☾ ⋆⁺₊ User is not muted.**")
            try {
            await mutee.roles.remove(muterole.id).then(() => {
                mutee.send(`**☾ ⋆⁺₊ You have been unmuted in ${messageCreate.guild.name}**`).catch(() => null)
                let roleadds = rolefetched
                if (!roleadds) return;
                mutee.roles.set(roleadds)
            }).catch(error => messageCreate.channel.send(`error: ${error}`))
            } catch {
                await mutee.roles.remove(muterole.id)
                let roleadds2 = rolefetched
                if (!roleadds2) return;
                mutee.roles.set(roleadds2)                            
            }
                const sembed = new MessageEmbed()
                    .setColor("#ff80c3")
                    .setAuthor({ name: `${messageCreate.guild.name}`, iconURL: `${messageCreate.guild.iconURL()}`})
                    .setDescription(`**☾ ⋆⁺₊ ${mutee.user} was successfully unmuted.**`)
                messageCreate.channel.send({embeds: [sembed]});
            

            let channel = await db.fetch(`modlog_${messageCreate.guild.id}`)
            if (!channel) return;

            let embed = new MessageEmbed()
                .setColor('#ff80c3')
                .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`**<:pinkheart:782690240002261042> unmute <:pinkheart:782690240002261042>**`)
                .setDescription(`**<:pinkdash:779144066326724650> user: ** ${mutee.user.tag} ${mutee.user}
    **<:pinkdash:779144066326724650> id: ** ${mutee.user.id}`)
                .setFooter({ text: `${messageCreate.member.displayName}`, iconURL: `${messageCreate.author.displayAvatarURL()}`})
                .setTimestamp()

            var sChannel = await messageCreate.guild.channels.cache.get(channel)
            if (!sChannel) return;
            return sChannel.send({embeds: [embed]})
        } catch (e) {
            return messageCreate.channel.send(`error: ${e}`);
        }
    }
}