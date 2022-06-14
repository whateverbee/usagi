const db = require('quick.db')
const Discord = require('discord.js')
module.exports = {
        name: "postmoodtracker",
        description: "posts the mood tracker",
        usage: "[channel mention | channel ID | channel name]",
        execute: async (client, messageCreate, args) => {
			try {
				if (await db.fetch(`moodtracker_enabled_${messageCreate.guild.id}`) === false ) return 
				if (!messageCreate.channel.permissionsFor(messageCreate.member).has("ADMINISTRATOR")) return messageCreate.channel.send("**☾ ⋆⁺₊ You don't have permission to use this command!**")
                if (!messageCreate.channel.permissionsFor(client.user).has("ADMINISTRATOR")) return messageCreate.channel.send("**☾ ⋆⁺₊ I don't have permission to use this command!**")
				const moodTrackerEmbed = new Discord.MessageEmbed()
						.setTitle("daily mood tracker")
						.setDescription(`mood trackers can help you identify and regulate your moods by helping you see patterns in how your mood changes over time! 

how are you feeling?

❤️ fear → horror, nervous, insecure, terror, scared
💛 love → peaceful, tenderness, desire, longing, affectionate
💚 joy → content, happy, cheerful, proud, optimistic, enthusiastic, elated, enthralled
💙 surprise → stunned, confused, amazed, overcome, moved
💜 sadness → suffering, sadness, disappointment, shame, neglected, despair
🖤 anger → disgust, envy, irritable, exasperated, rage
🤍 neutral → indifferent, undecided, disinterested, calm, content

record your response by clicking the corresponding reaction below!

remember that it is okay and normal to have good days, bad days, and days that are in-between! you never have to justify how you're feeling, whether it's bad or good!`)

				let mchannel = await db.fetch(`moodtracker_${messageCreate.guild.id}`);
				if (!mchannel) return messageCreate.channel.send(`No channel set for mood tracker, please run setmoodtracker command first`);

					const moodchannel = messageCreate.guild.channels.cache.get(mchannel);
					
					const message = await moodchannel.send({embeds: [moodTrackerEmbed]});
					message.react('❤️')
						.then(() => message.react('💛'))
						.then(() => message.react('💚'))
						.then(() => message.react('💙'))
						.then(() => message.react('💜'))
						.then(() => message.react('🖤'))
						.then(() => message.react('🤍'))
						.catch(error => console.error('One of the emoji failed to react: ', error))			
				await db.set(`moodtracker_enabled_${messageCreate.guild.id}`, false);
				
			} catch (e) {
				return messageCreate.channel.send(`error: ${e}`)
			}
		}
}