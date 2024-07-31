module.exports = {
    data: {
        name: 'hello',
        description: 'Replies with hi',
    },
    
    run: ({interaction}) => {
        interaction.reply('Hi!')
    },
    //deleted: true,
};
