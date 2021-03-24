const Discord = require("discord.js");
module.exports.run = async (bot, message , args) => {
        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
    let inline = true
    let infoembed = new Discord.MessageEmbed()
    .setColor("#000000")
    .setThumbnail(`${message.guild.iconURL({ dynamic: true })}`)
    .addField("<:verifiedBot:796179592402436116> Bot Name", `${bot.user.username}`, inline)
    .addField("<:VerifiedBotDeveloper:796179530481795142> Bot Owner", "heir#7777", inline )
    .addField("🛡 Servers", `${bot.guilds.cache.size}`, inline)
    .addField("📁 Channels", `${bot.channels.cache.size}`, inline)
    .addField("👥 Users", `${bot.users.cache.size}`, inline)
    .addField("<:faithGear:796179449946308628> Bot Library", "Discord.Js", inline)
    .addField("📌 Prefix", "\`/\` ( /help )", inline)
    .addField("🔗 Invite", "[**Invite Fear**](https://discord.com/api/oauth2/authorize?bot_id=800741609141960714&permissions=8&scope=bot)", inline)
    .setTimestamp()
    message.channel.send(infoembed);
}
module.exports.help = {
    name: "info",
    aliases: [],
}

