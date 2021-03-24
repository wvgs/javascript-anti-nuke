const colors = require("../colors.json")
let { MessageEmbed } = require('discord.js')
module.exports.run = async (bot, message , args) => {

      if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
  let noPermissions = new MessageEmbed()
  .setColor(colors.red)
  .setDescription(`<a:xNo:798519969527758848> ${message.author} only the server owner can remove users from the whitelist.`)
  .setTimestamp()
  let noRole = new MessageEmbed()
  .setColor("#2f3136")
  .setAuthor(`Command: dewhitelist`)
  .setDescription(`**Description**
Removes a user from the server whitelist.
**Aliases**
dewhitelist, unwhitelist
**Usage**
dewhitelist [user]
**Example**
dewhitelist @heir
**Required Permissions**
\`Server Owner\``)

  if (message.author.id != message.guild.owner.id) return message.channel.send(noPermissions).then(m => {
    setTimeout(() => {
        m.delete()
    }, 20000);
})
  if (!args[0]) return message.channel.send(noRole)
  let array = bot.settings.get(message.guild.id, "whitelisted")
  let user = message.guild.members.cache.find(mem => mem.user.username === args[0]) || message.guild.members.cache.get(args[0]) || message.mentions.users.first()
 if(!array.includes(user.id)){ 
    let removeXpGainRole = new MessageEmbed()
    .setColor(colors.red)
    .setDescription(`<a:xNo:798519969527758848> ${message.author} that user is not whitelisted.`)
  return message.channel.send(removeXpGainRole)}
  else {
    let index = array.findIndex(obj => obj === user.id)
  bot.settings.delete(message.guild.id, `whitelisted.${index}`)
    let noXpGain = new MessageEmbed()
    .setColor(colors.green)
    .setDescription(`<a:xnYes:798519965330178088> ${message.author} removed ${user} from the whitelist.`)
  message.channel.send(noXpGain)
  }
}
module.exports.help = {
    name: "dewhitelist",
    aliases: ['dewl'],
}

