const { MessageEmbed, MessageActionRow, MessageSelectMenu, CommandInteraction, Client } = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Return all commands',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: true,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    const prefix = client.prefix;

    await interaction.deferReply({
      ephemeral: false,
    });

    const embed = new MessageEmbed()
      .setTitle(`${client.user.username} Help`)
 /*     .setDescription(
        ` Hello **<@${interaction.user.id}>**, I am <@${client.user.id}>.  \n\nA Discord Music Bot With Many Awesome Features, \nSupport Many Sources \n\n\`🎵\`•Music\n\`🗒️\`•Playlist\n\`ℹ️\`•information\n\`⚙️\`•Config\n\`🎙️\`•Filters\n\n *Choose an category below to see commands* \n\n*`,
      )*/
      .setDescription(`** Hello **<@${interaction.user.id}>, \n**Welcome To The Help Menu Of** <@${client.user.id}>\n**👑 • \`${client.ws.ping}\`**\n**👨‍💻 • **\n **- Categories **\n **🎶 • Music**\n**✨ • Filters**\n**🛡️ • Moderation**\n**❗ • Information**\n**⚙️ • Setting**`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.embedColor)
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('helpop')
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder('Select Here')
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
            },
        ]),
    );

    const m = await interaction.editReply({ embeds: [embed], components: [row] });

    const row2 = new MessageActionRow().addComponents(
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
            },
        ]),
    );

    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === interaction.user.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `Only **${interaction.user.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      componentType: 'SELECT_MENU',
      time: 60000,
      idle: 60000 / 2,
    });
    collector.on('end', async () => {
      if (!m) return;
      return m.edit({ components: [row2] }).catch(() => {});
    });

    collector.on('collect', (interaction) => {
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
      if (options === 'filters') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Filters')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Filter Commands')
          .setFooter({ text: `Total ${_commands.length} Filter commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'playlist') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Playlist')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Playlist Commands')
          .setFooter({ text: `Total ${_commands.length} Playlist commands.` });
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

      if (options === 'home') {
        if (!m) return;
        return m.edit({
          embeds: [embed],
          components: [row],
        });
      }
    });
  },
};

/*    const embed = new MessageEmbed()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      .setDescription(
        `** Hello **<@${message.author.id}>, \n**Welcome To The Help Menu Of** <@${client.user.id}>\n**👑 • \`${client.ws.ping}\`**\n**👨‍💻 • **\n **- Categories **\n **🎶 • Music**\n**✨ • Filters**\n**🛡️• Moderation**\n**⚙️ • Information**\n**⚙️ • Setting**`)
      
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
              emoji: '1040958817531346965',
            },
            {
              label: 'Filters',
              value: 'filters',
              emoji: '1040970375804231690',
            },
            {
              label: ' Moderation',
              value: 'moderation',
              emoji: '1040971913721286736',
            },
            {
              label: ' Info',
              value: 'info',
              emoji: '1040967326209675284',
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '1040971219895320646',
            },
            {
              label: 'Home',
              value: 'home',
              emoji: '1040973742924382288',
            }
          ])
      )







    
    const m = await interaction.editReply({ embeds: [embed], components: [row] })

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
              emoji: '1040958817531346965',
            },
            {
              label: 'Filters',
              value: 'filters',
              emoji: '1040970375804231690',
            },
            {
              label: ' Moderation',
              value: 'moderation',
              emoji: '1040971913721286736',
            },
            {
              label: ' Info',
              value: 'info',
              emoji: '1040967326209675284',
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '1040971219895320646',
            },
            {
              label: 'Home',
              value: 'home',
              emoji: '1040973742924382288',
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
      if (options === 'filter') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'moderation')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription("\`ban,kick,timeout,unban,untimeout\`")
          .setTitle('Moderation Commands')
          .setFooter({ text: `Total ${_commands.length} Moderation commands.` });
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
};*/
