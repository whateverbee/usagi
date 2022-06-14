const cron = require('cron');
const db = require('quick.db')
const Discord = require('discord.js')
module.exports = {
        name: "enablemoodtracker",
        description: "starts the mood tracker",
        usage: "[channel mention | channel ID | channel name]",
        execute: async (client, messageCreate, args) => {
			try {
				if (!messageCreate.channel.permissionsFor(messageCreate.member).has("ADMINISTRATOR")) return messageCreate.channel.send("**☾ ⋆⁺₊ You don't have permission to use this command!**")
                if (!messageCreate.channel.permissionsFor(client.user).has("ADMINISTRATOR")) return messageCreate.channel.send("**☾ ⋆⁺₊ I don't have permission to use this command!**")
				
				db.set(`moodtracker_enabled_${messageCreate.guild.id}`, true)

				return messageCreate.channel.send("**☾ ⋆⁺₊ Mood tracker toggled on.**")
			} catch (e) {
				return messageCreate.channel.send(`error: ${e}`)
			}
		}
}