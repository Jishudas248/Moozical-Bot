const { MessageEmbed, Client, MessageButton, MessageActionRow } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { trackStartEventHandler } = require("../../utils/functions");
const db = require("../../schema/setup");

module.exports = {
	name: "playerStart",
	/**
	 * 
	 * @param {Client} client 
	 * @param {*} player 
	 * @param {*} track 
	 */
	run: async (client, player, track) => {
		let guild = client.guilds.cache.get(player.guild);
		if (!guild) return;
		let channel = guild.channels.cache.get(player.text);
		if (!channel) return;
		let data = await db.findOne({ Guild: guild.id });
		if (data && data.Channel) {
			let textChannel = guild.channels.cache.get(data.Channel);
			const id = data.Message;
			if (channel === textChannel) {
				return await trackStartEventHandler(id, textChannel, player, track, client);
			} else {
				await trackStartEventHandler(id, textChannel, player, track, client);
			};
		}
		const emojiplay = client.emoji.play;

		const main = new MessageEmbed()
      .setAuthor({ name: `By 💝`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
			.setDescription(`# Now Playing: \n > ** Song Name: \[${track.title}](${track.uri})\ \n > Requested By: \`${track.requester.tag}\`\n > Time: \`[ ${track.isStream ? '[**◉ LIVE**]' : convertTime(player.current.length)} ]\`**`)
			.setColor(client.embedColor)

      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
			.setImage(`${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`}`)
    .setFooter({ text: `Requested by ${track.requester.tag}`, iconURL: track.requester.displayAvatarURL({ dynamic: true }) })
			
		client.channels.cache.get(player.text)?.send({embeds: [main]}).then(x => player.data.set("message", x));
	}
};
