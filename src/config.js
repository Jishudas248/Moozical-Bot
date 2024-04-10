require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || 'MTIyMDA0MzAyNDU1NDUyNDY5Mg.GXdfRF.Zrtjgc8NzMhipm1SGCPsVL-8M2rUPMD9EVuIys', // discord bot token
  prefix: process.env.PREFIX || ",", 
  ownerID: process.env.OWNERID || ['1173547185758015498'], //your discord id
  premiumID: process.env.PREMIUMID || ['1173547185758015498'],
  SpotifyID: process.env.SPOTIFYID || '606ae4545f3f4994a47275d1d6f94261', // spotify client id
  SpotifySecret: process.env.SPOTIFYSECRET || '0a3e58753ea641a18ebc0f4ea6320176', // spotify client secret
  mongourl: process.env.MONGO_URI || 'mongodb+srv://modsa:modsa_db@modsadev.dcaruzy.mongodb.net/?retryWrites=true&w=majority', // MongoDb URL
  embedColor: process.env.COlOR || '#2f3136', // embed colour
  logs: process.env.LOGS || '1220258349334007808', // Discord channel id 
  links: {
    support: process.env.SUPPORT || 'https://discord.gg/YFUr6FDw',
    invite: process.env.INVITE || 'https://discord.com/api/oauth2/authorize?client_id=1027811949792219196&permissions=8&scope=bot',
    vote: process.env.VOTE || 'https://discord.gg/instance',
    bg: process.env.BG || 'https://media.discordapp.net/attachments/989120751418343465/989476878421200916/Wofi_Music.png?width=771&height=434',
    premium: ['1173547185758015498']
  },

  nodes: [
    {
      url: process.env.NODE_URL || 'lavalink.devamop.in:443',
      name: process.env.NODE_NAME || 'main',
      auth: process.env.NODE_AUTH || 'DevamOP',
      secure: parseBoolean(process.env.NODE_SECURE || 'true'),
    },
  ],
};

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
