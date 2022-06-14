const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
        name: "kick",
        description: "Kicks the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        execute: async (client, messageCreate, args) => {
        try {
            if (!messageCreate.channel.permissionsFor(messageCreate.member).has(["KICK_MEMBERS"])) return messageCreate.channel.send("**☾ ⋆⁺₊ You don't have permission to kick users**");
            if (!messageCreate.channel.permissionsFor(client.user).has("KICK_MEMBERS")) return messageCreate.channel.send("**☾ ⋆⁺₊ I do not have permission to kick -- please update my permissions!**");

            if (!args[0]) return messageCreate.channel.send("**☾ ⋆⁺₊ Missing argument: User**")

            let kickMember = await messageCreate.mentions.members.first() || await messageCreate.guild.members.cache.get(args[0]) || await messageCreate.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || await messageCreate.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || await client.users.fetch(args[0]);
            if (kickMember === messageCreate.member) return messageCreate.channel.send("**☾ ⋆⁺₊  Silly goose, you can't kick yourself!**")

            var reason = args.slice(1).join(" ");
            
            await messageCreate.guild.members.kick(kickMember, reason)

            var sembed = new Discord.MessageEmbed()
                .setColor("#ff53b1")
                .setDescription(`**☾ ⋆⁺₊ ${kickMember} has been kicked for "${reason}"**`)
            await messageCreate.channel.send({ embeds: [sembed]})

            let channel = await db.fetch(`modlog_${messageCreate.guild.id}`)

            if (channel == null) return;

            if (!channel) return;

            let embed = new Discord.MessageEmbed()
                .setColor("#ff53b1")
                .setTitle("**<:pinkheart:782690240002261042> kick <:pinkheart:782690240002261042>**")     
                .setFooter({ text: `${messageCreate.member.displayName}`, iconURL: `${messageCreate.author.displayAvatarURL()}`})
                .setTimestamp()
                .setDescription(`<:pinkdash:779144066326724650> **user: ** ${kickMember.user}
    <:pinkdash:779144066326724650> **id: ** ${kickMember.id}
    <:pinkdash:779144066326724650> **reason: ** ${reason}`)
                embed.setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }));

            var sChannel = await messageCreate.guild.channels.cache.get(channel)
            console.log(sChannel)
            if (!sChannel) return;
            return sChannel.send({embeds: [embed]})
        } catch (e) {
            return messageCreate.channel.send(`**${e.message}**`)
        }
    }
};