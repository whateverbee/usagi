module.exports = {
    name: 'test',
    description: 'test id handling',
    execute: async (client, messageCreate, args) => {
        if (args[0]) {
            const member = await messageCreate.mentions.members.first() || await messageCreate.guild.members.cache.get(args[0]) || await messageCreate.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || await messageCreate.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || await client.users.fetch(args[0]);
            return messageCreate.channel.send(`User: ${member}`)
        }
    },
};
