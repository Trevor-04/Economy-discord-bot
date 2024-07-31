const { ApplicationCommandOptionType } = require('discord.js');
const UserProfile = require('../../schemas/UserProfile'); // Ensure this matches your schema name

module.exports = {
  run: async ({ interaction }) => {
    if (!interaction.inGuild()) {
      await interaction.reply({
        content: "This command can only be run inside a server",
        ephemeral: true,
      });
      return;
    }

    const targetUserId = interaction.options.getUser('target-user')?.id || interaction.user.id;

    await interaction.deferReply();

    try {
      let userProfile = await UserProfile.findOne({ userId: targetUserId });

      if (!userProfile) {
        userProfile = new UserProfile({ userId: targetUserId });
        await userProfile.save();
      }

      await interaction.editReply(
        targetUserId === interaction.user.id
          ? `Your balance is ${userProfile.balance}`
          : `<@${targetUserId}>'s balance is ${userProfile.balance}`
      );
    } catch (error) {
      console.log(`Error handling /balance: ${error}`);
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply('An error occurred while processing your request.');
      } else {
        await interaction.reply('An error occurred while processing your request.');
      }
    }
  },

  data: {
    name: 'balance',
    description: 'Check your balance',
    options: [
      {
        name: 'target-user',
        description: 'The user whose balance you want to see.',
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
};
