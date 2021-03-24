const Discord = require("discord.js");
const bot = new Discord.Client({
    ws: { intents: new Discord.Intents(Discord.Intents.ALL) },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    disableEveryone: true,});
const config = require("./config.json");
const fs = require("fs"); 
const db = require("quick.db")
const { MessageEmbed } = require('discord.js');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection()
const Enmap = require('enmap')
bot.settings = new Enmap({name:"settings", fetchAll: true})
bot.on('message', async (msg) => {
bot.settings.ensure(msg.guild.id, {
  whitelisted: [],
  anti: true
  })
})
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log("Couldnt find any commands!");
        return;
}
jsfile.forEach((f) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);

    props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name)
    })
})})

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);
    bot.user.setActivity(`.gg/champion`, {type: "STREAMING", url: "https://www.twitch.tv/heirxyz"})
})

bot.on("message", async message => {
    if(message.channel.type === "dm") return;
    if(message.author.bot) return;
 let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
 if(!prefixes[message.guild.id]){
     prefixes[message.guild.id] = {
         prefix: config.prefix
     }
 }
 let prefix = prefixes[message.guild.id].prefix;

    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd;
    cmd = args.shift().toLowerCase();
    let command;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

     if(bot.commands.has(cmd)){
        command = bot.commands.get(cmd);
     } else if (bot.aliases.has(cmd)){
        command = bot.commands.get(bot.aliases.get(cmd));
    }
     try {
     command.run(bot, message, args,);
    }catch (e) {
        return;
     }
})
bot.on("channelDelete", async channel => {
    if (!channel.guild) return false;
    if(bot.settings.get(channel.guild.id, "anti") === false) return;
    else {
    const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_DELETE"});
    if (!AuditLogFetch.entries.first()) return;
    const Entry = AuditLogFetch.entries.first();
    let array = bot.settings.get(channel.guild.id, "whitelisted")
    let user = Entry.executor
    if (array.includes(user.id)) 
    return;
    else channel.guild.members.ban(Entry.executor, { days: 7, reason: `Deleted a channel` })
    let logschannel = db.fetch(`antilogs_${channel.guild.id}`)
    console.log(logschannel)
    if (!logschannel) return;
    let embed = new MessageEmbed()
    .setAuthor(`Anti Nuke Logs`)
    .setColor("#2f3136")
    .addField("Action", "Channel Deleted")
    .addField("Author:",  Entry.executor)
    .addField(`Deleted Channel`, channel.name)
    .setFooter(channel.guild.name, channel.guild.iconURL({dynamic: true}))
    .setTimestamp();
    let logs = bot.channels.cache.get(logschannel)
    if(!logs)return
    logs.send(embed)
    }
    });
    bot.on("channelCreate", async channel => {
    if (!channel.guild) return false;
    if(bot.settings.get(channel.guild.id, "anti") === false) return;
    else{
    const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_CREATE"});
    if (!AuditLogFetch.entries.first()) return;
    const Entry = AuditLogFetch.entries.first();
    let array = bot.settings.get(channel.guild.id, "whitelisted")
    let user = Entry.executor
    if (array.includes(user.id)) 
    return;
    else channel.guild.members.ban(Entry.executor, { days: 7, reason: `Created a channel` })
    let logschannel = db.fetch(`antilogs_${channel.guild.id}`)
    if (!logschannel) return
    let embed = new MessageEmbed()
    .setAuthor(`Anti Nuke Logs`)
    .setColor("#2f3136")
    .addField("Action", "Channel Created")
    .addField("Author:",  Entry.executor)
    .addField(`Created Channel`, channel.name)
    .setFooter(channel.guild.name, channel.guild.iconURL({dynamic: true}))
    .setTimestamp();
    let logs = bot.channels.cache.get(logschannel)
    if(!logs)return
    logs.send(embed)
    }
    });
    bot.on("guildMemberRemove", async (user) => {
    if (!user.guild) return false;
    if(bot.settings.get(user.guild.id, "anti") === false) return;
    else{
    const AuditLogFetch = await user.guild.fetchAuditLogs({limit: 1, type: "MEMBER_KICK"});
    if (!AuditLogFetch.entries.first()) return;
    const Entry = AuditLogFetch.entries.first();
    let array = bot.settings.get(user.guild.id, "whitelisted")
    let user1 = Entry.executor
    if (array.includes(user1.id)) 
    return;
    else
    user.guild.members.ban(Entry.executor, { days: 7, reason: `Kicked a user` })
    let logschannel = db.fetch(`antilogs_${user.guild.id}`)
    if (!logschannel) return;
    let embed = new MessageEmbed()
    .setAuthor(`Anti Nuke Logs`)
    .setColor("#2f3136")
    .addField("Action", "Kicked User")
    .addField("Author:",  Entry.executor)
    .addField(`Kicked User`, user)
    .setFooter(user.guild.name, user.guild.iconURL({dynamic: true}))
    .setTimestamp();
    let logs = bot.channels.cache.get(logschannel)
    if(!logs)return
    logs.send(embed)
    }
    });
    bot.on("guildBanRemove", async (guild, user) => {
    if (!guild) return false;
    if(bot.settings.get(guild.id, "anti") === false) return;
    else{
    const AuditLogFetch = await guild.fetchAuditLogs({limit: 1, type: "MEMBER_BAN_REMOVE"});
    if (!AuditLogFetch.entries.first()) return;
    const Entry = AuditLogFetch.entries.first();
    let array = bot.settings.get(guild.id, "whitelisted")
    let user1 = Entry.executor
    if (array.includes(user1.id)) 
    return;
    else
    guild.members.ban(Entry.executor, { days: 7, reason: `Unbanned a user` })
    let logschannel = db.fetch(`antilogs_${guild.id}`)
    if (!logschannel) return;
    let embed = new MessageEmbed()
    .setAuthor(`Anti Nuke Logs`)
    .setColor("#2f3136")
    .addField("Action", "User Unban")
    .addField("Author:",  Entry.executor)
    .addField(`Ubanned User`, user)
    .setFooter(guild.name, guild.iconURL({dynamic: true}))
    .setTimestamp();
    let logs = bot.channels.cache.get(logschannel)
    if(!logs)return
    logs.send(embed)
    
    }
    });
    bot.on("guildBanAdd", async (guild, user) => {
    if (!guild) return false;
    if(bot.settings.get(guild.id, "anti") === false) return;
    else{
    const AuditLogFetch = await guild.fetchAuditLogs({limit: 1, type: "MEMBER_BAN_ADD"});
    if (!AuditLogFetch.entries.first()) return;
    const Entry = AuditLogFetch.entries.first();
    let array = bot.settings.get(guild.id, "whitelisted")
    let user1 = Entry.executor
    if (array.includes(user1.id)) 
    return;
    else
    guild.members.ban(Entry.executor, { days: 7, reason: `Banned a user` })
    let logschannel = db.fetch(`antilogs_${guild.id}`)
    if (!logschannel) return;
    let embed = new MessageEmbed()
    .setAuthor(`Anti Nuke Logs`)
    .setColor("#2f3136")
    .addField("Action", "User Ban")
    .addField("Author:",  Entry.executor)
    .addField(`Banned User`, user)
    .setFooter(guild.name, guild.iconURL({dynamic: true}))
    .setTimestamp();
    let logs = bot.channels.cache.get(logschannel)
    if(!logs)return
    logs.send(embed)
    }
    });
    bot.on("roleCreate", async (role) => {
    if (!role.guild) return false;
    if(bot.settings.get(role.guild.id, "anti") === false) return;
    else {
    const AuditLogFetch = await role.guild.fetchAuditLogs({limit: 1, type: "ROLE_CREATE"});
    if (!AuditLogFetch.entries.first()) return;
    const Entry = AuditLogFetch.entries.first();
    let array = bot.settings.get(role.guild.id, "whitelisted")
    let user = Entry.executor
    if (array.includes(user.id)) 
    return;
    else
    role.guild.members.ban(Entry.executor, { days: 7, reason: `Created a role` })
    let logschannel = db.fetch(`antilogs_${role.guild.id}`)
    if (!logschannel) return;
    let embed = new MessageEmbed()
    .setAuthor(`Anti Nuke Logs`)
    .setColor("#2f3136")
    .addField("Action", "Role Create")
    .addField("Author:",  Entry.executor)
    .addField(`Created Role`, role.name)
    .setFooter(role.guild.name, role.guild.iconURL({dynamic: true}))
    .setTimestamp();
    let logs = bot.channels.cache.get(logschannel)
    if(!logs)return
    logs.send(embed)
    }
    })
    bot.on("roleDelete", async (role) => {
    if (!role.guild) return false;
    if(bot.settings.get(role.guild.id, "anti") === false) return;
    else {
    const AuditLogFetch = await role.guild.fetchAuditLogs({limit: 1, type: "ROLE_DELETE"});
    if (!AuditLogFetch.entries.first()) return;
    const Entry = AuditLogFetch.entries.first();
    let array = bot.settings.get(role.guild.id, "whitelisted")
    let user = Entry.executor
    if (array.includes(user.id)) 
    return;
    else
    role.guild.members.ban(Entry.executor, { days: 7, reason: `Deleted a role` })
    let logschannel = db.fetch(`antilogs_${role.guild.id}`)
    if (!logschannel) return;
    let embed = new MessageEmbed()
    .setAuthor(`Anti Nuke Logs`)
    .setColor("#2f3136")
    .addField("Action", "Role Delete")
    .addField("Author:",  Entry.executor)
    .addField(`Deleted Role`, role.name)
    .setFooter(role.guild.name, role.guild.iconURL({dynamic: true}))
    .setTimestamp();
    let logs = bot.channels.cache.get(logschannel)
    if(!logs)return
    logs.send(embed)
    }
    })
    bot.on('guildMemberAdd', async (member) => {
    if (!member.guild) return false;
    if(bot.settings.get(member.guild.id, "anti") === false) return;
    else{
    if(member.user.bot){
    const AuditLogFetch = await member.guild.fetchAuditLogs({limit: 1, type: "BOT_ADD"});
    if (!AuditLogFetch.entries.first()) return;
    const Entry = AuditLogFetch.entries.first();
    let array = bot.settings.get(member.guild.id, "whitelisted")
    let user = Entry.executor
    if (array.includes(user.id)) 
    return;
    else
    member.guild.members.ban(Entry.executor, { days: 7, reason: `Added a bot` })
    let logschannel = db.fetch(`antilogs_${member.guild.id}`)
    if (!logschannel) return;
    let embed = new MessageEmbed()
    .setAuthor(`Anti Nuke Logs`)
    .setColor("#2f3136")
    .addField("Action", "Bot Add")
    .addField("Author:",  Entry.executor)
    .addField(`Added Bot`, member)
    .setFooter(member.guild.name, member.guild.iconURL({dynamic: true}))
    .setTimestamp();
    let logs = bot.channels.cache.get(logschannel)
    if(!logs)return
    logs.send(embed)
    }
    }
    })
bot.login(config.token);