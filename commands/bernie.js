const Discord = require('discord.js');

module.exports = {
    name: 'bernie',
    description: "Bernie's Basics",
    execute(client, messageCreate, args) {

    let bernie = new Discord.MessageEmbed()
        .setColor("#ffc4dd")
        .setTitle("so you want to know more about bernie's basics, huh?")
        .setDescription(`bernie's basics are essential to master before contacting deities or entities!

to master a skill, you should know what exactly the skill is, why it's performed and how it's used, know several methods of performing each skill, and have actually tested the skill and used it successfully regularly!

**cleansing**: clearing your space and/or your body of unwanted energies! smoke cleansing, sound cleansing, visualization, etc
**grounding**: becoming aware of your physical self and connecting with your surroundings! promotes spiritual + mental stability and focus
**protections**: keeping yourself spiritually safe! can be done in a variety of ways - spellwork, talismans, sigils, etc
**banishing**: getting any entity that you don't want in your space out! the lesser banishing ritual of the pentagram (lbrp) is an example of a well-known banishing ritual.
**vetting**: making sure that the deity is who they say they are and is not a trickster spirit! pendulums are frequently used to ask questions about the deities' mythos to verify they are not a trickster spirit!

as always, make sure to do outside research as well and utilize your discernment!
`)
    .setFooter({ text: `credit to the staff team (jinx, mimi, bee) for the info in this embed!`})
    .setImage('https://media.discordapp.net/attachments/599785461526954005/875630738408611892/image0.png')

    messageCreate.channel.send({embeds: [bernie]});
    },
};
