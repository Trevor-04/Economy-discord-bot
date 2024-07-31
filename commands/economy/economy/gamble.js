const { ApplicationCommandOptionType } = require('discord.js');
const UserProfile = require('../../schemas/UserProfile');


module.exports = {
    run: async({interaction}) =>{
       if(!interaction.inGuild()){
        interaction.reply({
            content: "You can only run this command inside a server",
            ephemeral: true,
        });
        return;
       }

       const amount = interaction.options.getNumber('amount');
       if(amount < 10){
        interaction.reply("You must gamble at least $10");
        return;
       }

       let userProfile = await UserProfile.findOne({
        userId: interaction.user.id,
       });

       if(!userProfile){
            userProfile = new UserProfile({
                userId: interaction.user.id,
         });
       }
        
        if(amount > UserProfile.balance){
            interaction.reply("You don't have enough balance to gamble.");
            return;
        }

        const didWin = Math.random() > 0.5;

        if(!didWin){
            userProfile.balance -= amount;
            await userProfile.save();
            interaction.reply("you didn't win anything at this time try again");
            return;
        }

        const amountWon = Number((amount + (Math.random() + 0.55)).toFixed(0));

        userProfile.balance += amountWon;
        await userProfile.save();

        interaction.reply(`🎉You won +$${amountWon}!\nNew balance: ${userProfile.balance}`);

    },

    data: {
        name: 'gamble',
        description: 'Gamble some of your balance',
        options: [
            {
                name: 'amount',
                description: 'The amount you want to gamble',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
}