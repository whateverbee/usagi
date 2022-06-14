module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(client, messageCreate, args) {
        const timeTaken = Date.now() - messageCreate.createdTimestamp;
        messageCreate.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    },
};
