const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
        name: "warn",
        description: "warn members",
        usage: "m/warn <mention member/member id> [reason]",
        execute: async (client, messageCreate, args) => {
            try {
                let warnPermErr = new MessageEmbed()
                .setTitle("**☾ ⋆⁺₊ User Permission Error**")
                .setDescription("**☾ ⋆⁺₊ You do not have permission to use this command.**")
            
                if (!messageCreate.channel.permissionsFor(messageCreate.member).has(['MANAGE_MESSAGES'])) return messageCreate.channel.send({embeds: [warnPermErr]});
                if (!messageCreate.guild) return messageCreate.reply("no server set")
                const member = await messageCreate.mentions.members.first() || await messageCreate.guild.members.cache.get(args[0]) || await messageCreate.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || await messageCreate.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || await client.users.fetch(args[0]);
                if (!member || !member.id) return messageCreate.reply("☾ ⋆⁺₊ Please mention a valid member of this server");
            
                let reason = args.slice(1).join(' ');
                if (!reason) return messageCreate.reply("☾ ⋆⁺₊ You must include a reason.");
                
                let date = new Date(Date.now())
                await db.push(`warn_userid_${messageCreate.guild.id}_${member.id}.warns`, ` ${reason} - ${date.toDateString()}`)

                let warnEmbed = new MessageEmbed()
                .setTitle(`**<:pinkheart:782690240002261042> warn <:pinkheart:782690240002261042>**`)
                .setColor("#ffc4dd")
                .setDescription(`**<:pinkdash:779144066326724650> user: ** ${member}
    **<:pinkdash:779144066326724650> id: ** ${member.id || "undefined"}
    **<:pinkdash:779144066326724650> reason: ** ${reason}`)
                .setFooter({ text: `${messageCreate.member.displayName}`, iconURL: `${messageCreate.author.displayAvatarURL()}`})
                .setTimestamp();

                console.log(warnEmbed);

                let modlogs = await db.fetch(`modlog_${messageCreate.guild.id}`)
                console.log(modlogs)
                var sChannel = messageCreate.guild.channels.cache.get(modlogs)
                if (!sChannel) return;
                sChannel.send({ embeds: [warnEmbed] })

                const sembed = new MessageEmbed()
                .setColor("#ffc4dd")
                .setAuthor({name: `${messageCreate.guild.name}`, iconURL: `${messageCreate.guild.iconURL()}`})
                .setDescription(`**☾ ⋆⁺₊ Successfully warned ${member} for "${reason}"**`)

                console.log(sembed);
                return messageCreate.channel.send({embeds: [sembed]});
            } catch (e) {
                return messageCreate.channel.send(`**${e.message}**`)
            }
        }
    }