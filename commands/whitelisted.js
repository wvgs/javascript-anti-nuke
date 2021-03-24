const { MessageEmbed } = require('discord.js')
const colors = require("../colors.json")
const { util } = require('discord.js-commando')
module.exports.run = async (bot, message , args) => {
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
    try {
    let noPermissions = new MessageEmbed()
    .setColor(colors.red)
    .setDescription(`<a:xNo:798519969527758848> ${message.author} you do not have the required permission to use this command.`)
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noPermissions).then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    if (!args[0]) args[0] = 1
    let page = args[0]
    let array = bot.settings.get(message.guild.id, "whitelisted")
    const paginated = util.paginate(array, page, Math.floor(30))
    let i = 1;
    let icon = message.guild.iconURL({dynamic: true})
    if(!icon) icon = message.author.displayAvatarURL({dynamic: true})
    let embed = new MessageEmbed()
    .setAuthor(`Whitelisted users for ${message.guild.name}.`, icon)
    .setTimestamp()
    .setThumbnail(icon)
    .setColor(colors.black)
    .setDescription(paginated.items.map(user => `\`#${i++}.\` ${message.guild.members.cache.get(user)}\n`))
        message.channel.send(embed)
}catch (error) {
    console.log(error)
}
    }
    module.exports.help = {
        name: "whitelisted",
        aliases: [],
    }
