const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: "guildCreate",
run: async (client, guild) => {
  var invite = client.config.links.invite;
  
  const channel = client.channels.cache.get(client.config.logs);
  let own = await guild.fetchOwner()
  
  const embed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`📥 Joined a Guild !!`)
    .addField('Name', `\`${guild.name}\``)
    .addField('ID', `\`${guild.id}\``)
    .addField('Owner', `\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"}\` \`${own.id}\``)
    .addField('Member Count', `\`${guild.memberCount}\` Members`)
    .addField('Creation Date', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``)
    .setColor(client.embedColor)
    .addField(`${client.user.username}'s Server Count`, `\`${client.guilds.cache.size}\` Severs`)
    .setTimestamp()
    channel.send({embeds: [embed]})
  
  
    const embed3 = new MessageEmbed()
    .setTitle(`ThankYou For Inviting Me <3`)
    .setDescription(`Now Most Probably Aware Music Will Leave Your Server Due To Your \`ANTINUKE SECURITY\` To Avoid That \`WhiteList The Bot NOW!!\`.Bot Got Kicked? [REINVITE](${invite})`)
  
  own.send({embeds: [embed3]})
  }
	
};
