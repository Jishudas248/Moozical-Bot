const MusicBot = require("./structures/MusicClient");
const client = new MusicBot();
module.exports = client; 
client._loadPlayer()
client._loadClientEvents()
client._loadNodeEvents()
client._loadPlayerEvents()
client._loadCommands()
client._loadSlashCommands()
client.connect()


process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p);
});

process.on('uncaughtException', (err, origin) => {
    console.log(err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(err, origin);
});

process.on('multipleResolves', (type, promise, reason) => {
    console.log(type, promise, reason);
});
const keepAlive = require("./server");

const userID = "166692371981926400"

let prefix = client.prefix;








keepAlive();