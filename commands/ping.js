module.exports = {
    data: {
        name: 'ping',
        description: 'Replies with pong',
    },
    
    run: ({interaction}) => {
        interaction.reply('Pong!')
    },
};
