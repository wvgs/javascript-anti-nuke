const { MessageEmbed } = require('discord.js')
const colors = require("../colors.json")
module.exports.run = async (bot, message , args) => {

        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;
        const embed = new MessageEmbed()
            .setTitle("fear uptime!")
            .setColor(colors.black)
            .setDescription(`**${days}** days **${hours}** hours **${minutes}** minutes **${seconds}** seconds

            Requested by: ${message.author}`)
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())  
        message.channel.send(embed);
    }
    module.exports.help = {
        name: "uptime",
        aliases: [],
    }
    
    