const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'invite',
  category: 'Information',
  aliases: ['addme'],
  description: 'Invite Me',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    var invite = client.config.links.invite;
    var support = client.config.links.support;
    
    const row = new MessageActionRow().addComponents(
      new MessageButton().setLabel('Invite').setStyle('LINK').setURL(invite),
      new MessageButton().setLabel('Support').setStyle('LINK').setURL(support),
    );
    const mainPage = new MessageEmbed()
      .addField('Invite Links',`[**InS**](https://discord.gg/efmhM5cgSh)`)
      .addField('Support Server',`[**Server link**](${support})`)
      
      .setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      .setFooter('Made with 💖 by The Extremez Coder')
      .setColor(client.embedColor);
    message.reply({ embeds: [mainPage], components: [row] });
  },
};
