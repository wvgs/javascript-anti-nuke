const { MessageEmbed } = require('discord.js')
const colors = require("../colors.json")
module.exports.run = async (bot, message , args) => {
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
	let noPermissions = new MessageEmbed()
    .setColor(colors.red)
    .setDescription(`<a:xNo:798519969527758848> ${message.author} only the server owner can enable or disable the anti nuke.`)
  if (message.author.id != message.guild.owner.id) return message.channel.send(noPermissions).then(m => {
    setTimeout(() => {
        m.delete()
    }, 20000);
})
  let check = bot.settings.get(message.guild.id, "anti")
  if(check === false) {
    let embed16 = new MessageEmbed()
    .setColor(colors.green)
    .setAuthor(`Anti Nuke Enabled`, message.guild.iconURL({dynamic: true}))
  .setDescription(`
<:DE_OnGreen:805196654595932180> **Anti Role Create**
<:DE_OnGreen:805196654595932180> **Anti Role Delete**
<:DE_OnGreen:805196654595932180> **Anti Ban**
<:DE_OnGreen:805196654595932180> **Anti Kick**
<:DE_OnGreen:805196654595932180> **Anti Unban**
<:DE_OnGreen:805196654595932180> **Anti Channel Delete**
<:DE_OnGreen:805196654595932180> **Anti Channel Create**
<:DE_OnGreen:805196654595932180> **Anti Bot Add**`)
  .setTimestamp()
  .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
  	message.channel.send(embed16)
  	bot.settings.set(message.guild.id, true, "anti")
  } else if (check === true) {
    let embed17 = new MessageEmbed()
    .setColor(colors.red)
    .setAuthor(`Anti Nuke Disabled`, message.guild.iconURL({dynamic: true}))
  .setDescription(`
<:DE_Off:805196659260391445> **Anti Role Create**
<:DE_Off:805196659260391445> **Anti Role Delete**
<:DE_Off:805196659260391445> **Anti Ban**
<:DE_Off:805196659260391445> **Anti Kick**
<:DE_Off:805196659260391445> **Anti Unban**
<:DE_Off:805196659260391445> **Anti Channel Delete**
<:DE_Off:805196659260391445> **Anti Channel Create**
<:DE_Off:805196659260391445> **Anti Bot Add**`)
.setTimestamp()
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
  	  	message.channel.send(embed17)
  	bot.settings.set(message.guild.id, false, "anti")
  }
}
module.exports.help = {
    name: "anti",
    aliases: ['toggle-anti', 't-anti'],
}

