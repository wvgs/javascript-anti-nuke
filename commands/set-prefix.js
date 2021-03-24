const Discord = require("discord.js");
const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const colors = require("../colors.json")
module.exports.run = async (bot, message , args) => {

    let embed1 = new MessageEmbed()
    .setTitle(`${message.guild.name}`)
    .setDescription(`<@${message.author.id}> ***you dont have permission to change the bot prefix*** !
    
    *The permissions u need to change the prefix of the bot are* :
    *Manage Guild or Administrator*`)
    .setThumbnail(`${message.guild.iconURL({ dynamic: true })}`)
    .setColor(colors.purple)
    .setFooter(`${message.createdAt.toLocaleString()}`)

    let embed2 = new MessageEmbed()
    .setTitle(`${message.guild.name}`)
    .setDescription(`***<@${message.author.id}> Please enter a prefix*** !

    *Example:* ***${config.prefix}prefix***  \`;\``)
    .setThumbnail(`${message.guild.iconURL({ dynamic: true })}`)
    .setColor(colors.purple)
    .setFooter(`${message.createdAt.toLocaleString()}`)

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefix: config.prefix
        }
    }
    let prefix = prefixes[message.guild.id].prefix;
    if(!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"])) return message.reply(embed1)
    if(!args[0]) return message.reply(embed2);
    prefixes[message.guild.id] = {
        prefix: args[0]
    }
    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) =>{
        if(err) console.log(err)
    });
    let embed = new Discord.MessageEmbed()
    embed.setColor(colors.purple);
    embed.setTitle(`${message.guild.name}`);
    embed.setThumbnail(`${message.guild.iconURL({ dynamic: true})}`)
    embed.setDescription(`<@${message.author.id}> changed the prefix to: \`${args[0]}\`

    *The new prefix for ${message.guild.name} is* : \`${args[0]}\``);
    embed.setFooter(`${message.createdAt.toLocaleString()}`)
message.channel.send(embed)
}
module.exports.help = {
    name: "setprefix",
    aliases: ["prefix"],
}