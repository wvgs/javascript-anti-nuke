const db = require("quick.db")
const { MessageEmbed } = require('discord.js')
const colors = require("../colors.json")
module.exports.run = async (bot, message , args) => {
    let embed1 = new MessageEmbed()
    .setColor(colors.green)
    .setDescription(`<:faithSuccess:796170267063353344> ${message.author} anti logs channel set.`)
    let noChannel = new MessageEmbed()
    .setColor(colors.red)
    .setDescription(`<:faithError:796170262659072002> ${message.author} please enter the channel name or id that u want to use as anti logs.`)
    let noPermissions = new MessageEmbed()
    .setColor(colors.red)
    .setDescription(`<:faithError:796170262659072002> ${message.author} you do not have the required permission to use this command.`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noPermissions)
    if (!args[0]) {
      let b = await db.fetch(`antilogs_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
       let modLogChannel = new MessageEmbed()
        .setColor(colors.green)
        .setDescription(`<:faithSuccess:796170267063353344> ${message.author} anti logs channel set in this server is \`${channelName.name}\`.`)
        return message.channel.send(modLogChannel);
      } else
        return message.channel.send(noChannel);
    }
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        let wrongChannel = new MessageEmbed()
      .setColor(colors.red)
      .setDescription(`<:faithError:796170262659072002> ${message.author} u entered a wrong channel.`)
        if (!channel || channel.type !== 'text') return message.channel.send(wrongChannel);
        try {
            let a = await db.fetch(`antilogs_${message.guild.id}`)

            if (channel.id === a) {
                let alreadySet = new MessageEmbed()
                .setColor(colors.red)
                .setDescription(`<:faithError:796170262659072002> ${message.author} channel u entered is already set as the anti logs channel.`)
                return message.channel.send(alreadySet)
            } else {
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(embed1)
                db.set(`antilogs_${message.guild.id}`, channel.id)
               let modLogsSet = new MessageEmbed()
                .setColor(colors.green)
                .setDescription(`<:faithSuccess:796170267063353344> ${message.author} anti logs channel has been succesfully set in \`${channel.name}\``)
               return message.channel.send(modLogsSet)
            }
        } catch {
            let modLogsError = new MessageEmbed()
                .setColor(colors.red)
                .setDescription(`<:faithError:796170262659072002> ${message.author} missing permissions or the channel entered is not a text channel.`)
            return message.channel.send(modLogsError);
        }
    }
    module.exports.help = {
        name: "anti-logs",
        aliases: ['logs'],
    }
    