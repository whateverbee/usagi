const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
        name: "warns",
        description: "Returns warnings for given user",
        execute: async (client, messageCreate, args) => {
            try {
                let warnPermErr = new MessageEmbed()
                .setTitle("**☾ ⋆⁺₊ User Permission Error**")
                .setDescription("**☾ ⋆⁺₊ You do not have permission to use this command.**")
                    if(!messageCreate.channel.permissionsFor(messageCreate.member).has(['MANAGE_MESSAGES'])) return messageCreate.channel.send({ embeds: [warnPermErr]});
            
                    const member = await messageCreate.mentions.members.first() || await messageCreate.guild.members.cache.get(args[0]) || await messageCreate.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || await messageCreate.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || await client.users.fetch(args[0]);
                    console.log(member);
                    if(!member) return messageCreate.reply("☾ ⋆⁺₊ Please mention a valid member of this server");
                
                    let warns = await db.fetch(`warn_userid_${messageCreate.guild.id}_${member.id}.warns`)
                    let mutes = await db.fetch(`muterecord_${messageCreate.guild.id}_${member.id}.mutes`)

                    if (!warns && !mutes) return messageCreate.reply(`☾ ⋆⁺₊ User ${member} has no warnings.`);
                    let warnEmbed = new MessageEmbed()      
                        .setTitle(`**<:pinkheart:782690240002261042> warns <:pinkheart:782690240002261042>**`)
                        .setColor("#ffc4dd")
                        .setDescription(`**<:pinkdash:779144066326724650> user: ** ${member.username} ${member}
            **<:pinkdash:779144066326724650> id: ** ${member.id}
            **<:pinkdash:779144066326724650> warn(s): ** ${warns}
            **<:pinkdash:779144066326724650> mute(s): ** ${mutes}`)
                        .setFooter({ text: `${messageCreate.member.displayName}`, iconURL: `${messageCreate.author.displayAvatarURL()}` })
                        .setTimestamp();

                    let channel = await db.fetch(`modlog_${messageCreate.guild.id}`)
                    console.log(channel)
                    var sChannel = await messageCreate.guild.channels.cache.get(channel)
                    if (!sChannel) return;
                    return sChannel.send({embeds: [warnEmbed]})
            } catch (e) {
                return messageCreate.channel.send(`**${e.message}**`)
            }
        }
    }