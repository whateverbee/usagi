const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'tonetags',
    description: 'Returns a list of tone tags',
    execute: async (client, messageCreate, args) => {
        const embed = new MessageEmbed()
        .setTitle("tone tags")
        .setColor("#ffc4dd")
        .setDescription(`**tone can be really hard to read over the internet, especially for autistic + neurodivergent people. tone tags exist to clarify your message if your tone is not clear!**
                
/j = joking
/hj = half joking
/s or /sarc = sarcastic / sarcasm
/srs = serious
/lh = light hearted
/ij = inside joke
/t = teasing
/nm = not mad
/nbh = nobody here
/nay = not at you
/nsb = not subtweeting
/g or /gen = genuine / genuine question
/th = threat
/cb = clickbait
/f = fake
/q = quote
/l or /ly = lyrics
/c = copypasta
/m = metaphor / metaphorically
/li = literal / literally
/rt or /rh = rhetorical question
/hyp = hyperbole
/p = platonic
/r = romantic
/pc or /pos = positive connotation
/nc or /neg = negative connotation
/neu = neutral / neutral connotation
    
more info - https://tonetags.carrd.co/#masterlist`)
        await messageCreate.reply({embeds: [embed]});
    },
};
