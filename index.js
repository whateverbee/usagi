const fs = require('fs');
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require('./config.json');
const prefix = "!";
const db = require('quick.db');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');

	client.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
        game: {
            name: "!help",  // The message shown
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
	client.user.setActivity("!help", {
		type: "PLAYING",
	});
 });

client.on('message', async messageCreate => {
	if (messageCreate.author.bot) return;

	if (!messageCreate.content.startsWith(prefix)) return;
	
	const commandbody = messageCreate.content.slice(prefix.length);
    const args = commandbody.split(' ');
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		await client.commands.get(command).execute(client, messageCreate, args);
	} catch (error) {
		console.error(error);
		messageCreate.channel.send('☾ ⋆⁺₊ There was an error trying to execute that command!');
	}
});

client.on('guildBanAdd', async ban => {
	console.log(`Ban: ${ban.user.tag}`);
	let modlogs = await db.fetch(`modlog_${ban.guild.id}`);

	const fetchedLogs = await ban.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD'
	});

	const banLog = fetchedLogs.entries.first();

	if (!banLog) return modlogs.send(`${ban.user.tag} was banned, but no audit log could be found`);

	const { executor, target } = banLog; 

	let embed = new MessageEmbed()
		.setColor("#")
		.setTitle("Manual ban")
		.setDescription(`${ban.user.tag} was banned from ${ban.guild.name} by ${executor.tag}`)

	let sChannel = await ban.guild.channels.cache.get(modlogs)
    if (!sChannel) { 
		console.log("no channel set")
	} else {
    	return sChannel.send({embeds: [embed]})
	}	
});

client.login(token);
