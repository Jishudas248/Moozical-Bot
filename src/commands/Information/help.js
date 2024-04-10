const { MessageEmbed, MessageActionRow, MessageSelectMenu, ActionRowBuilder, ButtonBuilder, ButtonStyle,MessageButton } = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Information',
  aliases: ['h'],
  description: 'Return all commands, or one specific command',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {


    
    const embed = new MessageEmbed()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`**Hey <@${message.author.id}>, \n🦋 I'm __[TEC](https://discord.com/api/oauth2/authorize?client_id=&permissions=8&scope=bot%20applications.commands)__ Built to Deliver the Best Music Experience.**\n**🦋 You can Join __[Support Server](https://discord.gg/efmhM5cgSh)__ if need any help.**\n \n**💠 __Categories__ 💠**\n \n🏠 \`:\` **Home**\n🎶 \`:\` **Music**\n ✨ \`:\` **Filters**\n❗ \`:\` **Information**\n⚙️ \`:\` **Settings**\n`)
      
      .setColor(client.embedColor)
      .setTimestamp()
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('helpop')
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder('Select Here ')
          .addOptions([
            {
              label: 'Music',
              value: 'music',
              emoji: '🎶',
            },
            {
              label: 'Filters',
              value: 'filters',
              emoji: '✨',
            },
            {
              label: ' Info',
              value: 'info',
              emoji: '❗',
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '⚙️',
            },
            {
              label: 'Home',
              value: 'home',
              emoji: '🏠',
            }
          ])
      )







    
    const m = await message.reply({ embeds: [embed], components: [row] })

    const row2 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('disable_h')
          .setDisabled(true)
          .setPlaceholder(`Timeout do ${prefix}help`)
          .addOptions([
            {
              label: 'Music',
              value: 'music',
              emoji: '🎶',
            },
            {
              label: 'Filters',
              value: 'filters',
              emoji: '✨',
            },
            {
              label: ' Info',
              value: 'info',
              emoji: '❗',
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '⚙️',
            },
            {
              label: 'Home',
              value: 'home',
              emoji: '🏠',
            }
          ])
      )


    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.author.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `You cannot control this pagination.`,
          });
          return false;
        }
      },
      componentType: "SELECT_MENU",
      time: 600000,
      idle: 600000 / 2,
    });
    collector.on('end', async () => {
      if (!m) return;
      return m.edit({ components: [row2] }).catch(() => { });
    });

    collector.on("collect", (interaction) => {
      if (!interaction.deferred) interaction.deferUpdate();
      const options = interaction.values[0];
      let _commands;

      if (options === 'music') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Music')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Music Commands')
          .setFooter({ text: `Total ${_commands.length} Music commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      
      if (options === 'settings') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Settings')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Settings Commands')
          .setFooter({ text: `Total ${_commands.length} Settings commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'info') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Information')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Information Commands')
          .setFooter({ text: `Total ${_commands.length} Information commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
        if (options === 'filters') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Filters')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Filters Commands')
          .setFooter({ text: `Total ${_commands.length} Filters commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'home') {
        if (!m) return;
        return m.edit({
          embeds: [embed],
          components: [row],
        });
      }
    }
    )

  },
};