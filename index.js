require('dotenv/config');
const {Client, IntentsBitField} = require('discord.js');
const {CommandHandler} = require('djs-commander');
const path = require('path');
const mongoose = require('mongoose');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

new CommandHandler({
    client, 
    eventsPath: path.join(__dirname, 'events'),
    commandsPath: path.join(__dirname, 'commands'),
});

// ctrl c to reset bot node index.js to turn it on
(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('CONNECTED TO MONGODB!')
   client.login(process.env.TOKEN);
})();

client.login(process.env.TOKEN);

