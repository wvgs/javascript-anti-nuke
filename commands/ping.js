const Discord = require("discord.js");
const colors = require("../colors.json")
module.exports.run = async (bot, message , args) => {
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
  message.channel.send(`🏓 Pinging....`).then((msg) => {
      const _ = new Discord.MessageEmbed()
        .setTitle("🏓 Pong!")
        .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
        .setColor(colors.black)
        .setDescription(`
       ***Bot response time is ${Math.round(bot.ws.ping)} ms***`
        )
      msg.edit(_);
      msg.edit("\u200B");
    });
  }
  module.exports.help = {
    name: "ping",
    aliases: [],
}
