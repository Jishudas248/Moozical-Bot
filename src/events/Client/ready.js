const { prefix } = require("../../config.js");

module.exports ={
name: "ready",
run: async (client) => {
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");
   
    let statuses = [`.help | .play`];
    setInterval(function() {
  	let status = statuses[Math.floor(Math.random()*statuses.length)];		
        client.user.setPresence({
            activities: [
                {
                    name: status,
                    type: "STREAMING",
                    url: "https://www.twitch.tv/discord"
                }
            ],
            status: "dnd"
        });
    }, 10000)
 }
};